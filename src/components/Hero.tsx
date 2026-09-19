import React from 'react';
import { InteractiveTennisBat } from './InteractiveTennisBat';

interface HeroProps {
  onJoinClick: () => void;
  onExploreGearClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onJoinClick, onExploreGearClick }) => {
  return (
    <section id="hero-section" className="relative min-h-screen pt-20 pb-20 sm:pt-28 sm:pb-28 overflow-hidden contour-bg flex flex-col justify-between">
      
      {/* Topographic and contour radial rings in background (matching user screenshot) */}
      <div className="absolute inset-0 topographic-lines pointer-events-none opacity-40"></div>

      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] h-[350px] sm:h-[700px] bg-[#ccff00]/10 rounded-full blur-[100px] sm:blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-700/15 rounded-full blur-[90px] sm:blur-[150px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full z-10 flex flex-col justify-between flex-1">
        
        {/* TOP WORDMARK: MONUMENTAL NEON LIME HEADER WITH TEMPLEMICHAEL COLLEGE BADGE */}
        <div className="text-center pt-4 sm:pt-10 flex flex-col items-center">
          
          {/* Official Templemichael College Badge & Social Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-2 sm:mb-3">
            <a
              href="https://www.templemichaelcollege.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full brutal-pill border border-[#ccff00]/40 bg-[#06080d]/90 text-[10px] sm:text-[11px] font-mono text-[#ccff00] shadow-lg hover:border-[#ccff00] hover:bg-[#ccff00]/10 transition-all group"
              title="Visit official Templemichael College website: www.templemichaelcollege.com"
            >
              <img
                src="/templemichael-college-logo.svg"
                alt="Templemichael College Logo"
                className="w-4 h-5 sm:w-5 sm:h-6 object-contain filter drop-shadow flex-shrink-0 group-hover:scale-110 transition-transform"
              />
              <span className="font-bold text-white uppercase tracking-wider whitespace-nowrap group-hover:text-[#ccff00] transition-colors">
                Templemichael College
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300 truncate">
                Longford <span className="text-[#ccff00] font-bold">N39 DA02</span>
              </span>
              <i className="fa-solid fa-arrow-up-right-from-square text-[9px] text-slate-400 group-hover:text-[#ccff00] transition-colors ml-0.5"></i>
            </a>

            <div className="hidden xs:flex items-center space-x-1.5 font-mono text-[10px]">
              <a
                href="https://www.facebook.com/TemplemichaelCollege"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full brutal-pill bg-[#06080d]/80 border border-blue-500/30 hover:border-blue-400 text-slate-300 hover:text-blue-400 transition-colors"
                title="Templemichael College Facebook"
              >
                <i className="fa-brands fa-facebook text-blue-400"></i>
                <span className="font-medium">Facebook</span>
              </a>

              <a
                href="https://www.instagram.com/templemichael_college/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full brutal-pill bg-[#06080d]/80 border border-pink-500/30 hover:border-pink-400 text-slate-300 hover:text-pink-400 transition-colors"
                title="Templemichael College Instagram"
              >
                <i className="fa-brands fa-instagram text-pink-400"></i>
                <span className="font-medium">Instagram</span>
              </a>
            </div>
          </div>

          <h1 className="font-pixel text-[#ccff00] text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[130px] font-black tracking-tight sm:tracking-tighter leading-none neon-lime-text select-none uppercase px-2">
            T E N N I S
          </h1>
        </div>

        {/* CENTERPIECE ROW: EDITORIAL TEXT LEFT + INTERACTIVE 3D MODERN BAT CENTER + EDITORIAL TEXT RIGHT */}
        <div className="relative my-3 sm:my-8 grid grid-cols-1 lg:grid-cols-12 items-center gap-4 sm:gap-6">
          
          {/* Left Editorial Micro-Copy */}
          <div className="lg:col-span-3 text-center lg:text-left space-y-3 order-2 lg:order-1">
            <div className="p-3.5 sm:p-4 rounded-2xl brutal-card bg-[#0a0e18]/80 border border-white/10 max-w-sm mx-auto lg:mx-0">
              <span className="text-[10px] font-mono text-[#ccff00] uppercase font-bold tracking-widest block mb-1">
                // 01. TEMPLEMICHAEL ATHLETICS
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Official Tennis Club & Academy of <strong className="text-white font-bold">Templemichael College</strong>. High-performance training, reflex speed, and 100% free access for all students.
              </p>
            </div>

            <div className="hidden lg:block text-[11px] font-mono text-slate-500 space-y-1">
              <p>CAMPUS: TEMPLEMICHAEL GLEBE</p>
              <p>CO. LONGFORD // EIRCODE N39 DA02</p>
              <p>AFFILIATED WITH TENNIS IRELAND</p>
            </div>
          </div>

          {/* Centerpiece: Interactive Modern High-Performance Tennis Bat */}
          <div className="lg:col-span-6 flex justify-center py-1 sm:py-4 order-1 lg:order-2">
            <InteractiveTennisBat />
          </div>

          {/* Right Editorial Micro-Copy */}
          <div className="lg:col-span-3 text-center lg:text-right space-y-3 order-3">
            <div className="p-3.5 sm:p-4 rounded-2xl brutal-card bg-[#0a0e18]/80 border border-white/10 max-w-sm mx-auto lg:ml-auto">
              <span className="text-[10px] font-mono text-blue-400 uppercase font-bold tracking-widest block mb-1">
                // 02. STUDENT GEAR & BAT RENTAL
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Complimentary standard bats and equipment for PE and club. Option to rent bats available — talk to <strong className="text-[#ccff00] font-bold">Ivan Peredrii</strong>.
              </p>
            </div>

            <div className="hidden lg:block text-[11px] font-mono text-slate-500 space-y-1">
              <p>LONGFORD POST-PRIMARY LEAGUE</p>
              <p>8 TOURNAMENT SPEC COURTS</p>
              <p className="text-[#ccff00]">BAT RENTALS: TALK TO IVAN PEREDRII</p>
            </div>
          </div>

        </div>

        {/* BOTTOM WORDS: STARK WHITE DISPLAY TYPOGRAPHY WITH LIME CROSS */}
        <div className="pt-2 sm:pt-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-4 sm:pt-6">
            
            {/* Top row on mobile: "CLUB +" and "ACADEMY" */}
            <div className="flex items-center justify-between w-full md:w-auto gap-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <span className="font-display-brutal text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase">
                  CLUB
                </span>
                <span className="font-pixel text-3xl sm:text-5xl text-[#ccff00] font-bold neon-lime-text">
                  +
                </span>
              </div>

              <div className="md:hidden">
                <span className="font-display-brutal text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
                  ACADEMY
                </span>
              </div>
            </div>

            {/* CTA Buttons in brutalist styling - Full width on mobile for easy thumb tapping */}
            <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2.5 sm:gap-3 w-full md:w-auto">
              <button
                onClick={onJoinClick}
                className="min-h-[48px] px-6 sm:px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-black bg-[#ccff00] hover:bg-[#d9ff33] neon-lime-glow transition-all active:scale-98 flex items-center justify-center space-x-2 flex-1 shadow-lg"
                id="hero-join-btn"
              >
                <span>Join Club (Free)</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </button>

              <button
                onClick={onExploreGearClick}
                className="min-h-[48px] px-5 sm:px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-white brutal-pill hover:border-[#ccff00]/50 transition-colors flex items-center justify-center space-x-2 flex-1"
                id="hero-gear-btn"
              >
                <span>Tour Rackets</span>
              </button>
            </div>

            {/* "ACADEMY" on desktop */}
            <div className="hidden md:block text-right">
              <span className="font-display-brutal text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase">
                ACADEMY
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
