import { model } from "@/lib/gemini";
import { Label } from "@/types";

export const analyze = async (body: string, labels: Label[]) => {
  if (body.length === 0) {
    return {
      success: false,
      data: {},
    };
  }
  const labelsList: string = labels
    .map(
      (label, index) =>
        `Label ${index + 1}) 
          id:${label.id} 
          label:${label.label} 
          description:${label.description} 
          color:${label.color}`
    )
    .join(", ");
  const prompt = `
  Response Return Type: JSON OBJECT
  Response Example (MUST INCLUDE ALL KEYS): {
      "summary": "The email is about .....",
      "isImportant": false/true (replace with actual value) (true if it is really important, newsletter are not important. promotional emails are not important, social media notification emails are not important.), 
      personolized email are important, emails which requires next steps, or it is a decision, or it is financial email, or it is tracking, or it is message from someone, or it is reciept, or it is security,
      or it is security code, or it is alert, or it is confirmation or it is invitation
      "actions": ["Action 1", "Action 2", "Action 3"] (replace with actual actions, keep empty if no actions needed. ),
      "tag":"Label id from the list of labels provided"}

  Email Data ${body}
  Instructions:
  1) Summerize the email content. max 3 small lines.
  2) Identify if the email is important or not. (true/false) 
  3) List any actions that need to be taken. Max 3 actions. Actions should be in the form of a string. You should decide what actions are suitable for the email.
     Actions can be empty too if no actions needed. Dependent upon nature of email decide if actions are needed or not.
  4) Assign a tag (Fields returned (id, label, description, color)) to the email from the following list: [${labelsList}]
     if list does not contain any labels which are suitable for the email or label list is empty, value for AILabel should be null.
  `;
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const textToJson = JSON.parse(text);
    return {
      success: true,
      data: textToJson,
    };
  } catch (e) {
    return {
      success: false,
      data: {},
    };
  }
};
