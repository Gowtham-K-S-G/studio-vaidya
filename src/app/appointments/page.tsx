
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
import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
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
import { useToast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';


export default function AppointmentsPage() {
  const { language } = useLanguage();
  const t = translations[language].appointments;
  const { toast } = useToast();

  const { firestore } = useFirebase();
  
  const doctorsCollection = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'doctors');
  }, [firestore]);

  const { data: doctors, isLoading: isLoadingDoctors } = useCollection<Doctor>(doctorsCollection);
  
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [isAddDoctorOpen, setIsAddDoctorOpen] = useState(false);

  const selectedDoctor = doctors?.find(d => d.id === selectedDoctorId);

  const handleAddDoctor = (doctorData: Omit<Doctor, 'id' | 'location' | 'avatarId'>) => {
    if (!doctorsCollection) return;
    
    const newDoctorData = {
      ...doctorData,
      avatarId: `doctor-avatar-${Math.floor(Math.random() * 10) + 3}`,
      location: { lat: 12.9716, lng: 77.5946 }, 
    };

    addDoc(doctorsCollection, newDoctorData)
    .then(() => {
        toast({
            title: t.addDoctor.successTitle,
            description: t.addDoctor.successDescription.replace('{doctorName}', newDoctorData.name),
        });
        setIsAddDoctorOpen(false);
    })
    .catch((serverError) => {
        console.error("Error adding doctor: ", serverError);
        const permissionError = new FirestorePermissionError({
            path: doctorsCollection.path,
            operation: 'create',
            requestResourceData: newDoctorData,
        });
        errorEmitter.emit('permission-error', permissionError);
    });
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
