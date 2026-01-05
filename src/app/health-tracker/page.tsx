
'use client';

import { AppLayout } from '@/components/app-layout';
import { PageHeader } from '@/components/page-header';
import { MedicationSchedule } from '@/components/health-tracker/medication-schedule';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AddMedicationForm } from '@/components/health-tracker/add-medication-form';
import { useState } from 'react';
import type { Medication } from '@/components/health-tracker/medication-schedule';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/i18n';

const initialMedications: Medication[] = [
  { id: 1, name: 'Lisinopril', dosage: '10mg', time: '08:00', taken: true, type: 'Morning' },
  { id: 2, name: 'Metformin', dosage: '500mg', time: '08:00', taken: true, type: 'Morning' },
  { id: 3, name: 'Simvastatin', dosage: '20mg', time: '20:00', taken: false, type: 'Evening' },
  { id: 4, name: 'Aspirin', dosage: '81mg', time: '08:00', taken: false, type: 'Morning' },
  { id: 5, name: 'Paracetamol', dosage: '1 tablet', time: '14:00', taken: false, type: 'Afternoon' },
];

export default function HealthTrackerPage() {
  const [medications, setMedications] = useState<Medication[]>(initialMedications);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { language } = useLanguage();
  const t = translations[language].healthTracker;

  const addMedication = (med: Omit<Medication, 'id' | 'taken'>) => {
    const newMedication: Medication = {
      ...med,
      id: medications.length + 1,
      taken: false,
    };
    setMedications([...medications, newMedication]);
    setIsFormOpen(false);
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <PageHeader title={t.title} description={t.description} />
        <main className="flex-1 p-4 md:p-8">
          <div className="flex justify-end items-center mb-4">
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  {t.addMedication.button}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t.addMedication.title}</DialogTitle>
                  <DialogDescription>
                    {t.addMedication.description}
                  </DialogDescription>
                </DialogHeader>
                <AddMedicationForm onSubmit={addMedication} />
              </DialogContent>
            </Dialog>
          </div>
          <MedicationSchedule medications={medications} setMedications={setMedications} />
        </main>
      </div>
    </AppLayout>
  );
}
