import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

const records = [
    {
        id: 'rec1',
        title: 'Cardiology Consultation with Dr. Anjali Sharma',
        date: '2024-05-20',
        tags: ['Check-up', 'Cardiology'],
        content: {
            notes: 'Patient reported occasional chest tightness. ECG and stress test were normal. Advised lifestyle changes including diet and exercise. Follow-up in 3 months.',
            reports: [{ name: 'ECG_Report_May24.pdf' }, { name: 'Stress_Test_May24.pdf' }]
        }
    },
    {
        id: 'rec2',
        title: 'Dermatology Visit with Dr. Rajesh Kumar',
        date: '2024-03-11',
        tags: ['Dermatology', 'Rash'],
        content: {
            notes: 'Patient presented with a mild eczema flare-up on the right arm. Prescribed a topical steroid cream. Condition improved after one week of treatment.',
            reports: []
        }
    },
    {
        id: 'rec3',
        title: 'Annual Physical Examination',
        date: '2024-01-15',
        tags: ['General', 'Annual Exam'],
        content: {
            notes: 'Overall health is good. Blood work results are within normal ranges. Blood pressure slightly elevated at 130/85 mmHg. Advised to monitor BP and reduce sodium intake.',
            reports: [{ name: 'Blood_Test_Jan24.pdf' }]
        }
    }
];

export function RecordsAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
        {records.map(record => (
            <AccordionItem value={record.id} key={record.id}>
                <AccordionTrigger>
                    <div className="flex justify-between items-center w-full pr-4">
                        <span className="font-medium text-left">{record.title}</span>
                        <span className="text-sm text-muted-foreground">{record.date}</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                    <div className="flex gap-2">
                        {record.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                    </div>
                    <h4 className="font-semibold">Consultation Notes:</h4>
                    <p className="text-sm text-muted-foreground">{record.content.notes}</p>
                    {record.content.reports.length > 0 && (
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
