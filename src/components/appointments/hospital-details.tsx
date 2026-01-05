
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, MapPin, Stethoscope } from 'lucide-react';
import type { Doctor } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";

type HospitalDetailsProps = {
  doctor: Doctor;
};

export function HospitalDetails({ doctor }: HospitalDetailsProps) {
  const getAvatarUrl = (avatarId: string) => {
    return PlaceHolderImages.find(img => img.id === avatarId)?.imageUrl || `https://picsum.photos/seed/${doctor.id}/100/100`;
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={getAvatarUrl(doctor.avatarId)} alt={doctor.name} />
          <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <CardTitle>{doctor.name}</CardTitle>
          <CardDescription className="flex items-center gap-2 mt-1">
            <Stethoscope className="h-4 w-4" /> {doctor.specialty}
          </CardDescription>
           <div className="flex items-center gap-2 mt-2 text-sm">
            <Phone className="h-4 w-4" />
            <a href={`tel:${doctor.phone}`} className="text-primary hover:underline">
              {doctor.phone}
            </a>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold text-lg mb-2">{doctor.hospital}</h3>
        <div className="flex items-start gap-2 text-muted-foreground mb-4">
            <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
            <span>{doctor.address}</span>
        </div>
        {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && doctor.location && (
          <div className="aspect-video w-full rounded-md overflow-hidden">
              <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&center=${doctor.location.lat},${doctor.location.lng}&zoom=15`}
              ></iframe>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
