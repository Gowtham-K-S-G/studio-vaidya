
"use client";

import { useState, useRef } from 'react';
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
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { analyzeHealthReport } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Bot, Loader2, Upload, AlertTriangle, Download, FileText, Pill } from 'lucide-react';
import type { AnalyzeHealthReportOutput } from '@/ai/flows/health-report-analysis';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/i18n';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

const formSchema = z.object({
  report: z.any().refine(
    (files) => files?.length === 1,
    'Please upload a file.'
  ),
});

type FormValues = z.infer<typeof formSchema>;

export function HealthReportForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeHealthReportOutput | null>(null);
  const [filePreview, setFilePreview] = useState<{name: string, type: string} | null>(null);
  const [dataUri, setDataUri] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language].healthReport;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        setFilePreview({ name: file.name, type: file.type });
        const reader = new FileReader();
        reader.onloadend = () => {
          setDataUri(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        toast({
            variant: 'destructive',
            title: 'Invalid File Type',
            description: 'Please upload an image or a PDF file.',
        });
        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        form.reset();
        setFilePreview(null);
        setDataUri(null);
      }
    }
  };

  async function onSubmit(values: FormValues) {
    if (!dataUri) {
      toast({
        variant: 'destructive',
        title: 'No File',
        description: 'Please upload a report file to analyze.',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    const response = await analyzeHealthReport({
      reportDataUri: dataUri,
      language: language,
    });
    
    setIsLoading(false);

    if (response.success && response.data) {
      setResult(response.data);
    } else {
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: response.error || 'Could not analyze the report. Please try again.',
      });
    }
  }

  const handleDownload = () => {
    if (!result || !filePreview) return;
    const reportContent = `
AI Health Report Analysis
=========================

Date of Analysis: ${new Date().toLocaleString()}
Original File: ${filePreview.name}

AI Analysis:
------------
${result.analysis}

Suggested Medication:
---------------------
${result.suggestedMedication.map(med => 
`  - Name: ${med.name}
    Dosage: ${med.dosage}
    Frequency: ${med.frequency}
    Reason: ${med.reason}`
).join('\n\n')}

Disclaimer:
-----------
${t.disclaimer.title}: ${t.disclaimer.text}
`;
    const blob = new Blob([reportContent.trim()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI-Health-Report-Analysis-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>{t.title}</CardTitle>
            <CardDescription>{t.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="p-4 border-2 border-dashed rounded-lg text-center cursor-pointer hover:border-primary"
              onClick={() => fileInputRef.current?.click()}
             >
                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">{t.uploadArea}</p>
                <FormField
                  control={form.control}
                  name="report"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="file"
                          className="hidden"
                          accept="image/*,application/pdf"
                          ref={fileInputRef}
                          onChange={(e) => {
                            field.onChange(e.target.files);
                            handleFileChange(e);
                          }}
                        />
                      </FormControl>
                       <FormMessage />
                    </FormItem>
                  )}
                />
             </div>
             
            {filePreview && (
              <div className="mt-4 flex items-center gap-3 rounded-md border p-3">
                <FileText className="h-6 w-6 flex-shrink-0" />
                <div className="flex-grow">
                    <p className="text-sm font-medium">{filePreview.name}</p>
                    <p className="text-xs text-muted-foreground">{filePreview.type}</p>
                </div>
              </div>
            )}

          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading || !dataUri}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.analyzingButton}
                </>
              ) : (
                t.analyzeButton
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
      {result && (
        <CardContent>
          <div className="mt-4 rounded-lg border bg-secondary/50 p-4 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="flex items-center gap-2 font-semibold text-lg">
                <Bot className="h-6 w-6 text-primary" />
                {t.resultTitle}
              </h3>
               <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                {t.downloadButton}
              </Button>
            </div>
            <div className="grid gap-6 text-sm">
                <div>
                    <h4 className="font-semibold mb-2 flex items-center text-base"><FileText className="mr-2 h-5 w-5"/>{t.analysisLabel}</h4>
                    <p className="text-muted-foreground whitespace-pre-wrap">{result.analysis}</p>
                </div>
                
                <div>
                    <h4 className="font-semibold mb-2 flex items-center text-base"><Pill className="mr-2 h-5 w-5"/>{t.medicationLabel}</h4>
                    {result.suggestedMedication.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>Medication</TableHead>
                                <TableHead>Dosage</TableHead>
                                <TableHead>Frequency</TableHead>
                                <TableHead>Reason</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {result.suggestedMedication.map((med, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{med.name}</TableCell>
                                        <TableCell>{med.dosage}</TableCell>
                                        <TableCell>{med.frequency}</TableCell>
                                        <TableCell>{med.reason}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p className="text-muted-foreground">No specific medications were suggested based on this report.</p>
                    )}
                </div>
            </div>
            <div className="flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-amber-800 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200">
                <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <p className="text-xs">
                    <strong>{t.disclaimer.title}:</strong> {t.disclaimer.text}
                </p>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
