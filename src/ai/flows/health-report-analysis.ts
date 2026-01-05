
'use server';

/**
 * @fileOverview Analyzes a health report (image or PDF) and provides a summary and medication suggestions.
 *
 * - analyzeHealthReport - A function that handles the health report analysis process.
 * - AnalyzeHealthReportInput - The input type for the analyzeHealthReport function.
 * - AnalyzeHealthReportOutput - The return type for the analyzeHealthReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeHealthReportInputSchema = z.object({
  reportDataUri: z
    .string()
    .describe(
      "A health report file (image or PDF), as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  language: z.string().describe('The language for the analysis output.'),
});
export type AnalyzeHealthReportInput = z.infer<typeof AnalyzeHealthReportInputSchema>;

const MedicationSuggestionSchema = z.object({
    name: z.string().describe('The name of the suggested medication.'),
    dosage: z.string().describe('The suggested dosage (e.g., "500mg", "1 tablet").'),
    frequency: z.string().describe('How often to take the medication (e.g., "Once a day", "Twice daily").'),
    reason: z.string().describe('The reason for suggesting this medication based on the report.'),
});

const AnalyzeHealthReportOutputSchema = z.object({
  analysis: z.string().describe('A detailed summary and analysis of the key findings in the health report.'),
  suggestedMedication: z.array(MedicationSuggestionSchema).describe('A list of suggested medications based on the analysis.'),
});
export type AnalyzeHealthReportOutput = z.infer<typeof AnalyzeHealthReportOutputSchema>;

export async function analyzeHealthReport(
  input: AnalyzeHealthReportInput
): Promise<AnalyzeHealthReportOutput> {
  return analyzeHealthReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeHealthReportPrompt',
  input: {schema: AnalyzeHealthReportInputSchema},
  output: {schema: AnalyzeHealthReportOutputSchema},
  prompt: `You are a medical AI assistant. Analyze the provided health report.

  The report is provided as a file (image or PDF). Extract key information, summarize the findings, and suggest potential medications based on the results.

  You MUST provide the entire response in the following language: {{{language}}}.

  Report File: {{media url=reportDataUri}}

  Respond with a JSON object with the following keys:
  - analysis: A detailed summary and analysis of the key findings in the health report.
  - suggestedMedication: A list of suggested medications. Each item should have a 'name', 'dosage', 'frequency', and 'reason'.
`,
});

const analyzeHealthReportFlow = ai.defineFlow(
  {
    name: 'analyzeHealthReportFlow',
    inputSchema: AnalyzeHealthReportInputSchema,
    outputSchema: AnalyzeHealthReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
