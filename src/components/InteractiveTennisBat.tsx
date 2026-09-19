import React, { useState, useEffect, useRef } from 'react';

export const InteractiveTennisBat: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isSwinging, setIsSwinging] = useState(false);
  const [showSparks, setShowSparks] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  // Smooth mouse tilt tracking & gentle idle animation on mobile
  useEffect(() => {
    let lastInteraction = Date.now();

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      setMousePos({
        x: Math.max(-1.2, Math.min(1.2, x)),
        y: Math.max(-1.2, Math.min(1.2, y)),
      });
      lastInteraction = Date.now();
      setIsInteracting(true);
    };

    // Idle float effect when not actively dragged or hovered
    let animFrame: number;
    const idleLoop = () => {
      if (Date.now() - lastInteraction > 2000 && !isSwinging) {
        const time = Date.now() / 1500;
        const idleX = Math.sin(time) * 0.35;
        const idleY = Math.cos(time * 0.8) * 0.25;
        setMousePos((prev) => ({
          x: prev.x * 0.92 + idleX * 0.08,
          y: prev.y * 0.92 + idleY * 0.08,
        }));
      }
      animFrame = requestAnimationFrame(idleLoop);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animFrame = requestAnimationFrame(idleLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, [isSwinging]);

  // Mobile Touch Event Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
      setIsInteracting(true);
      updateTouchPos(touch.clientX, touch.clientY);
    }
  };

  const updateTouchPos = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setMousePos({
      x: Math.max(-1.3, Math.min(1.3, x)),
      y: Math.max(-1.3, Math.min(1.3, y)),
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      updateTouchPos(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartRef.current) {
      const elapsed = Date.now() - touchStartRef.current.time;
      if (elapsed < 400) {
        triggerSwing();
      }
    }
    touchStartRef.current = null;
    setIsInteracting(false);
  };

  const handleBatClick = () => {
    triggerSwing();
  };

  const triggerSwing = () => {
    if (isSwinging) return;
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(30);
      } catch {
        // Ignore haptic feedback errors if unavailable
      }
    }
    setIsSwinging(true);
    setShowSparks(true);

    setTimeout(() => {
      setShowSparks(false);
    }, 450);

    setTimeout(() => {
      setIsSwinging(false);
    }, 550);
  };

  // Dynamic calculate angles
  const rotX = isSwinging ? -25 : -mousePos.y * 16;
  const rotY = mousePos.x * 16;
  const rotZ = isSwinging ? 18 : -14 + mousePos.x * 6;
  const scale = isSwinging ? 1.08 : 1;

  // Specular highlight offset based on cursor
  const lightOffsetX = 160 + mousePos.x * 50;
  const lightOffsetY = 140 + mousePos.y * 50;

  return (
    <div className="relative w-full max-w-[420px] mx-auto flex flex-col items-center select-none group px-2">
      
      {/* Background ambient neon backlight glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 sm:w-88 sm:h-88 bg-gradient-to-tr from-[#ccff00]/25 via-blue-600/20 to-transparent rounded-full blur-[70px] sm:blur-[100px] pointer-events-none transition-all duration-300"></div>

      {/* Orbit & Target Rings (Avant-Garde Architectural Styling) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] rounded-full border border-white/5 pointer-events-none animate-[spin_60s_linear_infinite]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full border border-[#ccff00]/10 border-dashed pointer-events-none"></div>

      {/* Interactive 3D Perspective Stage (Click / Press to swing) */}
      <div
        ref={containerRef}
        onClick={handleBatClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="button"
        tabIndex={0}
        aria-label="Interactive Table Tennis Bat - Press or tap to swing"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            triggerSwing();
          }
        }}
        className="relative w-64 h-64 xs:w-72 xs:h-72 sm:w-84 sm:h-84 md:w-96 md:h-96 cursor-pointer flex items-center justify-center touch-pan-y active:scale-95 transition-transform"
        style={{
          perspective: '1000px',
        }}
      >
        
        {/* Dynamic shadow that responds to tilt */}
        <div
          className="absolute bottom-4 sm:bottom-6 w-44 sm:w-52 h-10 sm:h-14 bg-black/60 rounded-full blur-xl pointer-events-none transition-transform duration-150"
          style={{
            transform: `scale(${scale}) translate(${mousePos.x * 20}px, ${mousePos.y * 10}px)`,
          }}
        ></div>

        {/* 3D Floating Bat Canvas Container */}
        <div
          className="relative w-full h-full transition-transform duration-200 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scale})`,
          }}
        >
          
          {/* SWING SHOCKWAVE SPEED LINES (rendered during swing action) */}
          {showSparks && (
            <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center animate-ping">
              <div className="w-64 h-64 rounded-full border-2 border-[#ccff00] opacity-80 blur-[1px]"></div>
            </div>
          )}

          {/* SVG RENDERING OF THE MODERN HIGH-PERFORMANCE BAT */}
          <svg
            viewBox="0 0 400 480"
            className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] filter"
          >
            <defs>
              {/* Stealth Black Rubber Gradient with dynamic sheen */}
              <radialGradient id="rubberBlack" cx={`${lightOffsetX / 4}%`} cy={`${lightOffsetY / 4.8}%`} r="75%">
                <stop offset="0%" stopColor="#384152" />
                <stop offset="35%" stopColor="#1e2430" />
                <stop offset="70%" stopColor="#0f131a" />
                <stop offset="100%" stopColor="#07090d" />
              </radialGradient>

              {/* Crimson Championship Red Rubber Gradient */}
              <radialGradient id="rubberRed" cx={`${lightOffsetX / 4}%`} cy={`${lightOffsetY / 4.8}%`} r="75%">
                <stop offset="0%" stopColor="#ff4d4d" />
                <stop offset="30%" stopColor="#d91438" />
                <stop offset="65%" stopColor="#8b001a" />
                <stop offset="100%" stopColor="#4a000e" />
              </radialGradient>

              {/* Fluorescent Spring Sponge Edge (visible layered sandwich) */}
              <linearGradient id="spongeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ccff00" />
                <stop offset="50%" stopColor="#a3e600" />
                <stop offset="100%" stopColor="#65a30d" />
              </linearGradient>

              {/* Multi-ply wood core gradient (Limba / Koto blade edge) */}
              <linearGradient id="woodPlywood" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e5c07b" />
                <stop offset="25%" stopColor="#966a36" />
                <stop offset="50%" stopColor="#e5c07b" />
                <stop offset="75%" stopColor="#5c3e1e" />
                <stop offset="100%" stopColor="#2c1a0a" />
              </linearGradient>

              {/* Handle Flared Ergonomic Wood & Carbon Fiber Striping */}
              <linearGradient id="handleWood" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="15%" stopColor="#334155" />
                <stop offset="30%" stopColor="#1e293b" />
                <stop offset="48%" stopColor="#ccff00" />
                <stop offset="52%" stopColor="#ccff00" />
                <stop offset="70%" stopColor="#1e293b" />
                <stop offset="85%" stopColor="#334155" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>

              {/* Metallic grip lens badge */}
              <linearGradient id="lensBadge" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ccff00" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#1e3a8a" />
              </linearGradient>

              {/* Surface sweet-spot grid pattern */}
              <pattern id="microPips" width="8" height="8" patternUnits="userSpaceOnUse">
                <circle cx="4" cy="4" r="0.85" fill="#ffffff" fillOpacity="0.08" />
              </pattern>

              {/* Filter for neon lime glow on edge tape */}
              <filter id="batGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* 1. BLADE HEAD DROP SHADOW / BACK WOOD FOUNDATION */}
            <ellipse
              cx="200"
              cy="185"
              rx="132"
              ry="142"
              fill="url(#woodPlywood)"
              stroke="#0f172a"
              strokeWidth="4"
            />

            {/* 2. HIGH-SPRING TENSION SPONGE RIM (FLUORESCENT LIME ACCENT) */}
            <ellipse
              cx="200"
              cy="184"
              rx="129"
              ry="139"
              fill="none"
              stroke="url(#spongeGlow)"
              strokeWidth="5"
              filter="url(#batGlow)"
              opacity="0.9"
            />

            {/* 3. MAIN RUBBER SHEET */}
            <ellipse
              cx="200"
              cy="182"
              rx="126"
              ry="136"
              fill="url(#rubberBlack)"
              stroke="#07090d"
              strokeWidth="3"
            />

            {/* 4. MICRO-PIPS SURFACE TEXTURE OVERLAY */}
            <ellipse
              cx="200"
              cy="182"
              rx="126"
              ry="136"
              fill="url(#microPips)"
            />

            {/* 5. SWEET SPOT CONCENTRIC PRECISION AURA */}
            <circle
              cx="200"
              cy="175"
              r="48"
              fill="none"
              stroke="#ccff00"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              opacity="0.3"
            />
            <circle
              cx="200"
              cy="175"
              r="22"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1"
              strokeDasharray="2 4"
              opacity="0.4"
            />

            {/* Crosshair sweet-spot target marker */}
            <line x1="190" y1="175" x2="210" y2="175" stroke="#ccff00" strokeWidth="1.5" opacity="0.6" />
            <line x1="200" y1="165" x2="200" y2="185" stroke="#ccff00" strokeWidth="1.5" opacity="0.6" />

            {/* 6. RUBBER AUTHENTICITY STAMP (BOTTOM OF BLADE HEAD) */}
            <g transform="translate(145, 290)">
              <rect
                x="0"
                y="0"
                width="110"
                height="18"
                rx="4"
                fill="#000000"
                fillOpacity="0.45"
                stroke="#ccff00"
                strokeWidth="0.8"
                strokeOpacity="0.4"
              />
              <text
                x="55"
                y="12"
                fill="#ffffff"
                fontSize="8"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
                letterSpacing="1"
              >
                TEMPLEMICHAEL PRO
              </text>
            </g>

            {/* 7. PROTECTIVE EDGE TAPE (ARCHING ACROSS UPPER RIM) */}
            <path
              d="M 80 180 C 80 100, 130 50, 200 50 C 270 50, 320 100, 320 180"
              fill="none"
              stroke="#111827"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M 95 160 C 95 95, 140 58, 200 58 C 260 58, 305 95, 305 160"
              fill="none"
              stroke="#ccff00"
              strokeWidth="1.2"
              strokeDasharray="14 12"
              opacity="0.8"
            />

            {/* 8. ERGONOMIC FLARED HANDLE (PRO TOURNAMENT SPEC) */}
            {/* Handle Base Shadow */}
            <polygon
              points="176,305 224,305 236,445 164,445"
              fill="#080c14"
              opacity="0.9"
            />

            {/* Handle Main Body with Racing Stripe */}
            <polygon
              points="176,300 224,300 234,440 166,440"
              fill="url(#handleWood)"
              stroke="#0f172a"
              strokeWidth="2.5"
            />

            {/* Handle Wood Grain Side Highlights */}
            <path
              d="M 176 300 Q 170 370 166 440"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.5"
              opacity="0.25"
            />
            <path
              d="M 224 300 Q 230 370 234 440"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              opacity="0.6"
            />

            {/* Handle Center Metallic/Carbon Lens Emblem Badge */}
            <g transform="translate(187, 360)">
              <rect
                x="0"
                y="0"
                width="26"
                height="34"
                rx="6"
                fill="#05080f"
                stroke="#ccff00"
                strokeWidth="1.5"
              />
              <circle cx="13" cy="17" r="8" fill="url(#lensBadge)" />
              <text
                x="13"
                y="20"
                fill="#000000"
                fontSize="7"
                fontFamily="sans-serif"
                fontWeight="900"
                textAnchor="middle"
              >
                TM
              </text>
            </g>

            {/* Handle Butt Cap with Gold/Lime trim */}
            <rect
              x="164"
              y="436"
              width="72"
              height="8"
              rx="3"
              fill="#ccff00"
              opacity="0.95"
            />
            <text
              x="200"
              y="442"
              fill="#000000"
              fontSize="6"
              fontFamily="monospace"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="1"
            >
              LONG-N39
            </text>

            {/* 9. DYNAMIC BALL HOVERING NEARBY WITH MAGNETIC TRAJECTORY */}
            <g transform={`translate(${270 + mousePos.x * 25}, ${110 + mousePos.y * 20})`}>
              {/* Ball Ambient Glow */}
              <circle cx="0" cy="0" r="22" fill="#ccff00" opacity="0.15" filter="url(#batGlow)" />
              
              {/* 3D Celluloid / Poly 40+ Table Tennis Ball */}
              <radialGradient id="pingBallLit" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="45%" stopColor="#f8fafc" />
                <stop offset="80%" stopColor="#ccff00" />
                <stop offset="100%" stopColor="#4d7c0f" />
              </radialGradient>
              <circle cx="0" cy="0" r="14" fill="url(#pingBallLit)" stroke="#1e293b" strokeWidth="0.5" />
              
              {/* 3-Star Tournament Quality Stamp */}
              <text
                x="0"
                y="2"
                fill="#1e293b"
                fontSize="5"
                fontFamily="sans-serif"
                fontWeight="bold"
                textAnchor="middle"
              >
                ★★★ 40+
              </text>
              <text
                x="0"
                y="7"
                fill="#047857"
                fontSize="3.5"
                fontFamily="monospace"
                fontWeight="900"
                textAnchor="middle"
              >
                ITTF
              </text>
            </g>

            {/* Trajectory motion arc line */}
            <path
              d={`M 200 175 Q ${240 + mousePos.x * 10} ${150 + mousePos.y * 10} ${265 + mousePos.x * 25} ${115 + mousePos.y * 20}`}
              fill="none"
              stroke="#ccff00"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              opacity="0.45"
            />

          </svg>

        </div>

      </div>

      {/* Modern Specification Badges */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[10px] text-slate-400 text-center px-2">
        <span className="flex items-center space-x-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse"></span>
          <span>5-PLY KOTO + 2 ALC CARBON</span>
        </span>
        <span className="hidden xs:inline">•</span>
        <span className="text-slate-300">INTERACTIVE 3D PERSPECTIVE</span>
      </div>

    </div>
  );
};
