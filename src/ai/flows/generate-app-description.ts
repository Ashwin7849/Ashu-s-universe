'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating SEO-friendly app descriptions.
 *
 * The flow uses a large language model to create compelling short descriptions for app listings, which
 * can be used by admins to quickly populate content and attract users.
 *
 * @Exported Members:
 *   - `generateAppDescription`: An async function to generate app descriptions.
 *   - `GenerateAppDescriptionInput`: The input type for the `generateAppDescription` function.
 *   - `GenerateAppDescriptionOutput`: The output type for the `generateAppDescription` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAppDescriptionInputSchema = z.object({
  appName: z.string().describe('The name of the app.'),
  appCategory: z.string().describe('The category of the app (e.g., "Games", "Productivity", "Education").'),
  targetAudience: z.string().describe('The target audience for the app (e.g., "Children", "Professionals", "Students").'),
  keyFeatures: z.string().describe('A comma-separated list of the app\u2019s key features.'),
});
export type GenerateAppDescriptionInput = z.infer<typeof GenerateAppDescriptionInputSchema>;

const GenerateAppDescriptionOutputSchema = z.object({
  description: z.string().describe('A short, SEO-friendly description of the app.'),
});
export type GenerateAppDescriptionOutput = z.infer<typeof GenerateAppDescriptionOutputSchema>;

export async function generateAppDescription(input: GenerateAppDescriptionInput): Promise<GenerateAppDescriptionOutput> {
  return generateAppDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAppDescriptionPrompt',
  input: {schema: GenerateAppDescriptionInputSchema},
  output: {schema: GenerateAppDescriptionOutputSchema},
  prompt: `You are an expert in writing short, SEO-friendly app descriptions.

  Based on the following information, generate a concise and engaging description for the app.

  App Name: {{{appName}}}
  App Category: {{{appCategory}}}
  Target Audience: {{{targetAudience}}}
  Key Features: {{{keyFeatures}}}

  Description:
  `,
});

const generateAppDescriptionFlow = ai.defineFlow(
  {
    name: 'generateAppDescriptionFlow',
    inputSchema: GenerateAppDescriptionInputSchema,
    outputSchema: GenerateAppDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
