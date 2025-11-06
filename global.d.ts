// Ambient type declarations for browser APIs missing from TS DOM libs in some environments
declare class ImageCapture {
  constructor(videoTrack: MediaStreamTrack);
  grabFrame(): Promise<ImageBitmap>;
}