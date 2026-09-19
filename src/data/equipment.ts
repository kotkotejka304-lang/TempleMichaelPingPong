import { EquipmentItem } from '../types';

export const EQUIPMENT_LIST: EquipmentItem[] = [
  {
    id: 'free-tennis-gear',
    name: 'Templemichael Standard Club Bats & Gear',
    category: 'free',
    price: 0.00,
    rentalNote: 'Free for all Templemichael College students',
    description: 'Complimentary standard composite bats, graphite tennis rackets, and pressurised championship balls. 100% free for all students.',
    badge: '100% Free for Students',
    features: [
      'Standard composite and graphite school frames',
      'Pre-strung and rubber-cushioned for all skill levels',
      'Pressurised tour-grade championship balls included',
      'Instant access on court with Templemichael College ID'
    ],
    specs: {
      speed: 70,
      spin: 72,
      control: 90
    },
    rubberColor: 'bg-lime-400',
    iconClass: 'fa-solid fa-circle-dot'
  },
  {
    id: 'babolat-pure-aero',
    name: 'Pure Aero Spin Master Bat',
    category: 'premium',
    rentalNote: 'Option to rent: Talk to Ivan Peredrii',
    description: 'Aeromodular frame geometry designed to slice through air for maximum angular head speed and vicious heavy topspin arcs.',
    badge: 'Extreme Spin',
    features: [
      'Aeromodular 3 aerodynamic beam technology',
      'FSI Spin open string and high-friction surface pattern',
      'NF²-Tech natural flax fibers for vibration dampening',
      'Weight: 300g / 10.6 oz tour tuned'
    ],
    specs: {
      speed: 88,
      spin: 99,
      control: 86
    },
    rubberColor: 'bg-[#ccff00]',
    iconClass: 'fa-solid fa-wind',
    highlight: false
  },
  {
    id: 'wilson-pro-staff',
    name: 'Pro Staff Carbon Matrix Bat',
    category: 'premium',
    rentalNote: 'Option to rent: Talk to Ivan Peredrii',
    description: 'Braided graphite and Aramid construction offering surgical precision, laser-guided ball pocketing, and crisp baseline feedback.',
    badge: 'Pro Precision',
    features: [
      'Braid 45° multidirectional carbon layup',
      'Paradigm Bending tailored flex profile',
      'Precision surgical head and sweet spot placement',
      'Weight: 315g / 11.1 oz championship grade'
    ],
    specs: {
      speed: 94,
      spin: 88,
      control: 98
    },
    rubberColor: 'bg-red-500',
    iconClass: 'fa-solid fa-crosshairs',
    highlight: true // Popular
  },
  {
    id: 'head-speed-cyber',
    name: 'Cyber-Speed Grand Slam Bat',
    category: 'premium',
    rentalNote: 'Option to rent: Talk to Ivan Peredrii',
    description: 'Futuristic Auxetic 2.0 construction delivering sensational impact feel, high-velocity flat smashes, and tournament-winning stability.',
    badge: 'Flagship Speed',
    features: [
      'Auxetic 2.0 active feedback architecture',
      'Aerodynamic speed beam for lightning reflex speed',
      'Optimized sweet spot for fast rallies and smashes',
      'Weight: 310g / 10.9 oz championship spec'
    ],
    specs: {
      speed: 99,
      spin: 92,
      control: 94
    },
    rubberColor: 'bg-emerald-400',
    iconClass: 'fa-solid fa-bolt',
    highlight: false
  }
];

export const OWN_GEAR_OPTION: EquipmentItem = {
  id: 'own-tennis-racket',
  name: 'Bring My Own Bats / Rackets',
  category: 'free',
  price: 0.00,
  rentalNote: 'Personal equipment',
  description: 'Play with your personal bats or rackets. Court reservation, nets, and club balls are 100% free.',
  features: [
    'Use your personal equipment on any court',
    'Free club pressurised balls provided',
    'Free court lighting & partner matchmaking'
  ]
};
