import React, { useState, useEffect, useRef } from 'react';

export const SurrealTennisSphere: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      setMousePos({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mx-auto flex items-center justify-center select-none"
      style={{
        transform: `perspective(800px) rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
    >
      {/* Background ambient glow matching the surreal neon sphere */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-700/30 via-[#ccff00]/25 to-transparent blur-3xl transform scale-110 pointer-events-none"></div>

      {/* Orbit contour ring (matching cosmic lines from screenshot) */}
      <div className="absolute inset-[-20%] rounded-full border border-white/5 pointer-events-none"></div>
      <div className="absolute inset-[-40%] rounded-full border border-white/5 pointer-events-none"></div>

      {/* High-Impact Surreal 3D Tennis Sphere SVG Canvas */}
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] relative z-10"
      >
        <defs>
          {/* Base sphere radial light gradient */}
          <radialGradient id="sphereLit" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#eaff66" />
            <stop offset="25%" stopColor="#ccff00" />
            <stop offset="55%" stopColor="#557500" />
            <stop offset="80%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#0a0f1d" />
          </radialGradient>

          {/* Draped metallic silky cloth gradient */}
          <linearGradient id="silkDrape" x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.85" />
            <stop offset="30%" stopColor="#1e3a8a" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#0f172a" stopOpacity="0.98" />
            <stop offset="85%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Cloth highlight sheen */}
          <linearGradient id="silkSheen" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="40%" stopColor="#bfdbfe" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
          </linearGradient>

          {/* Tennis seam glow filter */}
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Cloth texture folds */}
          <radialGradient id="foldShadow" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.7" />
          </radialGradient>
        </defs>

        {/* Outer sphere core */}
        <circle cx="200" cy="200" r="160" fill="url(#sphereLit)" />

        {/* Felt surface texture overlay */}
        <circle
          cx="200"
          cy="200"
          r="160"
          fill="none"
          stroke="#b8e600"
          strokeWidth="1"
          strokeOpacity="0.4"
          strokeDasharray="2 3"
        />

        {/* Tennis Ball Iconic Curved Seams (White with subtle glow) */}
        {/* Top curved seam */}
        <path
          d="M 80 120 C 130 90, 240 100, 280 150 C 310 190, 320 270, 290 320"
          fill="none"
          stroke="#ffffff"
          strokeWidth="8"
          strokeLinecap="round"
          filter="url(#neonGlow)"
          opacity="0.9"
        />
        <path
          d="M 80 120 C 130 90, 240 100, 280 150 C 310 190, 320 270, 290 320"
          fill="none"
          stroke="#ccff00"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* Bottom curved seam */}
        <path
          d="M 120 310 C 170 340, 240 310, 260 260 C 275 220, 240 160, 200 130"
          fill="none"
          stroke="#ffffff"
          strokeWidth="7"
          strokeLinecap="round"
          filter="url(#neonGlow)"
          opacity="0.85"
        />

        {/* Sculptural Draped Silk Cloth Folds (matching the draped sphere in the user's reference image!) */}
        {/* Fold 1: Main organic drapery crossing the sphere */}
        <path
          d="M 90 190 C 130 140, 160 210, 220 180 C 270 150, 320 200, 340 250 C 320 310, 240 340, 180 340 C 120 330, 80 260, 90 190 Z"
          fill="url(#silkDrape)"
          opacity="0.92"
        />

        {/* Sculptural wrinkle creases with glossy sheen */}
        <path
          d="M 110 200 C 150 170, 180 230, 230 200 C 270 180, 310 230, 325 260"
          fill="none"
          stroke="url(#silkSheen)"
          strokeWidth="12"
          strokeLinecap="round"
          opacity="0.65"
        />

        <path
          d="M 140 240 C 170 210, 210 270, 260 240 C 290 220, 305 270, 310 290"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.5"
        />

        <path
          d="M 160 270 C 190 250, 230 290, 280 280"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Deep dark crevice folds in cloth */}
        <path
          d="M 120 215 C 160 190, 190 250, 240 220"
          fill="none"
          stroke="#020617"
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.9"
        />

        <path
          d="M 170 265 C 200 240, 230 285, 270 265"
          fill="none"
          stroke="#020617"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* Cosmic shadow and rim lighting */}
        <circle cx="200" cy="200" r="160" fill="url(#foldShadow)" pointerEvents="none" />
        <circle
          cx="200"
          cy="200"
          r="159"
          fill="none"
          stroke="#ccff00"
          strokeWidth="2"
          strokeOpacity="0.4"
          pointerEvents="none"
        />
      </svg>

      {/* Floating orbital tennis ball specs / badge */}
      <div className="absolute -top-2 -right-4 px-3 py-1 rounded-full brutal-pill bg-[#06080d]/90 border border-[#ccff00]/40 text-[10px] font-mono font-bold text-[#ccff00] flex items-center space-x-1.5 shadow-xl">
        <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-ping"></span>
        <span>OPTIC TENNIS FELT</span>
      </div>

      <div className="absolute -bottom-2 -left-4 px-3 py-1 rounded-full brutal-pill bg-[#06080d]/90 border border-white/20 text-[10px] font-mono text-slate-300 flex items-center space-x-1.5 shadow-xl">
        <i className="fa-solid fa-wind text-blue-400"></i>
        <span>AERODYNAMIC CORE</span>
      </div>
    </div>
  );
};
