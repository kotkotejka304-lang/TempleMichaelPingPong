import React, { useState, useEffect } from 'react';
import { EquipmentItem } from '../types';

interface NavbarProps {
  selectedEquipment: EquipmentItem;
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ selectedEquipment, onScrollToSection }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('hero-section');

  // Track active section for mobile thumb dock highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero-section', 'rentals-section', 'schedule-section', 'booking-section'];
      const scrollY = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    onScrollToSection(id);
  };

  return (
    <>
      {/* Top Fixed Brutalist Dock Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 pt-2.5 sm:pt-5 px-3 sm:px-6 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          
          {/* Left: Templemichael College Official Logo & Monogram */}
          <button
            onClick={() => handleNavClick('hero-section')}
            className="flex items-center space-x-2.5 p-1.5 sm:p-2 rounded-2xl brutal-pill bg-[#06080d]/90 border border-white/15 hover:border-[#ccff00]/60 transition-all group shadow-lg min-h-[44px]"
            id="nav-logo"
            aria-label="Templemichael College Home"
          >
            {/* Templemichael College Crest */}
            <div className="w-8 h-9 sm:w-9 sm:h-10 flex-shrink-0 flex items-center justify-center filter drop-shadow-[0_2px_8px_rgba(201,151,24,0.4)] group-hover:scale-105 transition-transform">
              <img
                src="/templemichael-college-logo.svg"
                alt="Templemichael College Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display-brutal font-black text-xs sm:text-sm tracking-wide text-white uppercase leading-tight group-hover:text-[#ccff00] transition-colors">
                Templemichael<span className="text-[#ccff00]">.</span>
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center space-x-1">
                <span>College</span>
                <span className="text-slate-600">•</span>
                <span className="text-[#ccff00] hidden xs:inline">Longford</span>
              </span>
            </div>
          </button>

          {/* Center: Iconic Navigation Dock (Desktop & Tablet) */}
          <nav className="hidden sm:flex items-center space-x-1.5 p-1.5 rounded-2xl brutal-pill bg-[#06080d]/85 border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
            <button
              onClick={() => handleNavClick('hero-section')}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                activeSection === 'hero-section'
                  ? 'bg-[#ccff00] text-black font-bold'
                  : 'text-slate-300 hover:text-black hover:bg-[#ccff00]'
              }`}
              title="Home"
              aria-label="Home"
            >
              <i className="fa-solid fa-house text-xs"></i>
            </button>

            <button
              onClick={() => handleNavClick('rentals-section')}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                activeSection === 'rentals-section'
                  ? 'bg-[#ccff00] text-black font-bold'
                  : 'text-slate-300 hover:text-black hover:bg-[#ccff00]'
              }`}
              title="Rackets & Gear"
              aria-label="Rackets & Gear"
            >
              <i className="fa-solid fa-table-tennis-paddle-ball text-xs"></i>
            </button>

            <button
              onClick={() => handleNavClick('schedule-section')}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                activeSection === 'schedule-section'
                  ? 'bg-[#ccff00] text-black font-bold'
                  : 'text-slate-300 hover:text-black hover:bg-[#ccff00]'
              }`}
              title="Court Timetable"
              aria-label="Court Timetable"
            >
              <i className="fa-regular fa-calendar-days text-xs"></i>
            </button>

            <button
              onClick={() => handleNavClick('booking-section')}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                activeSection === 'booking-section'
                  ? 'bg-[#ccff00] text-black font-bold'
                  : 'text-slate-300 hover:text-black hover:bg-[#ccff00]'
              }`}
              title="Book Court & Gear"
              aria-label="Book Court & Gear"
            >
              <i className="fa-solid fa-bag-shopping text-xs"></i>
            </button>

            {/* Active equipment badge in dock */}
            {selectedEquipment.category === 'premium' && (
              <button
                onClick={() => handleNavClick('booking-section')}
                className="hidden lg:flex items-center space-x-2 px-3 py-1 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/40 text-[11px] font-mono text-[#ccff00]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-ping"></span>
                <span className="truncate max-w-[120px]">{selectedEquipment.name}</span>
                <span className="font-bold text-white text-[10px]">Rent: Ivan Peredrii</span>
              </button>
            )}
          </nav>

          {/* Right: Search Pill & Student Pass Pill */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Search Pill (desktop) */}
            <div className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Search courts & blades..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-40 lg:w-52 py-1.5 pl-8 pr-3 rounded-full text-xs text-white bg-[#06080d]/80 border border-white/15 focus:border-[#ccff00] focus:w-60 transition-all outline-none"
              />
              <i className="fa-solid fa-magnifying-glass absolute left-3 text-[10px] text-slate-400"></i>
            </div>

            {/* Official School Website Link */}
            <a
              href="https://www.templemichaelcollege.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full brutal-pill text-[11px] font-mono text-slate-300 hover:text-[#ccff00] hover:border-[#ccff00]/50 transition-colors min-h-[44px]"
              title="Official Templemichael College Website"
              id="nav-school-link"
            >
              <i className="fa-solid fa-graduation-cap text-xs text-[#ccff00]"></i>
              <span className="hidden lg:inline">School Website</span>
              <span className="lg:hidden">School</span>
              <i className="fa-solid fa-arrow-up-right-from-square text-[9px] text-slate-400"></i>
            </a>

            {/* Social Media Links: Facebook & Instagram */}
            <div className="hidden xl:flex items-center space-x-1">
              <a
                href="https://www.facebook.com/TemplemichaelCollege"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[38px] min-w-[38px] w-9 h-9 rounded-full brutal-pill flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-colors"
                title="Facebook: @TemplemichaelCollege"
                aria-label="Templemichael College Facebook"
              >
                <i className="fa-brands fa-facebook text-sm"></i>
              </a>
              <a
                href="https://www.instagram.com/templemichael_college/"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[38px] min-w-[38px] w-9 h-9 rounded-full brutal-pill flex items-center justify-center text-slate-400 hover:text-pink-400 hover:border-pink-500/50 transition-colors"
                title="Instagram: @templemichael_college"
                aria-label="Templemichael College Instagram"
              >
                <i className="fa-brands fa-instagram text-sm"></i>
              </a>
            </div>

            {/* Free Badge - Touch friendly */}
            <button
              onClick={() => handleNavClick('booking-section')}
              className="min-h-[44px] px-3.5 sm:px-4 py-2 rounded-full font-pixel text-[11px] tracking-wider text-black bg-[#ccff00] hover:bg-[#bcf000] neon-lime-glow transition-all active:scale-95 flex items-center space-x-1.5 shadow-md"
              id="nav-free-badge"
            >
              <span>FREE PASS</span>
            </button>

            {/* User Profile Avatar Icon */}
            <button
              onClick={() => handleNavClick('booking-section')}
              className="min-h-[44px] min-w-[44px] w-11 h-11 sm:w-9 sm:h-9 rounded-full brutal-pill bg-[#06080d]/80 border border-white/20 flex items-center justify-center text-slate-300 hover:text-[#ccff00] hover:border-[#ccff00]/50 transition-colors"
              title="Player Pass"
              aria-label="Player Profile"
            >
              <i className="fa-regular fa-user text-xs"></i>
            </button>

          </div>

        </div>
      </header>

      {/* MOBILE THUMB DOCK (Visible on mobile screens for effortless one-handed thumb navigation) */}
      <div className="sm:hidden fixed bottom-3 left-3 right-3 z-50 pointer-events-auto pb-[env(safe-area-inset-bottom)]">
        <nav className="brutal-card rounded-2xl p-1.5 border border-white/20 bg-[#070a12]/95 backdrop-blur-2xl shadow-[0_12px_35px_rgba(0,0,0,0.9)] grid grid-cols-4 gap-1 items-center">
          
          <button
            onClick={() => handleNavClick('hero-section')}
            className={`min-h-[48px] rounded-xl flex flex-col items-center justify-center transition-all ${
              activeSection === 'hero-section'
                ? 'bg-[#ccff00] text-black font-bold shadow-md'
                : 'text-slate-300 hover:text-white active:bg-white/10'
            }`}
            aria-label="Home"
          >
            <i className="fa-solid fa-house text-sm mb-0.5"></i>
            <span className="font-mono text-[9px] uppercase tracking-wider">Home</span>
          </button>

          <button
            onClick={() => handleNavClick('rentals-section')}
            className={`min-h-[48px] rounded-xl flex flex-col items-center justify-center transition-all ${
              activeSection === 'rentals-section'
                ? 'bg-[#ccff00] text-black font-bold shadow-md'
                : 'text-slate-300 hover:text-white active:bg-white/10'
            }`}
            aria-label="Rackets and gear"
          >
            <i className="fa-solid fa-table-tennis-paddle-ball text-sm mb-0.5"></i>
            <span className="font-mono text-[9px] uppercase tracking-wider">Rackets</span>
          </button>

          <button
            onClick={() => handleNavClick('schedule-section')}
            className={`min-h-[48px] rounded-xl flex flex-col items-center justify-center transition-all ${
              activeSection === 'schedule-section'
                ? 'bg-[#ccff00] text-black font-bold shadow-md'
                : 'text-slate-300 hover:text-white active:bg-white/10'
            }`}
            aria-label="Timetable"
          >
            <i className="fa-regular fa-calendar-days text-sm mb-0.5"></i>
            <span className="font-mono text-[9px] uppercase tracking-wider">Hours</span>
          </button>

          <button
            onClick={() => handleNavClick('booking-section')}
            className={`min-h-[48px] rounded-xl flex flex-col items-center justify-center transition-all relative ${
              activeSection === 'booking-section'
                ? 'bg-[#ccff00] text-black font-bold shadow-md'
                : 'text-[#ccff00] hover:text-white active:bg-white/10'
            }`}
            aria-label="Student Pass"
          >
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></span>
            <i className="fa-solid fa-id-card text-sm mb-0.5"></i>
            <span className="font-mono text-[9px] uppercase tracking-wider font-bold">Pass</span>
          </button>

        </nav>
      </div>
    </>
  );
};
