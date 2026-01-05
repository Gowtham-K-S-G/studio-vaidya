
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Calendar, Clock, Hospital, Loader2 } from "lucide-react";
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
import { useCollection, useFirebase, useMemoFirebase } from "@/firebase";
import { collection, query, where, doc, deleteDoc, orderBy } from 'firebase/firestore';
import type { Notification } from '@/lib/types';
import { Skeleton } from "../ui/skeleton";


export function UpcomingAppointments() {
    const { language } = useLanguage();
    const t = translations[language].appointments.upcoming;
    const { toast } = useToast();
    const { firestore, user } = useFirebase();

    const notificationsQuery = useMemoFirebase(() => {
        if (!firestore || !user) return null;
        return query(
            collection(firestore, 'notifications'),
            where("userId", "==", user.uid),
            orderBy("createdAt", "desc")
        );
    }, [firestore, user]);

    const { data: appointments, isLoading } = useCollection<Notification>(notificationsQuery);
    
    // This function is a placeholder and needs to be adapted
    // to match the actual data available in the notification.
    const getAvatarUrl = (message: string) => {
        if (message.includes("Anjali Sharma")) return PlaceHolderImages.find(img => img.id === 'doctor-avatar-1')?.imageUrl || '';
        if (message.includes("Rajesh Kumar")) return PlaceHolderImages.find(img => img.id === 'doctor-avatar-2')?.imageUrl || '';
        return `https://picsum.photos/seed/doctor/100/100`;
    }

    const parseAppointmentDetails = (notification: Notification) => {
        const message = notification.message;
        const doctorMatch = message.match(/with Dr. (.*?)\s/);
        const dateMatch = message.match(/for (.*?)\s/);
        const timeMatch = message.match(/at (.*?)\./);

        return {
            doctorName: doctorMatch ? `Dr. ${doctorMatch[1]}` : 'Unknown Doctor',
            date: dateMatch ? new Date(dateMatch[1]).toLocaleDateString() : 'N/A',
            time: timeMatch ? timeMatch[1] : 'N/A',
            // These would ideally come from the appointment data itself
            specialty: message.includes("Anjali Sharma") ? "Cardiologist" : "Dermatologist",
            hospital: message.includes("Anjali Sharma") ? 'Vaidya Health Care' : 'Vaidya Apollo Hospital',
        }
    }

    const handleCancelAppointment = async (appointmentId: string) => {
        if (!firestore) return;
        const docRef = doc(firestore, 'notifications', appointmentId);
        try {
            await deleteDoc(docRef);
            toast({
                title: "Appointment Cancelled",
                description: "The appointment has been removed from your schedule.",
            });
        } catch (error) {
            console.error("Error cancelling appointment: ", error);
            toast({
                variant: 'destructive',
                title: "Cancellation Failed",
                description: "Could not cancel the appointment. Please try again."
            })
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t.title}</CardTitle>
                <CardDescription>{t.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {isLoading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                ) : appointments && appointments.length > 0 ? appointments.map(apt => {
                    const details = parseAppointmentDetails(apt);
                    return (
                        <Card key={apt.id} className="flex items-start p-4 gap-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={getAvatarUrl(apt.message)} alt={details.doctorName} />
                                <AvatarFallback>{details.doctorName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                                <p className="font-semibold text-lg">{details.doctorName}</p>
                                <p className="text-sm text-muted-foreground">{details.specialty}</p>
                                 <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                                    <Hospital className="h-4 w-4" /> <span>{details.hospital}</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm mt-1">
                                    <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {details.date}</span>
                                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {details.time}</span>
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
                    )
                }) : (
                    <p className="text-center text-muted-foreground py-8">{t.noAppointments}</p>
                )}
            </CardContent>
        </Card>
    );
}
