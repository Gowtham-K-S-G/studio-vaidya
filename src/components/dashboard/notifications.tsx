
"use client";

import { useFirebase, useMemoFirebase, useCollection } from "@/firebase";
import { collection, query, where, orderBy, limit } from "firebase/firestore";
import type { Notification } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Bell, Calendar, Pill } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { useLanguage } from "@/context/language-context";
import { translations } from "@/lib/i18n";
import { Badge } from "../ui/badge";


function NotificationItem({ notification }: { notification: Notification }) {
    const isAppointment = notification.title.toLowerCase().includes('appointment');
    const Icon = isAppointment ? Calendar : Pill;
    const date = notification.createdAt?.toDate ? formatDistanceToNow(notification.createdAt.toDate(), { addSuffix: true }) : 'just now';

    return (
        <div className="flex items-start gap-4 p-4 rounded-md hover:bg-secondary/50">
            <div className="flex-shrink-0">
                <Badge variant={isAppointment ? "default" : "secondary"} className="p-2">
                   <Icon className="h-5 w-5" />
                </Badge>
            </div>
            <div className="flex-grow">
                <p className="font-semibold">{notification.title}</p>
                <p className="text-sm text-muted-foreground">{notification.message}</p>
                 <p className="text-xs text-muted-foreground mt-1">{date}</p>
            </div>
        </div>
    )
}


export function Notifications() {
    const { user, firestore } = useFirebase();
    const { language } = useLanguage();
    const t = translations[language].dashboard.reminders;
    
    const notificationsQuery = useMemoFirebase(() => {
        if (!firestore || !user) return null;
        return query(
            collection(firestore, 'notifications'), 
            where('userId', '==', user.uid),
            orderBy('createdAt', 'desc'),
            limit(10)
        );
    }, [firestore, user]);

    const { data: notifications, isLoading } = useCollection<Notification>(notificationsQuery);

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5 text-primary"/>{t.title}</CardTitle>
                <CardDescription>{t.description}</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading && (
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <Skeleton className="h-12 w-12 rounded-md" />
                            <div className="space-y-2 flex-grow">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <Skeleton className="h-12 w-12 rounded-md" />
                            <div className="space-y-2 flex-grow">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>
                    </div>
                )}
                {!isLoading && notifications && notifications.length > 0 && (
                    <div className="space-y-2">
                        {notifications.map(n => <NotificationItem key={n.id} notification={n} />)}
                    </div>
                )}
                 {!isLoading && (!notifications || notifications.length === 0) && (
                    <div className="text-center py-10">
                        <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
                        <p className="mt-4 text-sm text-muted-foreground">{t.noNotifications}</p>
                    </div>
                 )}
            </CardContent>
        </Card>
    );
}
