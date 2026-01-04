
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
  language: z.string().describe('The language in which the symptoms are described and in which the response should be provided.'),
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

You will receive voice data containing the patient's description of their symptoms. The user has requested that the response be in the following language: {{{language}}}.

Analyze the symptoms from the audio and provide a response.

You MUST provide the entire response (possibleCauses and suggestedNextSteps) in the following language: {{{language}}}.

Voice data: {{media url=voiceDataUri}}

Respond with a JSON object with the following keys, ensuring all string values are in the requested language:
- possibleCauses: Possible causes of the described symptoms.
- suggestedNextSteps: Suggested next steps for the patient.`,
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
