import Link from 'next/link';
import { AppLayout } from '@/components/app-layout';
import { PageHeader } from '@/components/page-header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Calendar, HeartPulse, FileText, ArrowRight, Pill } from 'lucide-react';

const featureCards = [
  {
    icon: Bot,
    title: 'AI Assistant',
    description: 'Get instant health advice by describing your symptoms or uploading an image.',
    href: '/symptom-checker',
    cta: 'Get Diagnosis',
  },
  {
    icon: Calendar,
    title: 'Appointments',
    description: 'Book and manage your appointments with healthcare professionals.',
    href: '/appointments',
    cta: 'Book Now',
  },
  {
    icon: HeartPulse,
    title: 'Health Tracker',
    description: 'Monitor your medications and vital signs to stay on top of your health.',
    href: '/health-tracker',
    cta: 'View Tracker',
  },
  {
    icon: FileText,
    title: 'Health Records',
    description: 'Access your complete medical history and past consultations securely.',
    href: '/health-records',
    cta: 'View Records',
  },
];

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="flex flex-col">
        <PageHeader
          title="Welcome to Swasth Sahayak"
          description="Your personal AI health assistant."
        />
        <main className="flex-1 space-y-8 p-4 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                  <Link href={feature.href} passHref>
                    <Button className="w-full">
                      {feature.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Today's Reminders</CardTitle>
              <CardDescription>Your medication and appointments for today.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Pill className="h-4 w-4 text-primary" />
                  <span>Take Paracetamol - 1 tablet at 2:00 PM</span>
                </li>
                <li className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-accent" />
                  <span>Appointment with Dr. Sharma at 4:30 PM</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </main>
      </div>
    </AppLayout>
  );
}
