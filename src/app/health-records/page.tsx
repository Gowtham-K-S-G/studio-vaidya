import { AppLayout } from '@/components/app-layout';
import { PageHeader } from '@/components/page-header';
import { RecordsAccordion } from '@/components/health-records/records-accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HealthRecordsPage() {
  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <PageHeader
          title="Health Records"
          description="Your secure and structured health history."
        />
        <main className="flex-1 p-4 md:p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Medical History</CardTitle>
                    <CardDescription>Review past consultations, reports, and diagnoses.</CardDescription>
                </CardHeader>
                <CardContent>
                    <RecordsAccordion />
                </CardContent>
            </Card>
        </main>
      </div>
    </AppLayout>
  );
}
