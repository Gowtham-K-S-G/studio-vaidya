
import type { Timestamp } from 'firebase/firestore';

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

export type Notification = {
    id: string;
    userId: string;
    title: string;
    message: string;
    createdAt: Timestamp;
    isRead: boolean;
};
