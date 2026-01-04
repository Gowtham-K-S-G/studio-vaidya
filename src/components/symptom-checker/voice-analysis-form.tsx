
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
import { Bot, Loader2, Mic, Square, Volume2, AlertTriangle } from 'lucide-react';
import type { VoiceSymptomsOutput } from '@/ai/flows/voice-based-symptom-analysis';

const formSchema = z.object({
  language: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export function VoiceAnalysisForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [result, setResult] = useState<VoiceSymptomsOutput | null>(null);
  const [audioDataUri, setAudioDataUri] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

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

  async function handleTextToSpeech(text: string) {
    if (!text) return;
    setIsSynthesizing(true);
    const response = await textToSpeech(text);
    setIsSynthesizing(false);

    if (response.success && response.data) {
      const audio = new Audio(response.data);
      audio.play();
    } else {
        toast({
            variant: "destructive",
            title: "Audio Failed",
            description: response.error || "Could not play audio. Please try again.",
        });
    }
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Analyze Symptoms via Voice</CardTitle>
            <CardDescription>
              Record yourself describing your symptoms. Our AI will analyze the audio.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isRecording || isLoading}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a language" />
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
                {isLoading ? 'Analyzing...' : isRecording ? 'Recording... Click to stop.' : 'Click to start recording.'}
            </p>
          </CardContent>
        </form>
      </Form>
      {result && (
        <CardContent>
          <div className="mt-4 rounded-lg border bg-secondary/50 p-4 space-y-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <Bot className="h-5 w-5 text-primary" />
              AI Analysis Result
            </h3>
            <div className="grid gap-2 text-sm">
                <div className="flex items-center justify-between">
                    <strong>Possible Causes:</strong>
                    <Button onClick={() => handleTextToSpeech(`Possible Causes: ${result.possibleCauses}`)} disabled={isSynthesizing} size="sm" variant="ghost">
                        <Volume2 className="h-4 w-4" />
                    </Button>
                </div>
                <p>{result.possibleCauses}</p>
                <div className="flex items-center justify-between mt-2">
                    <strong>Suggested Next Steps:</strong>
                     <Button onClick={() => handleTextToSpeech(`Suggested Next Steps: ${result.suggestedNextSteps}`)} disabled={isSynthesizing} size="sm" variant="ghost">
                        <Volume2 className="h-4 w-4" />
                    </Button>
                </div>
                <p>{result.suggestedNextSteps}</p>
            </div>
            <div className="flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-amber-800 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200">
                <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <p className="text-xs">
                    <strong>Disclaimer:</strong> This is a preliminary analysis by an AI and is not a substitute for professional medical advice. Please consult a qualified healthcare provider for an accurate diagnosis and treatment.
                </p>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
