import React from 'react';

interface ScheduleProps {
  onNotifyClick: () => void;
}

export const Schedule: React.FC<ScheduleProps> = ({ onNotifyClick }) => {
  const courtTracks = [
    {
      court: 'COURT 01-02 (DECOTURF)',
      day: 'Monday & Wednesday',
      program: 'First Serve & Baseline Footwork',
      coach: 'Coach Laurent',
      level: 'Rookies & Intermediate',
      status: 'Announcing Hours Soon',
    },
    {
      court: 'COURT 03-04 (RED CLAY)',
      day: 'Tuesday & Thursday',
      program: 'Heavy Topspin & Sliding Clinics',
      coach: 'Coach Becker',
      level: 'Spin Enthusiasts',
      status: 'Announcing Hours Soon',
    },
    {
      court: 'COURT 05-06 (HARD COURT)',
      day: 'Friday Afternoon',
      program: 'Intra-School Ladder & Challenge Matches',
      coach: 'Student Captains',
      level: 'Open Play & Doubles',
      status: 'Announcing Hours Soon',
    },
    {
      court: 'STADIUM COURT 07 (GRASS)',
      day: 'Saturday Morning',
      program: 'Grand Slam Squad Training & Speed Radars',
      coach: 'Head Coach Novak',
      level: 'Tournament Team',
      status: 'Announcing Hours Soon',
    },
  ];

  return (
    <section id="schedule-section" className="relative py-16 sm:py-24 bg-[#06080d] border-t border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full brutal-pill border border-[#ccff00]/30 text-xs font-mono text-[#ccff00] mb-3">
              <i className="fa-solid fa-location-dot text-[#ccff00]"></i>
              <span>TEMPLEMICHAEL COLLEGE // LONGFORD N39 DA02</span>
            </div>
            <h2 className="font-display-brutal font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
              TRAINING <span className="text-[#ccff00]">SCHEDULE</span>
            </h2>
          </div>
          <div className="text-left md:text-right">
            <span className="font-mono text-xs text-slate-400 block">
              CAMPUS GROUNDS // 8 TOURNAMENT COURTS
            </span>
            <span className="font-mono text-xs text-[#ccff00] font-bold">
              Templemichael Glebe, Longford Co. Longford N39 DA02
            </span>
          </div>
        </div>

        {/* PROMINENT UNDER CONSTRUCTION BANNER */}
        <div className="mb-10 sm:mb-14">
          <div className="brutal-card rounded-3xl p-5 sm:p-10 md:p-12 border border-[#ccff00]/40 bg-[#090d16] text-center relative overflow-hidden shadow-[0_0_50px_rgba(204,255,0,0.1)]">
            
            {/* Background glowing contour circle */}
            <div className="absolute -top-24 -left-24 w-48 sm:w-60 h-48 sm:h-60 bg-[#ccff00]/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-48 sm:w-60 h-48 sm:h-60 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-2xl mx-auto space-y-5 sm:space-y-6 relative z-10">
              <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[10px] sm:text-[11px] font-mono text-[#ccff00]">
                <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-ping"></span>
                <span>TERM COURT ALLOCATION IN PROGRESS</span>
              </span>

              <div className="space-y-2.5 sm:space-y-3">
                <h3 className="font-pixel text-xl sm:text-3xl md:text-4xl text-white tracking-tight uppercase">
                  Schedule under construction.
                </h3>
                <p className="text-sm sm:text-lg text-[#ccff00] font-mono font-bold">
                  Sign up below to be the first to know the training hours!
                </p>
                <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto font-sans leading-relaxed">
                  The coaching staff is aligning court floodlight schedules and tournament match calendars with school athletic directors. Reserve your spot today to receive instant notifications.
                </p>
              </div>

              <div>
                <button
                  onClick={onNotifyClick}
                  className="w-full sm:w-auto min-h-[48px] px-6 sm:px-8 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-black bg-[#ccff00] hover:bg-[#d9ff33] neon-lime-glow transition-all active:scale-95 flex items-center justify-center space-x-2 mx-auto shadow-lg"
                  id="schedule-notify-cta"
                >
                  <span>Notify Me First on Schedule Release</span>
                  <i className="fa-solid fa-arrow-down text-xs"></i>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* COURT ROTATION GRID */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">
              Projected Court Tracks
            </span>
            <span className="font-mono text-xs text-[#ccff00]">Free Access for All Enrolled Students</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {courtTracks.map((item, idx) => (
              <div
                key={idx}
                className="brutal-card rounded-2xl p-5 border border-white/10 bg-[#080b12] hover:border-[#ccff00]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-[10px] text-[#ccff00] block mb-2 uppercase">
                    {item.court}
                  </span>
                  <h4 className="font-display-brutal font-bold text-base text-white mb-2 uppercase">
                    {item.program}
                  </h4>
                  <p className="font-mono text-xs text-slate-400 mb-1">
                    {item.day}
                  </p>
                  <p className="font-mono text-[11px] text-slate-500">
                    Lead: {item.coach}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px]">
                  <span className="text-slate-400">{item.level}</span>
                  <span className="text-[#ccff00] font-bold">HOURS TBA</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
