
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { doctors, timeSlots } from '@/lib/doctors-data';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/i18n';

const formSchema = z.object({
  doctorId: z.string({ required_error: 'Please select a doctor.' }),
  date: z.date({ required_error: 'Please select a date.' }),
  timeSlot: z.string({ required_error: 'Please select a time slot.' }),
});

type FormValues = z.infer<typeof formSchema>;

type AppointmentFormProps = {
  selectedDoctorId: string | null;
  setSelectedDoctorId: (id: string | null) => void;
};


export function AppointmentForm({ selectedDoctorId, setSelectedDoctorId }: AppointmentFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language].appointments.form;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      doctorId: selectedDoctorId || undefined,
    }
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    const doctor = doctors.find(d => d.id === values.doctorId);
    toast({
      title: t.successTitle,
      description: t.successDescription
        .replace('{doctorName}', doctor?.name || '')
        .replace('{date}', values.date.toDateString())
        .replace('{timeSlot}', values.timeSlot),
    });
    form.reset({ doctorId: values.doctorId });
    form.setValue('doctorId', values.doctorId);
  }
  
  const handleDoctorChange = (doctorId: string) => {
    setSelectedDoctorId(doctorId);
    form.setValue('doctorId', doctorId);
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>{t.title}</CardTitle>
            <CardDescription>
              {t.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="doctorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.doctorLabel}</FormLabel>
                  <Select onValueChange={handleDoctorChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t.doctorPlaceholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {doctors.map(doctor => (
                         <SelectItem key={doctor.id} value={doctor.id}>{doctor.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.dateLabel}</FormLabel>
                  <FormControl>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
                      initialFocus
                      className="p-0 rounded-md border"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="timeSlot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.timeSlotLabel}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t.timeSlotPlaceholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeSlots.map(slot => (
                         <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.loadingButton}
                </>
              ) : (
                t.button
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
