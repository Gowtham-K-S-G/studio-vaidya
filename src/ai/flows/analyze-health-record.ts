
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
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

const AnalyzeHealthRecordInputSchema = z.object({
  fileDataUri: z
    .string()
    .describe(
      "A health record file (image or PDF) as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  language: z.string().describe('The language for the analysis output.'),
});
export type AnalyzeHealthRecordInput = z.infer<typeof AnalyzeHealthRecordInputSchema>;


const SuggestedDoctorSchema = z.object({
  name: z.string().describe("The doctor's full name."),
  specialty: z.string().describe("The doctor's medical specialty."),
  hospital: z.string().describe("The hospital where the doctor practices."),
});

const AnalyzeHealthRecordOutputSchema = z.object({
  summary: z.string().describe("A brief summary of the health record's content."),
  keyFindings: z.array(z.string()).describe('A list of the most important findings or data points from the record.'),
  preliminaryDiagnosis: z.string().describe('A preliminary diagnosis based on the record.'),
  suggestedMedication: z
    .string()
    .describe(
      'Suggested medication or changes to existing medication based on the analysis.'
    ),
    suggestedSpecialist: z.string().describe("The type of medical specialist to consult for the identified issues (e.g., Cardiologist, Dermatologist)."),
    suggestedDoctors: z.array(SuggestedDoctorSchema).optional().describe("A list of specific doctors recommended for consultation, if any are found."),
});
export type AnalyzeHealthRecordOutput = z.infer<typeof AnalyzeHealthRecordOutputSchema>;

const findDoctorsBySpecialty = ai.defineTool(
  {
    name: 'findDoctorsBySpecialty',
    description: 'Finds doctors with a specific specialty in the Karnataka, India region.',
    inputSchema: z.object({
      specialty: z.string().describe('The medical specialty to search for (e.g., Cardiologist, Dermatologist).'),
    }),
    outputSchema: z.array(z.object({
      name: z.string(),
      specialty: z.string(),
      hospital: z.string(),
    })),
  },
  async (input) => {
    console.log(`Tool searching for doctors with specialty: ${input.specialty}`);
    // This tool can only be used on the server, so we can initialize firebase-admin
    const { firestore } = initializeFirebase();
    if (!firestore) {
      console.error('Firestore not initialized');
      return [];
    }
    
    const doctorsRef = collection(firestore, 'doctors');
    const q = query(doctorsRef, where("specialty", "==", input.specialty));
    
    try {
      const querySnapshot = await getDocs(q);
      const doctors = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          name: data.name,
          specialty: data.specialty,
          hospital: data.hospital,
        };
      });
      console.log(`Found ${doctors.length} doctors for specialty ${input.specialty}`);
      return doctors;
    } catch (e) {
      console.error("Error querying doctors:", e);
      return [];
    }
  }
);


export async function analyzeHealthRecord(
  input: AnalyzeHealthRecordInput
): Promise<AnalyzeHealthRecordOutput> {
  return analyzeHealthRecordFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeHealthRecordPrompt',
  input: {schema: AnalyzeHealthRecordInputSchema},
  output: {schema: AnalyzeHealthRecordOutputSchema},
  tools: [findDoctorsBySpecialty],
  prompt: `You are a medical AI assistant. Analyze the provided health record (image or PDF).

  Based on the contents of the record, provide a detailed analysis. Your primary goal is to identify a specialist. After identifying the specialist (e.g., "Cardiologist"), you MUST use the findDoctorsBySpecialty tool to find relevant doctors in the Karnataka, India region. Include the list of doctors you find in the 'suggestedDoctors' field of your response.

  You MUST provide the entire response in the following language: {{{language}}}.

  Health Record File: {{media url=fileDataUri}}
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
