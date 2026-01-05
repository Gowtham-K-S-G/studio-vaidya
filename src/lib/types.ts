
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
