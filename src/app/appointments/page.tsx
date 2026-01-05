
"use client";

import { useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { PageHeader } from '@/components/page-header';
import { AppointmentForm } from '@/components/appointments/appointment-form';
import { UpcomingAppointments } from '@/components/appointments/upcoming-appointments';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/i18n';
import type { Doctor } from '@/lib/types';
import { HospitalDetails } from '@/components/appointments/hospital-details';
import { useCollection, useFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AddDoctorForm } from '@/components/appointments/add-doctor-form';
import { addDocumentNonBlocking } from '@/firebase';
import { useToast } from '@/hooks/use-toast';

export default function AppointmentsPage() {
  const { language } = useLanguage();
  const t = translations[language].appointments;
  const { toast } = useToast();

  const { firestore } = useFirebase();
  const doctorsCollection = collection(firestore, 'doctors');

  const { data: doctors, isLoading: isLoadingDoctors } = useCollection<Doctor>(doctorsCollection);
  
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [isAddDoctorOpen, setIsAddDoctorOpen] = useState(false);

  const selectedDoctor = doctors?.find(d => d.id === selectedDoctorId);

  const handleAddDoctor = (doctorData: Omit<Doctor, 'id' | 'location' | 'avatarId'>) => {
    // In a real app, you would use a geocoding service to get lat/lng from address.
    // For now, we'll use placeholder coordinates.
    const newDoctor = {
      ...doctorData,
      avatarId: `doctor-avatar-${Math.floor(Math.random() * 10) + 3}`,
      location: { lat: 12.9716, lng: 77.5946 }, // Placeholder
    };
    addDocumentNonBlocking(doctorsCollection, newDoctor);
    toast({
      title: t.addDoctor.successTitle,
      description: t.addDoctor.successDescription.replace('{doctorName}', newDoctor.name),
    });
    setIsAddDoctorOpen(false);
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <PageHeader
          title={t.title}
          description={t.description}
        />
        <main className="flex-1 grid gap-8 p-4 md:p-8 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-4">
             <div className="flex justify-end">
              <Dialog open={isAddDoctorOpen} onOpenChange={setIsAddDoctorOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    {t.addDoctor.button}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t.addDoctor.title}</DialogTitle>
                    <DialogDescription>{t.addDoctor.description}</DialogDescription>
                  </DialogHeader>
                  <AddDoctorForm onSubmit={handleAddDoctor} />
                </DialogContent>
              </Dialog>
            </div>
            <AppointmentForm 
              doctors={doctors || []}
              isLoadingDoctors={isLoadingDoctors}
              selectedDoctorId={selectedDoctorId}
              setSelectedDoctorId={setSelectedDoctorId} 
            />
          </div>
          <div className="lg:col-span-3 space-y-8">
            {selectedDoctor && <HospitalDetails doctor={selectedDoctor} />}
            <UpcomingAppointments />
          </div>
        </main>
      </div>
    </AppLayout>
  );
}

