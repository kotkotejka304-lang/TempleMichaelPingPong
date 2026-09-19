export interface EquipmentItem {
  id: string;
  name: string;
  category: 'free' | 'premium';
  price?: number;
  rentalNote?: string;
  description: string;
  badge?: string;
  features: string[];
  specs?: {
    speed: number; // 0-100
    spin: number;  // 0-100
    control: number; // 0-100
  };
  rubberColor?: string;
  iconClass?: string;
  highlight?: boolean;
}

export interface BookingFormData {
  fullName: string;
  email: string;
  gradeLevel: string;
  selectedEquipmentId: string;
  additionalNotes: string;
}

export interface BookingConfirmation {
  ticketId: string;
  timestamp: string;
  fullName: string;
  email: string;
  gradeLevel: string;
  equipment: EquipmentItem;
  rentalNote: string;
  additionalNotes?: string;
  emailDeliveryStatus?: 'sent' | 'pending' | 'direct';
  recipientEmail?: string;
}
