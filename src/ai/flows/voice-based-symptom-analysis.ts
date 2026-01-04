'use server';
/**
 * @fileOverview This file defines a Genkit flow for analyzing patient symptoms described via voice input.
 *
 * - analyzeVoiceSymptoms - A function that takes voice input and returns possible causes and next steps.
 * - VoiceSymptomsInput - The input type for the analyzeVoiceSymptoms function.
 * - VoiceSymptomsOutput - The return type for the analyzeVoiceSymptoms function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VoiceSymptomsInputSchema = z.object({
  voiceDataUri: z
    .string()
    .describe(
      "Voice data of the patient describing their symptoms, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  language: z.string().describe('The language in which the symptoms are described.'),
});
export type VoiceSymptomsInput = z.infer<typeof VoiceSymptomsInputSchema>;

const VoiceSymptomsOutputSchema = z.object({
  possibleCauses: z.string().describe('Possible causes of the described symptoms.'),
  suggestedNextSteps: z.string().describe('Suggested next steps for the patient.'),
});
export type VoiceSymptomsOutput = z.infer<typeof VoiceSymptomsOutputSchema>;

export async function analyzeVoiceSymptoms(input: VoiceSymptomsInput): Promise<VoiceSymptomsOutput> {
  return analyzeVoiceSymptomsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'voiceSymptomsPrompt',
  input: {schema: VoiceSymptomsInputSchema},
  output: {schema: VoiceSymptomsOutputSchema},
  prompt: `You are a helpful AI assistant specialized in analyzing symptoms described by patients.

You will receive voice data containing the patient's description of their symptoms in {{{language}}}.
Analyze the symptoms and provide possible causes and suggested next steps.

Voice data: {{media url=voiceDataUri}}
Language: {{{language}}}

Possible Causes:
Suggested Next Steps: `,
});

const analyzeVoiceSymptomsFlow = ai.defineFlow(
  {
    name: 'analyzeVoiceSymptomsFlow',
    inputSchema: VoiceSymptomsInputSchema,
    outputSchema: VoiceSymptomsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
