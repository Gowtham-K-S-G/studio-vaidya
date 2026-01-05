
"use client";

import { useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { PageHeader } from '@/components/page-header';
import { AppointmentForm } from '@/components/appointments/appointment-form';
import { UpcomingAppointments } from '@/components/appointments/upcoming-appointments';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/i18n';
import type { Doctor } from '@/lib/doctors-data';
import { HospitalDetails } from '@/components/appointments/hospital-details';
import { doctors } from '@/lib/doctors-data';

export default function AppointmentsPage() {
  const { language } = useLanguage();
  const t = translations[language].appointments;
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(doctors[0].id);

  const selectedDoctor = doctors.find(d => d.id === selectedDoctorId);

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <PageHeader
          title={t.title}
          description={t.description}
        />
        <main className="flex-1 grid gap-8 p-4 md:p-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <AppointmentForm 
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
