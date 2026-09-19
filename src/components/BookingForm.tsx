import React, { useState, useEffect } from 'react';
import { EquipmentItem, BookingConfirmation } from '../types';
import { EQUIPMENT_LIST, OWN_GEAR_OPTION } from '../data/equipment';

interface BookingFormProps {
  selectedEquipment: EquipmentItem;
  onEquipmentChange: (item: EquipmentItem) => void;
}

const ADMIN_EMAIL = 'kotkotejka304@gmail.com';

export const BookingForm: React.FC<BookingFormProps> = ({
  selectedEquipment,
  onEquipmentChange,
}) => {
  const allEquipmentOptions = [...EQUIPMENT_LIST, OWN_GEAR_OPTION];

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    gradeLevel: 'Grade 7 (Year 1)',
    additionalNotes: '',
  });

  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [flashMessage, setFlashMessage] = useState<string | null>(null);
  const [emailStatusMessage, setEmailStatusMessage] = useState<string | null>(null);

  // Sync notification when equipment changes
  useEffect(() => {
    setFlashMessage(`Selected: ${selectedEquipment.name}`);
    const t = setTimeout(() => setFlashMessage(null), 4000);
    return () => clearTimeout(t);
  }, [selectedEquipment]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateMailtoUrl = (ticketCode?: string) => {
    const code = ticketCode || `TC-${Math.floor(100000 + Math.random() * 900000)}`;
    const rentalDetail =
      selectedEquipment.category === 'premium'
        ? 'YES - Requested tournament bat rental (Talk to Ivan Peredrii)'
        : 'NO - Using complimentary standard club gear';

    const subject = encodeURIComponent(
      `[Templemichael Tennis] Student Registration: ${formData.fullName || 'Student'} (${formData.gradeLevel})`
    );

    const body = encodeURIComponent(
      `TEMPLEMICHAEL COLLEGE TENNIS CLUB & ACADEMY\n` +
      `New Student Member Registration Slip\n` +
      `===========================================\n` +
      `Pass Code: ${code}\n` +
      `Full Name: ${formData.fullName}\n` +
      `Student Email: ${formData.email}\n` +
      `Grade / Year: ${formData.gradeLevel}\n` +
      `Equipment Choice: ${selectedEquipment.name}\n` +
      `Bat Rental Note: ${rentalDetail}\n` +
      `Notes / Inquiries: ${formData.additionalNotes || 'None'}\n` +
      `Time: ${new Date().toLocaleString('en-GB')}\n\n` +
      `Delivered to: ${ADMIN_EMAIL}`
    );

    return `mailto:${ADMIN_EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setEmailStatusMessage(null);

    const rentalNote =
      selectedEquipment.category === 'premium'
        ? 'Option to rent bats: Talk to Ivan Peredrii'
        : 'Standard club gear included 100% free';

    const ticketId = `TC-${Math.floor(100000 + Math.random() * 900000)}`;
    const timestamp = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    let deliveredSuccessfully = false;

    try {
      // Send directly to the user's email via FormSubmit AJAX service
      const res = await fetch(`https://formsubmit.co/ajax/${ADMIN_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `[Templemichael Tennis] Registration: ${formData.fullName} (${formData.gradeLevel})`,
          _template: 'table',
          _captcha: 'false',
          'Pass Code': ticketId,
          'Student Full Name': formData.fullName,
          'Student Email': formData.email,
          'Grade / Year': formData.gradeLevel,
          'Selected Equipment': selectedEquipment.name,
          'Bat Rental Note': rentalNote,
          'Additional Inquiries': formData.additionalNotes || 'None',
          'Submission Timestamp': timestamp,
        }),
      });

      if (res.ok) {
        deliveredSuccessfully = true;
      }
    } catch (err) {
      console.warn('FormSubmit network notice:', err);
    }

    const generatedTicket: BookingConfirmation = {
      ticketId,
      timestamp,
      fullName: formData.fullName || 'Student Member',
      email: formData.email,
      gradeLevel: formData.gradeLevel,
      equipment: selectedEquipment,
      rentalNote,
      additionalNotes: formData.additionalNotes,
      emailDeliveryStatus: deliveredSuccessfully ? 'sent' : 'direct',
      recipientEmail: ADMIN_EMAIL,
    };

    setConfirmation(generatedTicket);
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setConfirmation(null);
    setFormData({
      fullName: '',
      email: '',
      gradeLevel: 'Grade 7 (Year 1)',
      additionalNotes: '',
    });
  };

  return (
    <section id="booking-section" className="relative py-16 sm:py-24 bg-[#05070c] border-t border-white/10 scroll-mt-20">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-[#ccff00]/5 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-3 border-b border-white/10 pb-6">
          <div>
            <span className="font-mono text-xs text-[#ccff00] uppercase tracking-widest block mb-2">
              // REGISTRATION & EQUIPMENT RESERVATION
            </span>
            <h2 className="font-display-brutal font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
              JOIN THE <span className="text-[#ccff00]">CLUB</span>
            </h2>
          </div>
          <div className="text-left md:text-right font-mono text-xs text-slate-400">
            <span className="text-white font-bold">100% FREE</span> FOR ALL ENROLLED STUDENTS • NO PAYMENT REQUIRED
          </div>
        </div>

        {/* Live sync banner */}
        {flashMessage && (
          <div className="max-w-xl mx-auto mb-6 sm:mb-8 animate-in fade-in slide-in-from-top-3 duration-300">
            <div className="brutal-card px-4 py-2.5 rounded-2xl border border-[#ccff00]/60 bg-[#090e18] flex items-center justify-between text-xs font-mono text-white shadow-[0_0_20px_rgba(204,255,0,0.2)]">
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-ping"></span>
                <span>{flashMessage}</span>
              </span>
              <span className="text-[#ccff00] font-bold text-[10px]">SYNCED</span>
            </div>
          </div>
        )}

        {/* Grid: Form & Live Calculation Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
          
          {/* Left: Booking Form */}
          <div className="lg:col-span-7">
            <div className="brutal-card rounded-3xl p-4 sm:p-8 md:p-10 border border-white/10 bg-[#090d16] shadow-2xl relative">
              
              <h3 className="font-display-brutal font-bold text-lg sm:text-xl text-white mb-5 sm:mb-6 uppercase flex items-center space-x-2">
                <span className="text-[#ccff00] font-pixel text-base">+</span>
                <span>Student Details & Equipment Choice</span>
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6" id="tennis-booking-form">
                
                {/* Student Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block font-mono text-xs text-slate-300 uppercase">
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Julian Vance"
                      className="brutal-input w-full px-4 py-3 rounded-xl font-sans text-sm text-white placeholder:text-slate-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-mono text-xs text-slate-300 uppercase">
                      Templemichael College Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="student@templemichaelcollege.ie"
                      className="brutal-input w-full px-4 py-3 rounded-xl font-sans text-sm text-white placeholder:text-slate-600"
                    />
                  </div>
                </div>

                {/* Grade / Year Level */}
                <div className="space-y-1.5">
                  <label className="block font-mono text-xs text-slate-300 uppercase">
                    Grade / Year Level *
                  </label>
                  <select
                    name="gradeLevel"
                    value={formData.gradeLevel}
                    onChange={handleChange}
                    className="brutal-input w-full px-4 py-3 rounded-xl font-sans text-sm text-white bg-[#0a0e16]"
                  >
                    <option value="Grade 7 (Year 1)">Grade 7 (Year 1)</option>
                    <option value="Grade 8 (Year 2)">Grade 8 (Year 2)</option>
                    <option value="Grade 9 (Year 3)">Grade 9 (Year 3)</option>
                    <option value="Grade 10 (Year 4)">Grade 10 (Year 4)</option>
                    <option value="Grade 11 (Year 5)">Grade 11 (Year 5)</option>
                    <option value="Grade 12 (Year 6)">Grade 12 (Year 6)</option>
                  </select>
                </div>

                {/* DYNAMIC EQUIPMENT SELECTOR */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="block font-mono text-xs text-[#ccff00] uppercase font-bold flex items-center space-x-1.5">
                      <span>Bat / Equipment Selection (Live Dynamic Sync) *</span>
                    </label>
                    <span className="font-mono text-[10px] text-slate-400">
                      Syncs with bat cards above
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {allEquipmentOptions.map((eq) => {
                      const isPicked = selectedEquipment.id === eq.id;

                      return (
                        <div
                          key={eq.id}
                          onClick={() => onEquipmentChange(eq)}
                          className={`cursor-pointer rounded-2xl p-3.5 border transition-all ${
                            isPicked
                              ? 'border-[#ccff00] bg-[#0c1422] shadow-[0_0_20px_rgba(204,255,0,0.2)]'
                              : 'border-white/10 bg-[#070a10] hover:border-white/25'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2.5">
                              <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                isPicked ? 'border-[#ccff00] bg-[#ccff00]' : 'border-slate-600'
                              }`}>
                                {isPicked && <span className="w-1 h-1 rounded-full bg-black"></span>}
                              </div>
                              <div>
                                <p className={`text-xs font-bold font-mono ${isPicked ? 'text-white' : 'text-slate-300'}`}>
                                  {eq.name}
                                </p>
                                <p className="text-[10px] font-mono text-slate-500 truncate max-w-[130px]">
                                  {eq.category === 'free' ? 'Standard Free Gear' : 'Talk to Ivan Peredrii'}
                                </p>
                              </div>
                            </div>

                            <span className={`font-mono text-[11px] font-bold ${
                              eq.category === 'free' ? 'text-[#ccff00]' : 'text-slate-300'
                            }`}>
                              {eq.category === 'free' ? 'FREE' : 'RENT OPTION'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="space-y-1.5">
                  <label className="block font-mono text-xs text-slate-300 uppercase">
                    Partner or Training Inquiries (Optional)
                  </label>
                  <textarea
                    name="additionalNotes"
                    rows={2}
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    placeholder="e.g. Looking for doubles partner, left-handed serve training, tournament squad interest..."
                    className="brutal-input w-full px-4 py-2.5 rounded-xl font-sans text-sm text-white placeholder:text-slate-600 resize-none"
                  ></textarea>
                </div>

                {/* Email dispatch indicator */}
                <div className="p-3.5 rounded-2xl bg-[#070a12] border border-[#ccff00]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center space-x-2 text-slate-300">
                    <i className="fa-solid fa-paper-plane text-[#ccff00]"></i>
                    <span>Submissions delivered to:</span>
                  </div>
                  <span className="font-bold text-[#ccff00] text-[11px] select-all">
                    {ADMIN_EMAIL}
                  </span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-mono text-xs sm:text-sm font-black uppercase tracking-wider text-black bg-[#ccff00] hover:bg-[#d9ff33] neon-lime-glow transition-all active:scale-98 flex items-center justify-center space-x-2"
                  id="submit-tennis-pass"
                >
                  {isSubmitting ? (
                    <span className="flex items-center space-x-2">
                      <i className="fa-solid fa-circle-notch fa-spin"></i>
                      <span>SENDING REGISTRATION TO {ADMIN_EMAIL}...</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-2">
                      <i className="fa-solid fa-paper-plane"></i>
                      <span>SUBMIT PASS & SEND TO EMAIL</span>
                    </span>
                  )}
                </button>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-1 text-[10px] font-mono text-slate-400">
                  <span>ZERO PAYMENT REQUIRED</span>
                  <span>OPTION TO RENT BATS: <strong className="text-[#ccff00]">IVAN PEREDRII</strong></span>
                </div>

              </form>
            </div>
          </div>

          {/* Right: Bat Rental Advisory & Specs Card */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="brutal-card rounded-3xl p-6 sm:p-8 border border-[#ccff00]/40 bg-[#090d16] relative overflow-hidden">
              
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <span className="font-mono text-xs font-bold text-[#ccff00] uppercase tracking-wider flex items-center space-x-1.5">
                  <i className="fa-solid fa-bell"></i>
                  <span>BAT RENTAL & PASS SUMMARY</span>
                </span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#ccff00]/15 text-[#ccff00] border border-[#ccff00]/30">
                  NO PAYMENT
                </span>
              </div>

              {/* HIGHLIGHTED NOTE ABOUT IVAN PEREDRII */}
              <div className="mb-6 p-4 rounded-2xl bg-[#0e1626] border border-[#ccff00]/40 space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#ccff00]"></span>
                  <span className="font-mono text-xs font-bold text-white uppercase">
                    Option to Rent Bats
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  There is an option to rent bats for matches and training. To arrange equipment rental, you have to talk directly to <strong className="text-[#ccff00] font-bold">Ivan Peredrii</strong> at the sports desk.
                </p>
                <div className="pt-1 text-[11px] font-mono text-slate-400 flex items-center justify-between border-t border-white/10">
                  <span>Contact:</span>
                  <span className="text-[#ccff00] font-bold">Ivan Peredrii (Campus)</span>
                </div>
              </div>

              <div className="space-y-4 font-mono text-xs">
                
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Student Club Membership</span>
                  <span className="font-bold text-[#ccff00]">100% FREE</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Court Reservation (8 Courts)</span>
                  <span className="font-bold text-[#ccff00]">100% FREE</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Championship Tennis Balls</span>
                  <span className="font-bold text-[#ccff00]">INCLUDED FREE</span>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Selected Equipment:</span>
                      <span className="text-white font-bold text-sm block mt-0.5">
                        {selectedEquipment.name}
                      </span>
                      <span className="text-[10px] text-slate-500 italic">
                        {selectedEquipment.category === 'free' ? 'Included Standard' : 'Option to rent: Talk to Ivan Peredrii'}
                      </span>
                    </div>

                    <span className="font-mono text-xs text-[#ccff00] font-bold">
                      {selectedEquipment.category === 'free' ? 'FREE' : 'TALK TO IVAN'}
                    </span>
                  </div>
                </div>

                <div className="pt-5 border-t-2 border-white/15">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
                        TOTAL ONLINE PAYMENT
                      </span>
                      <span className="text-[10px] text-slate-500">No payment required</span>
                    </div>

                    <div className="font-pixel text-2xl sm:text-3xl text-[#ccff00] font-black">
                      €0.00
                    </div>
                  </div>
                </div>

              </div>

              {/* Racket Spec visual if premium */}
              {selectedEquipment.specs && (
                <div className="mt-6 pt-5 border-t border-white/10 -mx-6 -mb-6 p-6 bg-black/40">
                  <span className="font-mono text-[10px] text-slate-400 block mb-2 uppercase tracking-wider">
                    Engineered Profile: {selectedEquipment.name}
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[9px] text-slate-400 block">SPEED</span>
                      <span className="font-bold text-white">{selectedEquipment.specs.speed}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[9px] text-slate-400 block">SPIN</span>
                      <span className="font-bold text-[#ccff00]">{selectedEquipment.specs.spin}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[9px] text-slate-400 block">CONTROL</span>
                      <span className="font-bold text-blue-400">{selectedEquipment.specs.control}</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

            <div className="brutal-card rounded-2xl p-5 border border-white/10 bg-[#070a12] space-y-2 font-mono text-xs text-slate-400">
              <span className="text-white font-bold block flex items-center space-x-1.5">
                <i className="fa-solid fa-circle-info text-[#ccff00]"></i>
                <span>COURT ACCESS GUIDELINES</span>
              </span>
              <p className="text-[11px] leading-relaxed">
                All school students receive free access upon presenting their digital pass or student card at the court desk. Non-marking tennis footwear required on Decoturf & Grass courts.
              </p>
            </div>

          </div>

        </div>

        {/* BRUTALIST CONFIRMATION MODAL TICKET */}
        {confirmation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto py-6">
            <div className="brutal-card max-w-lg w-full rounded-3xl p-5 sm:p-8 border border-[#ccff00] bg-[#07090e] shadow-[0_0_60px_rgba(204,255,0,0.3)] relative my-auto max-h-[92vh] overflow-y-auto">
              
              <button
                onClick={handleReset}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 min-h-[44px] min-w-[44px] w-11 h-11 rounded-full brutal-pill text-slate-300 hover:text-white hover:border-[#ccff00] flex items-center justify-center"
                aria-label="Close Modal"
              >
                <i className="fa-solid fa-xmark text-sm"></i>
              </button>

              <div className="text-center space-y-2 mb-6">
                <div className="flex justify-center mb-3">
                  <div className="w-14 h-16 filter drop-shadow-[0_4px_12px_rgba(201,151,24,0.4)]">
                    <img
                      src="/templemichael-college-logo.svg"
                      alt="Templemichael College Crest"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <span className="font-mono text-[10px] text-[#ccff00] uppercase tracking-widest block font-bold">
                  // OFFICIAL TEMPLEMICHAEL COLLEGE STUDENT PASS
                </span>
                <h3 className="font-pixel text-xl sm:text-2xl text-white uppercase">
                  TEMPLEMICHAEL COLLEGE
                </h3>
                <p className="font-mono text-[11px] text-slate-400">
                  Templemichael Glebe, Longford Co. Longford N39 DA02
                </p>
                <p className="font-mono text-xs text-[#ccff00]">
                  Present this pass at Pro-Shop Court 01
                </p>
              </div>

              {/* Pass Slip */}
              <div className="rounded-2xl p-5 bg-[#0a0d16] border border-white/15 space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="text-slate-500">PASS CODE:</span>
                  <span className="text-[#ccff00] font-black text-sm">{confirmation.ticketId}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500">PLAYER:</span>
                  <span className="text-white font-bold">{confirmation.fullName}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500">YEAR / GRADE:</span>
                  <span className="text-slate-200">{confirmation.gradeLevel}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500">STUDENT EMAIL:</span>
                  <span className="text-slate-200 truncate max-w-[200px]">{confirmation.email}</span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-white/10">
                  <span className="text-slate-500">SELECTED GEAR:</span>
                  <span className="text-[#ccff00] font-bold">{confirmation.equipment.name}</span>
                </div>

                <div className="flex justify-between items-start">
                  <span className="text-slate-500">BAT RENTAL NOTE:</span>
                  <span className="text-white text-right max-w-[220px] font-bold text-[11px] text-[#ccff00]">
                    {confirmation.rentalNote}
                  </span>
                </div>

                <div className="flex justify-between items-start pt-2 border-t border-white/10">
                  <span className="text-slate-500">EMAIL DISPATCHED:</span>
                  <div className="text-right">
                    <span className="text-[#ccff00] font-bold text-[11px] block">{ADMIN_EMAIL}</span>
                    <span className="text-[10px] text-emerald-400 flex items-center justify-end space-x-1">
                      <i className="fa-solid fa-check"></i>
                      <span>Sent to inbox</span>
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-white/10">
                  <span className="text-slate-500">MEMBERSHIP FEE:</span>
                  <span className="text-white font-pixel text-base">€0.00 (100% FREE)</span>
                </div>
              </div>

              {/* Direct Mail Client Link fallback */}
              <div className="mt-4">
                <a
                  href={generateMailtoUrl(confirmation.ticketId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl border border-[#ccff00]/40 bg-[#0e1626] hover:bg-[#131f36] text-[11px] font-mono text-[#ccff00] flex items-center justify-center space-x-2 transition-colors"
                >
                  <i className="fa-solid fa-envelope-open-text"></i>
                  <span>OPEN EMAIL COPY IN GMAIL / MAIL APP</span>
                </a>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-3 rounded-xl font-mono text-xs font-bold uppercase text-white brutal-pill hover:bg-white/10 flex items-center justify-center space-x-2"
                >
                  <i className="fa-solid fa-print"></i>
                  <span>PRINT PASS</span>
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 py-3 rounded-xl font-mono text-xs font-bold uppercase text-black bg-[#ccff00] hover:bg-[#d9ff33] neon-lime-glow flex items-center justify-center space-x-2"
                >
                  <i className="fa-solid fa-check"></i>
                  <span>DONE</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
