"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const medicationSchedule = [
  { id: 1, name: 'Lisinopril', dosage: '10mg', time: '8:00 AM', taken: true, type: 'Morning' },
  { id: 2, name: 'Metformin', dosage: '500mg', time: '8:00 AM', taken: true, type: 'Morning' },
  { id: 3, name: 'Simvastatin', dosage: '20mg', time: '8:00 PM', taken: false, type: 'Evening' },
  { id: 4, name: 'Aspirin', dosage: '81mg', time: '8:00 AM', taken: false, type: 'Morning' },
  { id: 5, name: 'Paracetamol', dosage: '1 tablet', time: '2:00 PM', taken: false, type: 'Afternoon' },
];

export function MedicationSchedule() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Today's Medication</CardTitle>
                <CardDescription>Check off your medications as you take them.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">Taken</TableHead>
                            <TableHead>Medication</TableHead>
                            <TableHead>Dosage</TableHead>
                            <TableHead>Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {medicationSchedule.map(med => (
                            <TableRow key={med.id} data-state={med.taken ? "selected" : ""}>
                                <TableCell>
                                    <Checkbox checked={med.taken} aria-label={`Mark ${med.name} as taken`} />
                                </TableCell>
                                <TableCell className="font-medium">{med.name}</TableCell>
                                <TableCell>{med.dosage}</TableCell>
                                <TableCell className="flex items-center gap-2">
                                    {med.time}
                                    <Badge variant={med.type === 'Morning' ? 'default' : 'secondary'} className="hidden sm:inline-flex">{med.type}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
