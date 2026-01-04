import { AppLayout } from '@/components/app-layout';
import { PageHeader } from '@/components/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MedicationSchedule } from '@/components/health-tracker/medication-schedule';
import { VitalsChart } from '@/components/health-tracker/vitals-chart';
import { Pill, Activity } from 'lucide-react';

export default function HealthTrackerPage() {
  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <PageHeader
          title="Health Tracker"
          description="Monitor your medication and vital signs."
        />
        <main className="flex-1 p-4 md:p-8">
          <Tabs defaultValue="medication" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="medication">
                <Pill className="mr-2 h-4 w-4" />
                Medication Schedule
              </TabsTrigger>
              <TabsTrigger value="vitals">
                <Activity className="mr-2 h-4 w-4" />
                Vital Signs
              </TabsTrigger>
            </TabsList>
            <TabsContent value="medication">
              <MedicationSchedule />
            </TabsContent>
            <TabsContent value="vitals">
              <VitalsChart />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </AppLayout>
  );
}
