import React from 'react';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToSection }) => {
  return (
    <footer className="relative bg-[#04060a] border-t border-white/10 text-slate-400 text-xs pt-12 pb-28 sm:py-14 overflow-hidden font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <a
                href="https://www.templemichaelcollege.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-12 flex-shrink-0 filter drop-shadow-[0_2px_8px_rgba(201,151,24,0.4)] hover:scale-105 transition-transform"
                title="Visit Templemichael College Official Website"
              >
                <img
                  src="/templemichael-college-logo.svg"
                  alt="Templemichael College Logo"
                  className="w-full h-full object-contain"
                />
              </a>
              <div className="flex flex-col">
                <a
                  href="https://www.templemichaelcollege.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-pixel text-lg text-white hover:text-[#ccff00] transition-colors flex items-center space-x-1.5"
                >
                  <span>TEMPLEMICHAEL COLLEGE</span>
                  <i className="fa-solid fa-arrow-up-right-from-square text-[11px] text-slate-500"></i>
                </a>
                <span className="font-mono text-xs text-[#ccff00] font-bold tracking-wider">
                  TENNIS CLUB + ACADEMY
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-xs font-sans max-w-md leading-relaxed">
              Official Tennis Club & Academy of Templemichael College. Dedicated to elite court training, dynamic spin mechanics, and 100% free tennis gear and court access for all enrolled students.
            </p>
            
            {/* School Website & Social Media Direct Links */}
            <div className="pt-1 flex flex-wrap gap-2">
              <a
                href="https://www.templemichaelcollege.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-[#ccff00]/15 border border-white/15 hover:border-[#ccff00] text-slate-200 hover:text-[#ccff00] transition-all text-xs font-mono group"
                title="Templemichael College Official Website"
              >
                <i className="fa-solid fa-graduation-cap text-[#ccff00]"></i>
                <span className="font-bold">School Website</span>
                <i className="fa-solid fa-arrow-up-right-from-square text-[10px] text-slate-400 group-hover:text-[#ccff00] transition-colors ml-1"></i>
              </a>

              <a
                href="https://www.facebook.com/TemplemichaelCollege"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-3 py-2 rounded-xl bg-blue-900/20 hover:bg-blue-600/30 border border-blue-500/30 hover:border-blue-400 text-slate-200 hover:text-white transition-all text-xs font-mono group"
                title="Follow Templemichael College on Facebook"
              >
                <i className="fa-brands fa-facebook text-blue-400 group-hover:text-blue-300 text-sm"></i>
                <span className="font-bold">Facebook</span>
                <i className="fa-solid fa-arrow-up-right-from-square text-[10px] text-slate-400 group-hover:text-white transition-colors ml-0.5"></i>
              </a>

              <a
                href="https://www.instagram.com/templemichael_college/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-3 py-2 rounded-xl bg-pink-900/20 hover:bg-pink-600/30 border border-pink-500/30 hover:border-pink-400 text-slate-200 hover:text-white transition-all text-xs font-mono group"
                title="Follow @templemichael_college on Instagram"
              >
                <i className="fa-brands fa-instagram text-pink-400 group-hover:text-pink-300 text-sm"></i>
                <span className="font-bold">Instagram</span>
                <i className="fa-solid fa-arrow-up-right-from-square text-[10px] text-slate-400 group-hover:text-white transition-colors ml-0.5"></i>
              </a>
            </div>

            <div className="space-y-1 text-slate-300 text-xs font-mono">
              <p className="flex items-center space-x-2 text-[#ccff00]">
                <i className="fa-solid fa-location-dot"></i>
                <span className="font-bold">Templemichael Glebe, Longford Co. Longford N39 DA02</span>
              </p>
              <p className="text-slate-500 pl-5">
                Eircode: <span className="text-slate-300">N39 DA02</span> • County Longford, Ireland
              </p>
            </div>
            <div className="flex items-center space-x-2 text-[#ccff00] text-xs pt-1">
              <i className="fa-solid fa-circle-info"></i>
              <span>Option to rent bats available — please talk to Ivan Peredrii. No online payment.</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-1 text-xs">
              <li>
                <button
                  onClick={() => onScrollToSection('hero-section')}
                  className="hover:text-[#ccff00] transition-colors py-1.5 inline-block text-left"
                >
                  Overview & Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('rentals-section')}
                  className="hover:text-[#ccff00] transition-colors py-1.5 inline-block text-left"
                >
                  Free Gear & Pro Rackets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('schedule-section')}
                  className="hover:text-[#ccff00] transition-colors py-1.5 inline-block text-left"
                >
                  Court Rotations & Timetable
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('booking-section')}
                  className="hover:text-[#ccff00] transition-colors py-1.5 inline-block text-left"
                >
                  Student Pass Registration
                </button>
              </li>
              <li className="pt-2 border-t border-white/10">
                <a
                  href="https://www.templemichaelcollege.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ccff00] hover:underline py-1 inline-flex items-center space-x-1.5 font-bold"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                  <span>Official College Website</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/TemplemichaelCollege"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 hover:underline py-1 inline-flex items-center space-x-1.5 font-medium"
                >
                  <i className="fa-brands fa-facebook text-xs"></i>
                  <span>Facebook Page</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/templemichael_college/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-pink-300 hover:underline py-1 inline-flex items-center space-x-1.5 font-medium"
                >
                  <i className="fa-brands fa-instagram text-xs"></i>
                  <span>Instagram (@templemichael_college)</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Facility Coordinates</h4>
            <div className="space-y-1.5 text-xs text-slate-400">
              <p className="text-white font-medium">Templemichael College Tennis Complex</p>
              <p className="text-[#ccff00]">Templemichael Glebe, Longford</p>
              <p>Co. Longford, N39 DA02</p>
              <p className="text-slate-500">Decoturf • Red Clay • Grass Courts 01–08</p>
              <div className="pt-2">
                <span className="px-2.5 py-1 rounded bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/30 text-[10px] font-bold block text-center">
                  100% FREE FOR TEMPLEMICHAEL STUDENTS
                </span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-600 text-[11px]">
          <p>© {new Date().getFullYear()} TENNIS CLUB + ACADEMY. ALL RIGHTS RESERVED.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span>MEMBERSHIP: 100% FREE</span>
            <span>•</span>
            <span>BAT RENTALS: IVAN PEREDRII</span>
            <span>•</span>
            <a
              href="https://www.templemichaelcollege.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ccff00] hover:underline inline-flex items-center space-x-1"
            >
              <span>TEMPLEMICHAEL COLLEGE</span>
              <i className="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
            </a>
            <span>•</span>
            <a
              href="https://www.facebook.com/TemplemichaelCollege"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-colors inline-flex items-center space-x-1"
              title="Facebook: @TemplemichaelCollege"
            >
              <i className="fa-brands fa-facebook"></i>
              <span>Facebook</span>
            </a>
            <span>•</span>
            <a
              href="https://www.instagram.com/templemichael_college/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-pink-400 transition-colors inline-flex items-center space-x-1"
              title="Instagram: @templemichael_college"
            >
              <i className="fa-brands fa-instagram"></i>
              <span>Instagram</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
