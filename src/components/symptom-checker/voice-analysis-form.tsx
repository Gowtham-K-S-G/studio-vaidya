
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
import { analyzeVoiceSymptoms, textToSpeech } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Bot, Loader2, Mic, Square, Volume2, AlertTriangle, Pause, Download } from 'lucide-react';
import type { VoiceSymptomsOutput } from '@/ai/flows/voice-based-symptom-analysis';
import { useLanguage } from '@/context/language-context';
import { translations } from '@/lib/i18n';

const formSchema = z.object({
  language: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export function VoiceAnalysisForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [result, setResult] = useState<VoiceSymptomsOutput | null>(null);
  const [audioDataUri, setAudioDataUri] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { language } = useLanguage();
  const t = translations[language].symptomChecker.voice;


  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: 'English',
    },
  });

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          setAudioDataUri(reader.result as string);
        };
        reader.readAsDataURL(audioBlob);
        audioChunksRef.current = [];
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setResult(null);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        variant: 'destructive',
        title: 'Microphone Access Denied',
        description: 'Please enable microphone permissions in your browser settings.',
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      // Stop all media tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  useEffect(() => {
    if (audioDataUri) {
      form.handleSubmit(onSubmit)();
    }
  }, [audioDataUri, form]);

  useEffect(() => {
    // Cleanup audio on component unmount
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);


  async function onSubmit(values: FormValues) {
    if (!audioDataUri) {
        toast({
            variant: 'destructive',
            title: 'No Audio',
            description: 'Please record your symptoms before analyzing.',
        });
        return;
    }

    setIsLoading(true);
    setResult(null);
     if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(null);
        audioRef.current = null;
    }

    const response = await analyzeVoiceSymptoms({
      voiceDataUri: audioDataUri,
      language: values.language,
    });
    
    setIsLoading(false);
    setAudioDataUri(null);

    if (response.success && response.data) {
      setResult(response.data);
    } else {
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: response.error || 'Could not analyze the audio. Please try again.',
      });
    }
  }

  async function handleTextToSpeech(text: string, part: 'causes' | 'steps') {
    if (audioRef.current && !audioRef.current.paused && isPlaying === part) {
      audioRef.current.pause();
      setIsPlaying(null);
      return;
    }
    if (audioRef.current && audioRef.current.paused && isPlaying === part) {
      audioRef.current.play();
      return;
    }
    // If another part is playing, stop it
     if (audioRef.current) {
        audioRef.current.pause();
    }


    if (!text) return;
    setIsSynthesizing(true);
    const response = await textToSpeech(text);
    setIsSynthesizing(false);

    if (response.success && response.data) {
      const audio = new Audio(response.data);
      audioRef.current = audio;
      audio.play();
      setIsPlaying(part);
      audio.onplay = () => setIsPlaying(part);
      audio.onpause = () => setIsPlaying(null);
      audio.onended = () => {
        setIsPlaying(null);
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
    if (!result) return;
    const reportContent = `
AI Voice Analysis Report
========================

Date of Analysis: ${new Date().toLocaleString()}
Report Language: ${form.getValues('language')}

AI Analysis Results:
--------------------
- Possible Causes: ${result.possibleCauses}
- Suggested Next Steps: ${result.suggestedNextSteps}

Disclaimer:
-----------
${t.disclaimer.title}: ${t.disclaimer.text}
`;
    const blob = new Blob([reportContent.trim()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI-Voice-Analysis-${new Date().toISOString().split('T')[0]}.txt`;
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
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isRecording || isLoading}>
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
            <div className="flex justify-center p-8">
              <Button type="button" onClick={isRecording ? stopRecording : startRecording} disabled={isLoading} size="lg" className="h-20 w-20 rounded-full">
                {isLoading ? (
                  <Loader2 className="h-8 w-8 animate-spin" />
                ) : isRecording ? (
                  <Square className="h-8 w-8" />
                ) : (
                  <Mic className="h-8 w-8" />
                )}
              </Button>
            </div>
             <p className="text-center text-muted-foreground">
                {isLoading ? t.analyzing : isRecording ? t.recording : t.startRecording}
            </p>
          </CardContent>
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
                <div className="flex items-center justify-between">
                    <strong>{t.possibleCausesLabel}:</strong>
                    <Button onClick={() => handleTextToSpeech(`Possible Causes: ${result.possibleCauses}`, 'causes')} disabled={isSynthesizing} size="sm" variant="ghost">
                        {isSynthesizing && isPlaying !== 'causes' ? <Loader2 className="h-4 w-4 animate-spin"/> : isPlaying === 'causes' ? <Pause className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                </div>
                <p>{result.possibleCauses}</p>
                <div className="flex items-center justify-between mt-2">
                    <strong>{t.suggestedNextStepsLabel}:</strong>
                     <Button onClick={() => handleTextToSpeech(`Suggested Next Steps: ${result.suggestedNextSteps}`, 'steps')} disabled={isSynthesizing} size="sm" variant="ghost">
                        {isSynthesizing && isPlaying !== 'steps' ? <Loader2 className="h-4 w-4 animate-spin"/> : isPlaying === 'steps' ? <Pause className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                </div>
                <p>{result.suggestedNextSteps}</p>
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
