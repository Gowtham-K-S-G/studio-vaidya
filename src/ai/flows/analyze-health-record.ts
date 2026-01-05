
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
  summary: z.string().describe("A brief summary of the health record's content."),
  keyFindings: z.array(z.string()).describe('A list of the most important findings or data points from the record.'),
  preliminaryDiagnosis: z.string().describe('A preliminary diagnosis based on the record.'),
  suggestedMedication: z
    .string()
    .describe(
      'Suggested medication or changes to existing medication based on the analysis.'
    ),
    suggestedSpecialist: z.string().describe("The type of medical specialist to consult for the identified issues (e.g., Cardiologist, Dermatologist).")
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

  Based on the contents of the record, provide a detailed analysis.

  You MUST provide the entire response in the following language: {{{language}}}.

  Health Record File: {{media url=fileDataUri}}

  Respond with a JSON object with the following keys, ensuring all string values are in the requested language:
  - summary: A brief summary of the health record's content.
  - keyFindings: A list of the most important findings or data points from the record.
  - preliminaryDiagnosis: Your preliminary diagnosis based on the record.
  - suggestedMedication: Your suggested medications.
  - suggestedSpecialist: The type of medical specialist to consult for the identified issues (e.g., Cardiologist, Dermatologist).
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
