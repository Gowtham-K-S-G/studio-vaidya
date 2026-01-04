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
  advice: z.string().describe('The health advice in the specified language.'),
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

Please provide health advice in the following language: {{{language}}}.`,
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
