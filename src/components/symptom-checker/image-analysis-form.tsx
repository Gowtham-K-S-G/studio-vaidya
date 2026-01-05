
"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { getImageDiagnosis } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Bot, Loader2, Upload, AlertTriangle, Download } from 'lucide-react';
import type { ImageBasedDiagnosisOutput } from '@/ai/flows/image-based-diagnosis';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/i18n';

const formSchema = z.object({
  photo: z.any().refine(
    (files) => files?.length === 1,
    'Please upload an image.'
  ),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function ImageAnalysisForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ImageBasedDiagnosisOutput | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [submittedDescription, setSubmittedDescription] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language].symptomChecker.image;


  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(values: FormValues) {
    if (!preview) {
      toast({
        variant: 'destructive',
        title: 'No Image',
        description: 'Please upload an image to analyze.',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);
    setSubmittedDescription(values.description || '');

    const response = await getImageDiagnosis({
      photoDataUri: preview,
      description: values.description,
      language: language,
    });
    
    setIsLoading(false);

    if (response.success && response.data) {
      setResult(response.data);
    } else {
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: response.error || 'Could not analyze the image. Please try again.',
      });
    }
  }

  const handleDownload = () => {
    if (!result) return;
    const reportContent = `
AI Image Analysis Report
========================

Date of Analysis: ${new Date().toLocaleString()}
Report Language: ${language}

User-provided Description:
--------------------------
${submittedDescription || 'No description provided.'}

AI Analysis Results:
--------------------
- Preliminary Diagnosis: ${result.diagnosis}
- Assessed Severity: ${result.severity}
- Recommendation: ${result.recommendation}

Disclaimer:
-----------
${t.disclaimer.title}: ${t.disclaimer.text}
`;
    const blob = new Blob([reportContent.trim()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI-Image-Analysis-${new Date().toISOString().split('T')[0]}.txt`;
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
                  name="photo"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="file"
                          className="hidden"
                          accept="image/*"
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
             
            {preview && (
              <div className="relative w-full h-48 mt-4">
                <Image src={preview} alt="Image preview" layout="fill" objectFit="contain" className="rounded-md" />
              </div>
            )}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.optionalDescriptionLabel}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t.optionalDescriptionPlaceholder}
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading || !preview}>
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
            <div className="flex justify-between items-center">
              <h3 className="flex items-center gap-2 font-semibold">
                <Bot className="h-5 w-5 text-primary" />
                {t.resultTitle}
              </h3>
               <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                {t.downloadButton}
              </Button>
            </div>
            <div className="grid gap-2 text-sm">
                <p><strong>{t.preliminaryDiagnosisLabel}:</strong> {result.diagnosis}</p>
                <p><strong>{t.assessedSeverityLabel}:</strong> {result.severity}</p>
                <p><strong>{t.recommendationLabel}:</strong> {result.recommendation}</p>
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
