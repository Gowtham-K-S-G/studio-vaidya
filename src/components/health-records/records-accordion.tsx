
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Download, Loader2 } from "lucide-react";
import { useFirebase, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, where, orderBy } from "firebase/firestore";
import { format } from "date-fns";

type HealthRecord = {
    id: string;
    title: string;
    date: string;
    tags: string[];
    content: {
        notes: string;
        reports: { name: string }[];
    };
};

export function RecordsAccordion() {
  const { firestore, user } = useFirebase();

  const recordsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(
        collection(firestore, 'health_records'), 
        where('userId', '==', user.uid),
        orderBy('date', 'desc')
    );
  }, [firestore, user]);

  const { data: records, isLoading } = useCollection<HealthRecord>(recordsQuery);

  if (isLoading) {
      return <div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin"/></div>
  }

  if (!records || records.length === 0) {
      return <p className="text-center text-muted-foreground p-8">No health records found. Actions you take in the app, like booking an appointment, will appear here.</p>
  }

  return (
    <Accordion type="single" collapsible className="w-full">
        {records.map(record => (
            <AccordionItem value={record.id} key={record.id}>
                <AccordionTrigger>
                    <div className="flex justify-between items-center w-full pr-4">
                        <span className="font-medium text-left">{record.title}</span>
                        <span className="text-sm text-muted-foreground">{format(new Date(record.date), 'PP')}</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                    <div className="flex gap-2">
                        {record.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                    </div>
                    <h4 className="font-semibold">Notes:</h4>
                    <p className="text-sm text-muted-foreground">{record.content.notes}</p>
                    {record.content.reports && record.content.reports.length > 0 && (
                        <div>
                            <h4 className="font-semibold mt-4 mb-2">Attached Reports:</h4>
                            <ul className="space-y-2">
                                {record.content.reports.map(report => (
                                    <li key={report.name} className="flex items-center justify-between">
                                        <span className="text-sm">{report.name}</span>
                                        <Button variant="outline" size="sm">
                                            <Download className="mr-2 h-4 w-4"/>
                                            Download
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </AccordionContent>
            </AccordionItem>
        ))}
    </Accordion>
  );
}
