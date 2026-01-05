
'use server';

import { getHealthAdvice, type GetHealthAdviceOutput, GetHealthAdviceInput } from '@/ai/flows/multilingual-health-advice';
import { imageBasedDiagnosis, type ImageBasedDiagnosisOutput, type ImageBasedDiagnosisInput } from '@/ai/flows/image-based-diagnosis';
import { analyzeVoiceSymptoms as analyzeVoiceSymptomsFlow, type VoiceSymptomsOutput, type VoiceSymptomsInput } from '@/ai/flows/voice-based-symptom-analysis';
import { textToSpeech as textToSpeechFlow } from '@/ai/flows/text-to-speech';
import { z } from 'zod';
import { ZodError } from 'zod';

const GetHealthAdviceInputSchema = z.object({
  symptoms: z.string().min(10, "Please describe your symptoms in more detail."),
  language: z.string(),
});

const ImageBasedDiagnosisInputSchema = z.object({
    photoDataUri: z.string().min(1, "Please upload an image."),
    description: z.string().optional(),
    language: z.string(),
});

const VoiceSymptomInputSchema = z.object({
    voiceDataUri: z.string().min(1, "Please record your audio."),
    language: z.string(),
});

const TextToSpeechInputSchema = z.string().min(1, "No text provided for speech synthesis.");


export async function getSymptomAdvice(input: GetHealthAdviceInput): Promise<{ success: true; data: GetHealthAdviceOutput } | { success: false; error: string }> {
  try {
    GetHealthAdviceInputSchema.parse(input);
    const result = await getHealthAdvice(input);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof ZodError) {
      return { success: false, error: error.errors.map(e => e.message).join(', ') };
    }
    console.error(error);
    return { success: false, error: 'An unexpected error occurred. Please try again.' };
  }
}

export async function getImageDiagnosis(input: ImageBasedDiagnosisInput): Promise<{ success: true; data: ImageBasedDiagnosisOutput } | { success: false; error: string }> {
  try {
    ImageBasedDiagnosisInputSchema.parse(input);
    const result = await imageBasedDiagnosis(input);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof ZodError) {
        return { success: false, error: error.errors.map(e => e.message).join(', ') };
    }
    console.error(error);
    return { success: false, error: 'An unexpected error occurred while analyzing the image.' };
  }
}

export async function analyzeVoiceSymptoms(input: VoiceSymptomsInput): Promise<{ success: true; data: VoiceSymptomsOutput } | { success: false; error: string }> {
    try {
      VoiceSymptomInputSchema.parse(input);
      const result = await analyzeVoiceSymptomsFlow(input);
      return { success: true, data: result };
    } catch (error) {
      if (error instanceof ZodError) {
          return { success: false, error: error.errors.map(e => e.message).join(', ') };
      }
      console.error(error);
      return { success: false, error: 'An unexpected error occurred while analyzing the voice input.' };
    }
}

export async function textToSpeech(text: string) {
    try {
        TextToSpeechInputSchema.parse(text);
        const result = await textToSpeechFlow(text);
        return { success: true, data: result.media };
    } catch (error) {
        if (error instanceof ZodError) {
            return { success: false, error: error.errors.map(e => e.message).join(', ') };
        }
        console.error(error);
        return { success: false, error: 'An unexpected error occurred during text-to-speech conversion.' };
    }
}
