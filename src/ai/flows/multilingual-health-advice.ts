
'use server';

/**
 * @fileOverview A multilingual health advice AI agent.
 *
 * - getHealthAdvice - A function that provides health advice in a specified language.
 * - GetHealthAdviceInput - The input type for the getHealthAdvice function.
 * - GetHealthAdviceOutput - The return type for the getHealthAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetHealthAdviceInputSchema = z.object({
  symptoms: z.string().describe('The symptoms the patient is experiencing.'),
  language: z.string().describe('The language in which the health advice should be provided.'),
});
export type GetHealthAdviceInput = z.infer<typeof GetHealthAdviceInputSchema>;

const GetHealthAdviceOutputSchema = z.object({
  preliminaryAdvice: z.string().describe('General health advice based on the symptoms.'),
  possibleConditions: z.array(z.string()).describe('A list of possible conditions that could cause the symptoms.'),
  suggestedActions: z.array(z.string()).describe('A list of suggested actions for the user to take (e.g., "Rest", "Drink fluids").'),
  urgency: z.string().describe('An assessment of urgency (e.g., "Low - Monitor symptoms", "Medium - See a doctor within 24 hours", "High - Seek immediate medical attention").'),
});
export type GetHealthAdviceOutput = z.infer<typeof GetHealthAdviceOutputSchema>;

export async function getHealthAdvice(input: GetHealthAdviceInput): Promise<GetHealthAdviceOutput> {
  return getHealthAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getHealthAdvicePrompt',
  input: {schema: GetHealthAdviceInputSchema},
  output: {schema: GetHealthAdviceOutputSchema},
  prompt: `You are a multilingual health assistant. A patient has the following symptoms: {{{symptoms}}}.

Please provide detailed health advice in the following language: {{{language}}}.

Respond with a JSON object with the following keys, ensuring all string values are in the requested language:
- preliminaryAdvice: General health advice based on the symptoms.
- possibleConditions: A list of possible conditions that could cause the symptoms.
- suggestedActions: A list of suggested actions for the user to take (e.g., "Rest", "Drink fluids").
- urgency: An assessment of urgency (e.g., "Low - Monitor symptoms", "Medium - See a doctor within 24 hours", "High - Seek immediate medical attention").
`,
});

const getHealthAdviceFlow = ai.defineFlow(
  {
    name: 'getHealthAdviceFlow',
    inputSchema: GetHealthAdviceInputSchema,
    outputSchema: GetHealthAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
