import React from 'react';
import { EquipmentItem } from '../types';
import { EQUIPMENT_LIST } from '../data/equipment';

interface InventoryProps {
  selectedEquipment: EquipmentItem;
  onSelectEquipment: (item: EquipmentItem) => void;
}

export const Inventory: React.FC<InventoryProps> = ({
  selectedEquipment,
  onSelectEquipment,
}) => {
  const freeGear = EQUIPMENT_LIST.find((item) => item.category === 'free')!;
  const premiumGear = EQUIPMENT_LIST.filter((item) => item.category === 'premium');

  return (
    <section id="rentals-section" className="relative py-24 bg-[#070a10] border-t border-white/10 scroll-mt-20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#ccff00]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-700/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full brutal-pill border border-[#ccff00]/30 text-xs font-mono text-[#ccff00] mb-3">
              <i className="fa-solid fa-crosshairs"></i>
              <span>ARSENAL // EQUIPMENT SPECIFICATION</span>
            </div>
            <h2 className="font-display-brutal font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
              BATS & <span className="text-[#ccff00]">EQUIPMENT</span>
            </h2>
          </div>
          <div className="text-right">
            <span className="font-mono text-xs text-slate-400 block">BAT RENTAL ADVISORY</span>
            <span className="font-mono text-sm font-bold text-[#ccff00]">TALK TO IVAN PEREDRII</span>
            <span className="text-xs text-slate-500 block">100% Free student access • No online fee</span>
          </div>
        </div>

        {/* PROMINENT NOTICE BANNER: OPTION TO RENT BATS VIA IVAN PEREDRII */}
        <div className="mb-8 sm:mb-10 p-4 sm:p-6 rounded-3xl brutal-card border-2 border-[#ccff00]/60 bg-[#0b1322] shadow-[0_0_35px_rgba(204,255,0,0.15)] relative overflow-hidden">
          <div className="absolute top-0 left-0 bottom-0 w-2 bg-[#ccff00]"></div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-5 pl-2 sm:pl-4">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00] animate-ping"></span>
                <span className="font-mono text-xs text-[#ccff00] font-black uppercase tracking-widest">
                  // NOTICE: BAT & RACKET RENTAL
                </span>
              </div>
              <h3 className="font-display-brutal font-black text-xl sm:text-2xl text-white uppercase">
                Need to rent bats? Talk to <span className="text-[#ccff00]">Ivan Peredrii</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-3xl leading-relaxed">
                There is an option to rent bats and competition tournament blades for your training sessions, PE, and club matches. To arrange a rental, please speak directly to <strong className="text-white font-bold underline decoration-[#ccff00]">Ivan Peredrii</strong> at the sports facility desk.
              </p>
            </div>

            <div className="w-full md:w-auto flex-shrink-0 px-4 py-3 rounded-2xl bg-[#06080d] border border-white/15 text-left md:text-right">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Equipment Contact</span>
              <span className="font-mono text-sm font-black text-[#ccff00] block">Ivan Peredrii</span>
              <span className="text-[11px] font-mono text-slate-400">Campus Sports Desk</span>
            </div>
          </div>
        </div>

        {/* 1. FREE STANDARD GEAR CARD */}
        <div className="mb-10 sm:mb-12">
          <div
            className={`brutal-card rounded-3xl p-5 sm:p-8 border transition-all duration-300 relative overflow-hidden ${
              selectedEquipment.id === freeGear.id
                ? 'border-[#ccff00] bg-[#0c121e] shadow-[0_0_40px_-5px_rgba(204,255,0,0.25)] ring-1 ring-[#ccff00]'
                : 'border-white/15 bg-[#090d16] hover:border-[#ccff00]/40'
            }`}
          >
            {/* Top lime accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ccff00] to-emerald-400"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#ccff00]/15 text-[#ccff00] border border-[#ccff00]/40 text-xs font-mono font-bold uppercase">
                    100% Free with Membership
                  </span>
                  <span className="text-xs font-mono text-slate-400">ALL 8 COURTS</span>
                </div>

                <div>
                  <h3 className="font-display-brutal font-black text-2xl sm:text-3xl text-white uppercase">
                    {freeGear.name}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
                    {freeGear.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {freeGear.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center space-x-2 text-xs font-mono text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] flex-shrink-0"></span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center space-y-4 border-t lg:border-t-0 lg:border-l border-white/10 pt-5 lg:pt-0 lg:pl-8">
                <div className="text-center lg:text-right">
                  <span className="text-xs font-mono text-slate-400 block">Student Access</span>
                  <span className="font-pixel text-2xl sm:text-3xl text-[#ccff00] font-black">100% FREE</span>
                  <span className="text-[10px] font-mono text-slate-500 block mt-0.5">Zero payment required</span>
                </div>

                <button
                  onClick={() => onSelectEquipment(freeGear)}
                  className={`w-full sm:w-auto min-h-[48px] px-6 py-3.5 rounded-xl font-mono text-xs font-bold uppercase transition-all flex items-center justify-center active:scale-98 ${
                    selectedEquipment.id === freeGear.id
                      ? 'bg-[#ccff00] text-black neon-lime-glow shadow-lg'
                      : 'brutal-pill text-white hover:border-[#ccff00]'
                  }`}
                  id="select-free-tennis-gear"
                >
                  {selectedEquipment.id === freeGear.id ? '✓ Selected (Free Club Gear)' : 'Select Free Gear'}
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* 2. THREE PRO TOUR TENNIS RACKETS */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-xs text-slate-400 uppercase tracking-wider flex items-center space-x-2">
              <i className="fa-solid fa-bolt text-[#ccff00]"></i>
              <span>Pro Tour Tournament Bats (Talk to Ivan Peredrii to Rent)</span>
            </span>
            <span className="font-mono text-xs text-[#ccff00] font-bold">
              No Online Payment
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {premiumGear.map((racket) => {
              const isSelected = selectedEquipment.id === racket.id;

              return (
                <div
                  key={racket.id}
                  className={`brutal-card rounded-3xl p-6 border flex flex-col justify-between transition-all duration-300 relative group ${
                    isSelected
                      ? 'border-[#ccff00] bg-[#0c121e] shadow-[0_0_35px_-5px_rgba(204,255,0,0.3)] ring-1 ring-[#ccff00]'
                      : 'border-white/10 bg-[#080c14] hover:border-white/30'
                  }`}
                >
                  {racket.highlight && (
                    <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-[#ccff00] text-black text-[10px] font-mono font-black uppercase tracking-wider">
                      Tour Favorite
                    </div>
                  )}

                  <div>
                    <div className="flex items-start justify-between gap-2 mb-4">
                      <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#ccff00] uppercase">
                        {racket.badge}
                      </span>

                      <div className="text-right">
                        <span className="px-2 py-0.5 rounded bg-[#ccff00]/15 text-[#ccff00] border border-[#ccff00]/30 font-mono text-[10px] font-bold block">
                          RENTAL OPTION
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 block mt-0.5">Talk to Ivan Peredrii</span>
                      </div>
                    </div>

                    <h4 className="font-display-brutal font-bold text-xl text-white group-hover:text-[#ccff00] transition-colors mb-2 uppercase">
                      {racket.name}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed mb-5 font-sans">
                      {racket.description}
                    </p>

                    {/* Spec meters */}
                    {racket.specs && (
                      <div className="space-y-2 p-3 rounded-2xl bg-black/50 border border-white/5 mb-5 font-mono text-[11px]">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-slate-400">SPEED</span>
                            <span className="text-white font-bold">{racket.specs.speed} / 100</span>
                          </div>
                          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${racket.specs.speed}%` }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-slate-400">SPIN</span>
                            <span className="text-[#ccff00] font-bold">{racket.specs.spin} / 100</span>
                          </div>
                          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#ccff00] rounded-full"
                              style={{ width: `${racket.specs.spin}%` }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-slate-400">CONTROL</span>
                            <span className="text-emerald-400 font-bold">{racket.specs.control} / 100</span>
                          </div>
                          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-400 rounded-full"
                              style={{ width: `${racket.specs.control}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Feature bullets */}
                    <div className="space-y-1.5 mb-6 text-[11px] font-mono text-slate-400">
                      {racket.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <span className="text-[#ccff00] text-[10px]">▸</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => onSelectEquipment(racket)}
                      className={`w-full min-h-[48px] py-3.5 rounded-xl font-mono text-xs font-bold uppercase transition-all flex items-center justify-center active:scale-98 ${
                        isSelected
                          ? 'bg-[#ccff00] text-black neon-lime-glow shadow-md'
                          : 'brutal-pill text-white hover:bg-white/10 active:border-[#ccff00]'
                      }`}
                      id={`select-tennis-racket-${racket.id}`}
                    >
                      {isSelected
                        ? '✓ Selected (Talk to Ivan Peredrii)'
                        : 'Select Bat Option'}
                    </button>
                    <p className="text-[10px] font-mono text-center text-slate-400">
                      Rental coordinated with <strong className="text-[#ccff00]">Ivan Peredrii</strong>
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
