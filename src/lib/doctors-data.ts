
export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  avatarId: string;
  hospital: string;
  address: string;
  phone: string;
  location: {
    lat: number;
    lng: number;
  };
};

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Anjali Sharma',
    specialty: 'Cardiologist',
    avatarId: 'doctor-avatar-1',
    hospital: 'Vaidya Health Care',
    address: '123 Health St, Wellness City, 12345',
    phone: '+91 98765 43210',
    location: { lat: 12.9716, lng: 77.5946 }, // Bangalore
  },
  {
    id: '2',
    name: 'Dr. Rajesh Kumar',
    specialty: 'Dermatologist',
    avatarId: 'doctor-avatar-2',
    hospital: 'Vaidya Apollo Hospital',
    address: '456 Skin Well Rd, Glow Town, 54321',
    phone: '+91 91234 56789',
    location: { lat: 13.0827, lng: 80.2707 }, // Chennai
  },
];

export const timeSlots = ['10:00 AM', '11:00 AM', '02:00 PM', '04:30 PM'];
