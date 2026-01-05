
"use client";

import { AppLayout } from '@/components/app-layout';
import { PageHeader } from '@/components/page-header';
import { AppointmentForm } from '@/components/appointments/appointment-form';
import { UpcomingAppointments } from '@/components/appointments/upcoming-appointments';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/i18n';

export default function AppointmentsPage() {
  const { language } = useLanguage();
  const t = translations[language].appointments;

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <PageHeader
          title={t.title}
          description={t.description}
        />
        <main className="flex-1 grid gap-8 p-4 md:p-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <AppointmentForm />
          </div>
          <div className="lg:col-span-2">
            <UpcomingAppointments />
          </div>
        </main>
      </div>
    </AppLayout>
  );
}
