import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Calendar, Clock } from "lucide-react";

const appointments = [
    {
        id: '1',
        doctorName: 'Dr. Anjali Sharma',
        specialty: 'Cardiologist',
        date: '2024-08-15',
        time: '10:00 AM',
        avatarId: 'doctor-avatar-1',
    },
    {
        id: '2',
        doctorName: 'Dr. Rajesh Kumar',
        specialty: 'Dermatologist',
        date: '2024-08-22',
        time: '02:00 PM',
        avatarId: 'doctor-avatar-2',
    }
];

export function UpcomingAppointments() {
    const getAvatarUrl = (avatarId: string) => {
        return PlaceHolderImages.find(img => img.id === avatarId)?.imageUrl || '';
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Here are your scheduled consultations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {appointments.length > 0 ? appointments.map(apt => (
                    <Card key={apt.id} className="flex items-center p-4 gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={getAvatarUrl(apt.avatarId)} alt={apt.doctorName} />
                            <AvatarFallback>{apt.doctorName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                            <p className="font-semibold text-lg">{apt.doctorName}</p>
                            <p className="text-sm text-muted-foreground">{apt.specialty}</p>
                            <div className="flex items-center gap-4 text-sm mt-2">
                                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {new Date(apt.date).toLocaleDateString()}</span>
                                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {apt.time}</span>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm">Cancel</Button>
                    </Card>
                )) : (
                    <p className="text-center text-muted-foreground py-8">No upcoming appointments.</p>
                )}
            </CardContent>
        </Card>
    );
}
