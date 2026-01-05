
"use client";

import { AppLayout } from '@/components/app-layout';
import { PageHeader } from '@/components/page-header';
import { RecordsAccordion } from '@/components/health-records/records-accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/i18n';

export default function HealthRecordsPage() {
    const { language } = useLanguage();
    const t = translations[language].healthRecords;

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <PageHeader
          title={t.title}
          description={t.description}
        />
        <main className="flex-1 p-4 md:p-8">
            <Card>
                <CardHeader>
                    <CardTitle>{t.cardTitle}</CardTitle>
                    <CardDescription>{t.cardDescription}</CardDescription>
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
