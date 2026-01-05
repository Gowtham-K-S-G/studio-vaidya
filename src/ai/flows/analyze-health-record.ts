
'use server';

/**
 * @fileOverview Provides preliminary diagnosis and medication suggestions based on uploaded health records (image or PDF).
 *
 * - analyzeHealthRecord - A function that handles the health record analysis process.
 * - AnalyzeHealthRecordInput - The input type for the analyzeHealthRecord function.
 * - AnalyzeHealthRecordOutput - The return type for the analyzeHealthRecord function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeHealthRecordInputSchema = z.object({
  fileDataUri: z
    .string()
    .describe(
      "A health record file (image or PDF) as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  language: z.string().describe('The language for the analysis output.'),
});
export type AnalyzeHealthRecordInput = z.infer<typeof AnalyzeHealthRecordInputSchema>;

const AnalyzeHealthRecordOutputSchema = z.object({
  diagnosis: z.string().describe('The preliminary diagnosis based on the health record.'),
  medication: z
    .string()
    .describe(
      'Suggested medication based on the analysis of the health record.'
    ),
});
export type AnalyzeHealthRecordOutput = z.infer<typeof AnalyzeHealthRecordOutputSchema>;

export async function analyzeHealthRecord(
  input: AnalyzeHealthRecordInput
): Promise<AnalyzeHealthRecordOutput> {
  return analyzeHealthRecordFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeHealthRecordPrompt',
  input: {schema: AnalyzeHealthRecordInputSchema},
  output: {schema: AnalyzeHealthRecordOutputSchema},
  prompt: `You are a medical AI assistant. Analyze the provided health record (image or PDF).

  Based on the contents of the record, provide a preliminary diagnosis and suggest potential medications.

  You MUST provide the entire response (diagnosis and medication) in the following language: {{{language}}}.

  Health Record File: {{media url=fileDataUri}}

  Respond with a JSON object with the following keys, ensuring all string values are in the requested language:
  - diagnosis: Your preliminary diagnosis.
  - medication: Your suggested medications.
`,
});

const analyzeHealthRecordFlow = ai.defineFlow(
  {
    name: 'analyzeHealthRecordFlow',
    inputSchema: AnalyzeHealthRecordInputSchema,
    outputSchema: AnalyzeHealthRecordOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
