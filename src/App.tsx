/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Inventory } from './components/Inventory';
import { Schedule } from './components/Schedule';
import { BookingForm } from './components/BookingForm';
import { Footer } from './components/Footer';
import { EQUIPMENT_LIST } from './data/equipment';
import { EquipmentItem } from './types';

export default function App() {
  // Default to Free Standard Gear (€0.00)
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentItem>(EQUIPMENT_LIST[0]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectEquipment = (item: EquipmentItem) => {
    setSelectedEquipment(item);
    // Smoothly scroll down to the dynamic booking form so user immediately sees the updated price and field
    scrollToSection('booking-section');
  };

  return (
    <div className="min-h-screen bg-[#06080d] text-slate-100 relative selection:bg-[#ccff00] selection:text-black">
      {/* Top Fixed Brutalist Dock Navigation Bar */}
      <Navbar
        selectedEquipment={selectedEquipment}
        onScrollToSection={scrollToSection}
      />

      <main>
        {/* 1. Hero Section */}
        <Hero
          onJoinClick={() => scrollToSection('booking-section')}
          onExploreGearClick={() => scrollToSection('rentals-section')}
        />

        {/* 2. Inventory & Racket Rental Section */}
        <Inventory
          selectedEquipment={selectedEquipment}
          onSelectEquipment={handleSelectEquipment}
        />

        {/* 3. Schedule Section with under-construction state */}
        <Schedule
          onNotifyClick={() => scrollToSection('booking-section')}
        />

        {/* 4. Dynamic Booking Form with live Euro (€) update */}
        <BookingForm
          selectedEquipment={selectedEquipment}
          onEquipmentChange={setSelectedEquipment}
        />
      </main>

      {/* Footer */}
      <Footer
        onScrollToSection={scrollToSection}
      />
    </div>
  );
}
