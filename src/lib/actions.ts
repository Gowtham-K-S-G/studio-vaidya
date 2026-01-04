
'use server';

import { getHealthAdvice, type GetHealthAdviceInput } from '@/ai/flows/multilingual-health-advice';
import { imageBasedDiagnosis, type ImageBasedDiagnosisInput } from '@/ai/flows/image-based-diagnosis';
import { z } from 'zod';
import { ZodError } from 'zod';

const GetHealthAdviceInputSchema = z.object({
  symptoms: z.string().min(10, "Please describe your symptoms in more detail."),
  language: z.string(),
});

const ImageBasedDiagnosisInputSchema = z.object({
    photoDataUri: z.string().min(1, "Please upload an image."),
    description: z.string().optional(),
});


export async function getSymptomAdvice(input: GetHealthAdviceInput) {
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

export async function getImageDiagnosis(input: ImageBasedDiagnosisInput) {
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
