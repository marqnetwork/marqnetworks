'use client'; // if using Next.js App Router

import { useEffect, useState } from 'react';

export default function CursorFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCircle = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', moveCircle);

    return () => {
      window.removeEventListener('mousemove', moveCircle);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '15px',
        height: '15px',
        borderRadius: '50%',
        backgroundColor: 'white',
        pointerEvents: 'none',
        transform: `translate(${position.x - 7.5}px, ${position.y - 7.5}px)`,
        transition: 'transform 0.05s linear',
        zIndex: 9999,
      }}
    />
  );
}
