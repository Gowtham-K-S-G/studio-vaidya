
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Calendar, Clock, Hospital } from "lucide-react";
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/i18n';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";


const initialAppointments = [
    {
        id: '1',
        doctorName: 'Dr. Anjali Sharma',
        specialty: 'Cardiologist',
        hospital: 'Vaidya Health Care',
        date: '2024-08-15',
        time: '10:00 AM',
        avatarId: 'doctor-avatar-1',
    },
    {
        id: '2',
        doctorName: 'Dr. Rajesh Kumar',
        specialty: 'Dermatologist',
        hospital: 'Vaidya Apollo Hospital',
        date: '2024-08-22',
        time: '02:00 PM',
        avatarId: 'doctor-avatar-2',
    }
];

export function UpcomingAppointments() {
    const { language } = useLanguage();
    const t = translations[language].appointments.upcoming;
    const { toast } = useToast();
    const [appointments, setAppointments] = useState(initialAppointments);
    
    const getAvatarUrl = (avatarId: string) => {
        return PlaceHolderImages.find(img => img.id === avatarId)?.imageUrl || '';
    }

    const handleCancelAppointment = (appointmentId: string) => {
        setAppointments(currentAppointments =>
            currentAppointments.filter(apt => apt.id !== appointmentId)
        );
        toast({
            title: "Appointment Cancelled",
            description: "The appointment has been removed from your schedule.",
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t.title}</CardTitle>
                <CardDescription>{t.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {appointments.length > 0 ? appointments.map(apt => (
                    <Card key={apt.id} className="flex items-start p-4 gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={getAvatarUrl(apt.avatarId)} alt={apt.doctorName} />
                            <AvatarFallback>{apt.doctorName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                            <p className="font-semibold text-lg">{apt.doctorName}</p>
                            <p className="text-sm text-muted-foreground">{apt.specialty}</p>
                             <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                                <Hospital className="h-4 w-4" /> <span>{apt.hospital}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm mt-1">
                                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {new Date(apt.date).toLocaleDateString()}</span>
                                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {apt.time}</span>
                            </div>
                        </div>
                         <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">{t.cancelButton}</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure you want to cancel?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently remove the appointment from your schedule.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Back</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleCancelAppointment(apt.id)}>
                                Yes, Cancel
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                    </Card>
                )) : (
                    <p className="text-center text-muted-foreground py-8">{t.noAppointments}</p>
                )}
            </CardContent>
        </Card>
    );
}
