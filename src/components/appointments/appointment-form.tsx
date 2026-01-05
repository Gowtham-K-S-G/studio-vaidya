
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/i18n';
import type { Doctor } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useFirebase } from '@/firebase';
import { addDoc, collection, serverTimestamp, writeBatch, doc } from 'firebase/firestore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export const timeSlots = ['10:00 AM', '11:00 AM', '02:00 PM', '04:30 PM'];


const formSchema = z.object({
  doctorId: z.string({ required_error: 'Please select a doctor.' }),
  date: z.date({ required_error: 'Please select a date.' }),
  timeSlot: z.string({ required_error: 'Please select a time slot.' }),
});

type FormValues = z.infer<typeof formSchema>;

type AppointmentFormProps = {
  doctors: Doctor[];
  isLoadingDoctors: boolean;
  selectedDoctorId: string | null;
  setSelectedDoctorId: (id: string | null) => void;
};


export function AppointmentForm({ doctors, isLoadingDoctors, selectedDoctorId, setSelectedDoctorId }: AppointmentFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();
  const { firestore, user } = useFirebase();
  const t = translations[language].appointments.form;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      doctorId: selectedDoctorId || undefined,
    }
  });

  function createPatientNotification(doctor: Doctor, values: FormValues) {
    if (!firestore || !user) return Promise.reject("Firestore not available or user not logged in");

    const notificationsCollection = collection(firestore, 'notifications');
    
    // Notification for the Patient
    const patientNotification = {
        userId: user.uid,
        title: "Appointment Confirmed",
        message: `Your appointment with Dr. ${doctor.name} is confirmed for ${format(values.date, "PPP")} at ${values.timeSlot}.`,
        createdAt: serverTimestamp(),
        isRead: false,
    };
    
    return addDoc(notificationsCollection, patientNotification).catch(error => {
      console.error("Error creating patient notification:", error);
      const permissionError = new FirestorePermissionError({
        path: notificationsCollection.path,
        operation: 'create',
        requestResourceData: patientNotification,
      });
      errorEmitter.emit('permission-error', permissionError);
      throw permissionError; 
    });
  }


  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    
    const doctor = doctors.find(d => d.id === values.doctorId);
    if (!doctor || !user) {
        setIsLoading(false);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Selected doctor not found or user not signed in.",
        });
        return;
    }

    try {
        await createPatientNotification(doctor, values);
        
        toast({
            title: t.successTitle,
            description: t.successDescription
                .replace('{doctorName}', doctor.name)
                .replace('{date}', format(values.date, "PPP"))
                .replace('{timeSlot}', values.timeSlot),
        });
        toast({
            title: "Notification Sent",
            description: `You have been notified of your appointment with Dr. ${doctor.name}.`
        });
        form.reset({ doctorId: values.doctorId });
        form.setValue('doctorId', values.doctorId);

    } catch (error) {
        console.error("Failed to book appointment or send notification:", error);
        if (!(error instanceof FirestorePermissionError)) {
          toast({
              variant: "destructive",
              title: "Booking Failed",
              description: "Could not complete the appointment booking. Please try again."
          });
        }
    } finally {
        setIsLoading(false);
    }
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
            {isLoadingDoctors ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : (
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
            )}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t.dateLabel}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0,0,0,0))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
                    <FormControl>
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          {timeSlots.map(slot => (
                              <Button
                                  key={slot}
                                  type="button"
                                  variant={field.value === slot ? 'default' : 'outline'}
                                  onClick={() => field.onChange(slot)}
                              >
                                  {slot}
                              </Button>
                          ))}
                      </div>
                  </FormControl>
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
