"use client";
import { useEffect, useRef, useState } from "react";

export default function GlobalCaptureManager() {
  const [userName, setUserName] = useState<string>("");
  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  async function fetchSessionUser() {
    try {
      const res = await fetch("/api/auth/session");
      const json = await res.json();
      if (res.ok) setUserName(json?.user?.userName || "");
    } catch {}
  }

  async function start() {
    if (streamRef.current) return;
    const s = await (navigator.mediaDevices as any).getDisplayMedia({ video: { displaySurface: "monitor" } as any, audio: false });
    streamRef.current = s;
    if (!videoRef.current) videoRef.current = document.createElement("video");
    videoRef.current.srcObject = s as any;
    videoRef.current.muted = true;
    await videoRef.current.play();
    try {
      const track = s.getVideoTracks()[0];
      track && track.addEventListener("ended", () => {
        stop();
      });
    } catch {}
  }

  function adopt(stream: MediaStream, video: HTMLVideoElement | null) {
    streamRef.current = stream;
    videoRef.current = video || videoRef.current;
  }

  async function snapshotOnce() {
    try {
      if (!streamRef.current || !videoRef.current) return;
      const v = videoRef.current;
      const w = v.videoWidth || 1280;
      const h = v.videoHeight || 720;
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(v, 0, 0, w, h);
      const blob: Blob | null = await new Promise((resolve) => canvas.toBlob((b) => resolve(b), "image/png"));
      if (!blob) return;
      const form = new FormData();
      form.append("userName", userName || "Unknown");
      form.append("file", blob, "snapshot.png");
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const json = await res.json();
      if (!res.ok) return;
      const url = json?.url as string;
      try {
        await fetch("/api/attendance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userName: userName || "Unknown", type: "snapshot", metadata: { url, source: "global" } }),
        });
      } catch {}
    } catch {}
  }

  function schedule(ms: number) {
    if (intervalRef.current) return;
    intervalRef.current = window.setInterval(() => { snapshotOnce(); }, ms);
  }

  function stop() {
    try { streamRef.current?.getTracks().forEach((t) => t.stop()); } catch {}
    streamRef.current = null;
    if (videoRef.current) {
      try { videoRef.current.pause(); } catch {}
      videoRef.current.srcObject = null;
    }
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  useEffect(() => {
    fetchSessionUser();
    (window as any).__globalCapture = {
      start,
      adopt,
      schedule,
      stop,
      isActive: () => !!streamRef.current,
      isScheduled: () => intervalRef.current != null,
    };
    return () => {};
  }, []);

  return null;
}