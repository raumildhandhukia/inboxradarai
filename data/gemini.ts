"use server";

import { AnalysisType, EmailAnalysis, Label } from "@/types";

import { JSONModel, TextModel } from "@/lib/gemini";

type APIResponse = {
  summary: string;
  isImportant: boolean;
  actions: string[];
  labels: string[] | null;
};

export const analyze = async (
  emailId: string,
  from: string,
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
        `label:${label.label} , description:${label.description}`
    )
    .join(", ");
  const prompt = `
  Use this JSON schema for response:
  {
    "summary": string,
    "isImportant": boolean,
    "actions": string[],
    "labels": string[] | null
  }
  Instructions:
  1) Summarize the email content in a maximum of 3 small lines.
  2) Return if email is important or not. Emails which require immediate action, are urgent in nature should be marked as important.
  3) List any actions that need to be taken (maximum of 3 actions). Leave empty if no actions are needed.
  4) Assign labels(upto 3 labels) to the email from the following list based on the label description. 
     If no suitable label is found or if the label list is empty, set the value for 'labels' to null.
     Follow instructions provided in label description to assign accurate labels. 
  [${labelsList}]

  Be very specific in choosing the label based on the email content and label descriptions provided.
  Email From: ${from}
  Email Body: ${body}
  `;
  try {
    const result = await JSONModel.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const textToJson = JSON.parse(text) as APIResponse;
    const analysis = {
      emailId: "",
      summary: textToJson.summary,
      isImportant: textToJson.isImportant,
      actions: textToJson.actions,
      tags: labels.filter((label) => textToJson.labels?.includes(label.label)),
    } as EmailAnalysis;
    return {
      success: true,
      analysis: analysis,
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
