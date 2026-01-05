
'use server';

/**
 * @fileOverview Provides preliminary diagnosis based on uploaded images of skin rashes or wounds.
 *
 * - imageBasedDiagnosis - A function that handles the image-based diagnosis process.
 * - ImageBasedDiagnosisInput - The input type for the imageBasedDiagnosis function.
 * - ImageBasedDiagnosisOutput - The return type for the imageBasedDiagnosis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImageBasedDiagnosisInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a skin rash or wound, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z.string().optional().describe('Additional description of the condition.'),
  language: z.string().describe('The language for the diagnosis output.'),
});
export type ImageBasedDiagnosisInput = z.infer<typeof ImageBasedDiagnosisInputSchema>;

const ImageBasedDiagnosisOutputSchema = z.object({
  diagnosis: z.string().describe('The preliminary diagnosis of the condition.'),
  confidenceScore: z.number().describe('A confidence score (0-1) for the diagnosis.'),
  detailedDescription: z.string().describe('A more detailed description of the diagnosis and what the image shows.'),
  severity: z.string().describe('The severity of the condition (e.g., mild, moderate, severe).'),
  commonSymptoms: z.array(z.string()).describe('A list of common symptoms associated with the diagnosed condition.'),
  recommendation: z
    .string()
    .describe(
      'Recommendation on whether to seek professional medical help and potential next steps.'
    ),
});
export type ImageBasedDiagnosisOutput = z.infer<typeof ImageBasedDiagnosisOutputSchema>;

export async function imageBasedDiagnosis(
  input: ImageBasedDiagnosisInput
): Promise<ImageBasedDiagnosisOutput> {
  return imageBasedDiagnosisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'imageBasedDiagnosisPrompt',
  input: {schema: ImageBasedDiagnosisInputSchema},
  output: {schema: ImageBasedDiagnosisOutputSchema},
  prompt: `You are a medical AI assistant specializing in preliminary diagnosis based on images.

  Analyze the provided image of a skin condition or wound and any additional description.

  You MUST provide the entire response in the following language: {{{language}}}.

  Image: {{media url=photoDataUri}}
  Description: {{{description}}}

  Respond with a JSON object with the following keys, ensuring all string values are in the requested language:
  - diagnosis: A preliminary diagnosis of the condition.
  - confidenceScore: A confidence score (from 0 to 1, e.g., 0.85) for the diagnosis.
  - detailedDescription: A more detailed description of the diagnosis and what the image shows.
  - severity: The severity of the condition (e.g., mild, moderate, severe).
  - commonSymptoms: A list of common symptoms associated with the diagnosed condition.
  - recommendation: Recommendation on whether to seek professional medical help and potential next steps.
`,
});

const imageBasedDiagnosisFlow = ai.defineFlow(
  {
    name: 'imageBasedDiagnosisFlow',
    inputSchema: ImageBasedDiagnosisInputSchema,
    outputSchema: ImageBasedDiagnosisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
