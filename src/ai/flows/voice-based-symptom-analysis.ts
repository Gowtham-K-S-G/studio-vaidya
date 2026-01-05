
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

const PossibleCauseSchema = z.object({
    name: z.string().describe('The name of the possible condition.'),
    description: z.string().describe('A brief description of the condition and why it might be relevant.'),
});

const VoiceSymptomsOutputSchema = z.object({
  transcribedSymptoms: z.string().describe('The transcribed text from the user\'s voice input.'),
  possibleCauses: z.array(PossibleCauseSchema).describe('A structured list of possible causes for the described symptoms.'),
  suggestedNextSteps: z.array(z.string()).describe('A list of suggested next steps for the patient.'),
  urgency: z.string().describe('An assessment of urgency (e.g., "Low - Monitor symptoms", "Medium - See a doctor within 24 hours", "High - Seek immediate medical attention").'),
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

First, transcribe the user's symptoms from the audio. Then, analyze the transcribed symptoms and provide a detailed response.

You MUST provide the entire response in the following language: {{{language}}}.

Voice data: {{media url=voiceDataUri}}

Respond with a JSON object with the following keys, ensuring all string values are in the requested language:
- transcribedSymptoms: The transcribed text from the user's voice input.
- possibleCauses: A structured list of possible causes. Each item should have a 'name' and a 'description'.
- suggestedNextSteps: A list of suggested next steps for the patient.
- urgency: An assessment of urgency (e.g., "Low - Monitor symptoms", "Medium - See a doctor within 24 hours", "High - Seek immediate medical attention").`,
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
