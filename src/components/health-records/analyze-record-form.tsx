
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
import { analyzeHealthRecord } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Bot, Loader2, Upload, AlertTriangle, FileText } from 'lucide-react';
import type { AnalyzeHealthRecordOutput } from '@/ai/flows/analyze-health-record';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/i18n';

const formSchema = z.object({
  file: z.any().refine(
    (files) => files?.length === 1,
    'Please upload a file.'
  ),
});

type FormValues = z.infer<typeof formSchema>;

export function AnalyzeRecordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeHealthRecordOutput | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileDataUri, setFileDataUri] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language].healthRecords.analysis;


  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        toast({
            variant: "destructive",
            title: "File too large",
            description: "Please upload a file smaller than 4MB."
        })
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileDataUri(reader.result as string);
        setFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit() {
    if (!fileDataUri) {
      toast({
        variant: 'destructive',
        title: 'No File',
        description: 'Please upload a file to analyze.',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    const response = await analyzeHealthRecord({
      fileDataUri: fileDataUri,
      language: language,
    });
    
    setIsLoading(false);

    if (response.success && response.data) {
      setResult(response.data);
    } else {
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: response.error || 'Could not analyze the file. Please try again.',
      });
    }
  }

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
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="file"
                          className="hidden"
                          accept="image/*,.pdf"
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
             
            {fileName && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground border rounded-md p-2">
                <FileText className="h-5 w-5 flex-shrink-0" />
                <span className="truncate flex-grow">{fileName}</span>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading || !fileDataUri}>
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
          <div className="mt-4 rounded-lg border bg-secondary/50 p-4 space-y-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <Bot className="h-5 w-5 text-primary" />
              {t.resultTitle}
            </h3>
            <div className="grid gap-2 text-sm">
                <p><strong>{t.diagnosisLabel}:</strong> {result.diagnosis}</p>
                <p><strong>{t.medicationLabel}:</strong> {result.medication}</p>
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
