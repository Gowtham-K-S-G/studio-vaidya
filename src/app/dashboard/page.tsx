
"use client";

import Link from 'next/link';
import { AppLayout } from '@/components/app-layout';
import { PageHeader } from '@/components/page-header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Calendar, Pill, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/i18n';

export default function DashboardPage() {
  const { language } = useLanguage();
  const t = translations[language].dashboard;

  const featureCards = [
    {
      icon: Bot,
      title: t.featureCards.aiAssistant.title,
      description: t.featureCards.aiAssistant.description,
      href: '/symptom-checker',
      cta: t.featureCards.aiAssistant.cta,
    },
    {
      icon: Calendar,
      title: t.featureCards.appointments.title,
      description: t.featureCards.appointments.description,
      href: '/appointments',
      cta: t.featureCards.appointments.cta,
    },
    {
      icon: Pill,
      title: t.featureCards.medication.title,
      description: t.featureCards.medication.description,
      href: '/medication',
      cta: t.featureCards.medication.cta,
    },
  ];

  return (
    <AppLayout>
      <div className="flex flex-col">
        <PageHeader
          title={t.title}
          description={t.description}
        />
        <main className="flex-1 space-y-8 p-4 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((feature) => (
            <Card key={feature.title} className="flex flex-col">
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <feature.icon className="h-6 w-6 text-primary" />
                    {feature.title}
                </CardTitle>
                <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                <Link href={feature.href}>
                    <Button className="w-full">
                    {feature.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
                </CardContent>
            </Card>
            ))}
          </div>
        </main>
      </div>
    </AppLayout>
  );
}
