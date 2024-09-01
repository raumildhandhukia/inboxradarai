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
  1) Set labels = null if no label is applicable and email description is not matching the label description. 
     Assign the accurate label to the email from the following list based on the label description if applicable. 
     IT IS VERY IMPORTANT TO FOLLOW INSTRUCTIONS PROVIDED IN LABEL DESCRIPTION.
     IT IS VERY IMPORTANT THAT SEMANTIC MEANING OF LABEL DESCRIPTION IS MATCHING SEMANTIC MEANING OF EMAIL CONTENT. IF IT IS NOT MATCHING THEN DO NOT ASSIGN THAT LABEL.
     IT IS TOTALLY ACCEPTABLE IF YOU CAN'T ATTACH ANY LABEL FOR THE EMAIL. DO NOT ATTACH WRONG LABELS.
  [${labelsList}]

  
  2) Summarize the email content in a maximum of 3 small lines.
  3) Return if email is important or not. Emails which require immediate action, are urgent in nature should be marked as important.
  4) List any actions that need to be taken (maximum of 3 actions). Leave empty if no actions are needed.
  
  Email From: ${from}
  Email Body: ${body}
  `;
  try {
    const result = await JSONModel.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    // console.log("response", text);
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
  } catch (e: any) {
    if (e && e.status && e.status === 429) {
      return {
        success: false,
        errorCode: 429,
      } as AnalysisType;
    }
    return {
      success: false,
    } as AnalysisType;
  }
};

export async function generateAutocompleteSuggestions(
  context: string,
  userInfo: string,
  emailBody: string
) {
  try {
    if (!context) {
      context = "";
    }
    let prompt = `
      
      Instructions:
      1) You are an AI assistant which is used to generate autocomplete suggestions for email composition.
      2) DO NOT GIVE RESPONSES AS YOU ARE CHATTING WITH USER SUCH AS "Provide me more context" or "I am not sure about that".
         THIS IS NOT CHAT APPLICATION. USER IS NOT EXPECTING CHAT RESPONSE.
      3) Response should be completion of sentence or a new sentence. 
      4) If there is incomplete sentence provided, response should be completing that sentence. 
      5) If there is complete sentence at end of the email draft content, give a sentence suggestion 
      which is relavent to email context and is following the context of the email content. 

      This is what user has wrote in editor: ${context}
      Email Sender Info: ${userInfo}
    `;
    if (emailBody.length > 0) {
      prompt += `\n This is the email body to which user is replying: ${emailBody}`;
    }
    const result = await TextModel.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return text;
  } catch (e) {
    return "";
  }
}
