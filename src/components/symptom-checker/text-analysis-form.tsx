
"use client";

import { useState } from 'react';
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
import { Bot, Loader2, Volume2, AlertTriangle } from 'lucide-react';

const formSchema = z.object({
  symptoms: z.string().min(10, 'Please describe your symptoms in more detail (at least 10 characters).'),
  language: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export function TextAnalysisForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: '',
      language: 'English',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setResult(null);
    const response = await getSymptomAdvice(values);
    setIsLoading(false);

    if (response.success && response.data) {
      setResult(response.data.advice);
    } else {
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: response.error || 'Could not get health advice. Please try again.',
      });
    }
  }

  async function handleTextToSpeech() {
    if (!result) return;
    setIsSynthesizing(true);
    const response = await textToSpeech(result);
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
            <CardTitle>Describe Your Symptoms</CardTitle>
            <CardDescription>
              Select your language and describe your symptoms. Our AI will provide preliminary advice.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
            <FormField
              control={form.control}
              name="symptoms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Symptoms</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., I have a headache and a slight fever..."
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
                  Analyzing...
                </>
              ) : (
                'Get AI Advice'
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
      {result && (
        <CardContent>
          <div className="mt-4 rounded-lg border bg-secondary/50 p-4 space-y-4">
            <div className="flex justify-between items-center mb-2">
                <h3 className="flex items-center gap-2 font-semibold">
                <Bot className="h-5 w-5 text-primary" />
                AI Health Assistant's Advice
                </h3>
                <Button onClick={handleTextToSpeech} disabled={isSynthesizing} size="sm" variant="outline">
                    {isSynthesizing ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Volume2 className="mr-2 h-4 w-4" />
                    )}
                    Read Aloud
                </Button>
            </div>
            <p className="text-sm text-foreground">{result}</p>
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
