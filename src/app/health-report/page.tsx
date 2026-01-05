
"use client";

import { AppLayout } from '@/components/app-layout';
import { PageHeader } from '@/components/page-header';
import { HealthReportForm } from '@/components/health-report/health-report-form';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/i18n';

export default function HealthReportPage() {
  const { language } = useLanguage();
  const t = translations[language].healthReport;

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <PageHeader
          title={t.title}
          description={t.description}
        />
        <main className="flex-1 p-4 md:p-8">
          <div className="w-full max-w-3xl mx-auto">
            <HealthReportForm />
          </div>
        </main>
      </div>
    </AppLayout>
  );
}
