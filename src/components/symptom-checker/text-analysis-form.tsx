
"use client";

import { useState, useRef, useEffect } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { getSymptomAdvice, textToSpeech } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Bot, Loader2, Volume2, AlertTriangle, Pause, Play, Download, ClipboardList, Activity, ShieldAlert } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/i18n';
import type { GetHealthAdviceOutput } from '@/ai/flows/multilingual-health-advice';
import { Badge } from '../ui/badge';

const formSchema = z.object({
  symptoms: z.string().min(10, 'Please describe your symptoms in more detail (at least 10 characters).'),
  language: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export function TextAnalysisForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [result, setResult] = useState<GetHealthAdviceOutput | null>(null);
  const [submittedSymptoms, setSubmittedSymptoms] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language].symptomChecker.text;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: '',
      language: 'English',
    },
  });

  useEffect(() => {
    // Cleanup audio on component unmount
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setResult(null);
    setSubmittedSymptoms(values.symptoms);
    if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
        audioRef.current = null;
    }
    const response = await getSymptomAdvice(values);
    setIsLoading(false);

    if (response.success && response.data) {
      setResult(response.data);
    } else {
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: response.error || 'Could not get health advice. Please try again.',
      });
    }
  }

  async function handleTextToSpeech() {
    if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setIsPlaying(false);
        return;
    }
    if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
        return;
    }

    if (!result) return;
    const textToRead = `
        Preliminary Advice: ${result.preliminaryAdvice}.
        Possible Conditions: ${result.possibleConditions.join(', ')}.
        Suggested Actions: ${result.suggestedActions.join(', ')}.
        Urgency: ${result.urgency}.
    `;
    setIsSynthesizing(true);
    const response = await textToSpeech(textToRead);
    setIsSynthesizing(false);

    if (response.success && response.data) {
      const audio = new Audio(response.data);
      audioRef.current = audio;
      audio.play();
      setIsPlaying(true);
      audio.onended = () => {
        setIsPlaying(false);
        audioRef.current = null;
      };
    } else {
        toast({
            variant: "destructive",
            title: "Audio Failed",
            description: response.error || "Could not play audio. Please try again.",
        });
    }
  }

  const handleDownload = () => {
    if (!result || !submittedSymptoms) return;
    const reportContent = `
AI Symptom Analysis Report
===========================

Date of Analysis: ${new Date().toLocaleString()}
Report Language: ${form.getValues('language')}

Symptoms Described:
-------------------
${submittedSymptoms}

AI Preliminary Advice:
----------------------
${result.preliminaryAdvice}

Possible Conditions:
--------------------
${result.possibleConditions.map(c => `- ${c}`).join('\n')}

Suggested Actions:
------------------
${result.suggestedActions.map(a => `- ${a}`).join('\n')}

Urgency Assessment:
-------------------
${result.urgency}

Disclaimer:
-----------
${t.disclaimer.title}: ${t.disclaimer.text}
`;
    const blob = new Blob([reportContent.trim()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI-Symptom-Advice-${new Date().toISOString().split('T')[0]}.txt`;
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
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.languageLabel}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t.languagePlaceholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Kannada">Kannada</SelectItem>
                      <SelectItem value="Hindi">Hindi</SelectItem>
                      <SelectItem value="Tamil">Tamil</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="symptoms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.symptomsLabel}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t.symptomsPlaceholder}
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.analyzingButton}
                </>
              ) : (
                t.getAdviceButton
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
      {result && (
        <CardContent>
          <div className="mt-4 rounded-lg border bg-secondary/50 p-4 space-y-6">
            <div className="flex justify-between items-center mb-2">
                <h3 className="flex items-center gap-2 font-semibold text-lg">
                <Bot className="h-6 w-6 text-primary" />
                {t.resultTitle}
                </h3>
                <div className="flex items-center gap-2">
                    <Button onClick={handleTextToSpeech} disabled={isSynthesizing} size="sm" variant="outline">
                        {isSynthesizing ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : isPlaying ? (
                            <Pause className="mr-2 h-4 w-4" />
                        ) : (
                           <Volume2 className="mr-2 h-4 w-4" />
                        )}
                        {isPlaying ? t.pauseButton : t.readAloudButton}
                    </Button>
                     <Button onClick={handleDownload} size="sm" variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        {t.downloadButton}
                    </Button>
                </div>
            </div>
            
            <div className="space-y-4 text-sm">
                <div>
                    <h4 className="font-semibold mb-1">Preliminary Advice</h4>
                    <p className="text-muted-foreground">{result.preliminaryAdvice}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-semibold mb-2 flex items-center"><ClipboardList className="mr-2 h-4 w-4"/>Possible Conditions</h4>
                        <div className="flex flex-col space-y-1">
                            {result.possibleConditions.map((condition, index) => (
                                <Badge key={index} variant="secondary">{condition}</Badge>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2 flex items-center"><Activity className="mr-2 h-4 w-4"/>Suggested Actions</h4>
                        <ul className="list-disc list-inside text-muted-foreground">
                            {result.suggestedActions.map((action, index) => (
                                <li key={index}>{action}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold mb-1 flex items-center"><ShieldAlert className="mr-2 h-4 w-4"/>Urgency</h4>
                    <p className="text-muted-foreground">{result.urgency}</p>
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
