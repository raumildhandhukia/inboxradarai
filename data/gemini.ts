"use server";

import { AnalysisType, EmailAnalysis, Label } from "@/types";

import { JSONModel, TextModel } from "@/lib/gemini";

export const analyze = async (
  body: string,
  labels: Label[]
): Promise<AnalysisType> => {
  if (body.length === 0) {
    return {
      success: false,
    } as AnalysisType;
  }
  const labelsList: string = labels
    .map(
      (label, index) =>
        `Label ${index + 1}) 
          id:${label.id} 
          label:${label.label} 
          description:${label.description}`
    )
    .join(", ");
  const prompt = `
  Use this JSON schema for response:
  {
    "summary": string,
    "isImportant": boolean,
    "actions": string[],
    "tag": {
      "id": string,
      "label": string,
      "description": string,
      "color": string
    } | null
  }

  Email Body: ${body}
  
  Instructions:
  1) Summarize the email content in a maximum of 3 small lines.
  2) Identify if the email is important or not (true/false).
  3) List any actions that need to be taken (maximum of 3 actions). Actions should be strings and should be suitable for the nature of the email. Leave empty if no actions are needed.
  4) Assign a tag to the email from the following list based on the description (id, label, description, color). If no suitable label is found or if the label list is empty, set the value for 'tag' to null:
  [${labelsList}]
  
  Be very specific in choosing the tag based on the email content and label descriptions provided.
  `;
  try {
    const result = await JSONModel.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const textToJson: EmailAnalysis = JSON.parse(text);
    return {
      success: true,
      analysis: textToJson,
    } as AnalysisType;
  } catch (e) {
    return {
      success: false,
    } as AnalysisType;
  }
};

export async function generateAutocompleteSuggestions(context: string) {
  try {
    if (!context) {
      context = "This is about writing email. ";
    }
    const prompt = `
      Response should be completion of sentence or a new sentence. If there is incomplete sentence provided, response should be completing that sentence. If there is complete sentence at end of the email draft content, give a sentence suggestion which is relavent to email context and is following the context of the email content. 

      This is email content: ${context}

    `;
    const result = await TextModel.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return text;
  } catch (e) {
    return "";
  }
}
