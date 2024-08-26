import { AnalysisType, EmailAnalysis, Label } from "@/types";
import Replicate from "replicate";
const replicate = new Replicate();

const input = {
  prompt:
    "Johnny has 8 billion parameters. His friend Tommy has 70 billion parameters. What does this mean when it comes to speed?",
  max_new_tokens: 512,
  prompt_template:
    "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n{system_prompt}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
};

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
  Output: STRICTLY JSON OBJECT, NO EXTRA DATA
  Response Return Type: JSON OBJECT
  Response Example (MUST INCLUDE ALL KEYS): {
      "summary": "The email is about .....",
      "isImportant": false/true,
      "actions": ["Action 1", "Action 2", "Action 3"],
      "tag": "{
          "id": "for ex. cxcnjandszkfjasdadsasd (label.id)",
          "label": "Label (for ex. Cash Transaction) (label.label)",
          "description": "for ex. Transactions related to cash (label.description)",
          "color": "for ex. rgba(0,0,0,0.1) (label.color)"
      }"
  }

  Email Data: ${body}
  Instructions:
  1) Summarize the email content in a maximum of 3 small lines.
  2) Identify if the email is important or not (true/false).
  3) List any actions that need to be taken (maximum of 3 actions). Actions should be strings and should be suitable for the nature of the email. Leave empty if no actions are needed.
  4) Assign a tag to the email from the following list based on the description (id, label, description, color). If no suitable label is found or if the label list is empty, set the value for key 'tag' to null (no need to create empty object with null values):
  [${labelsList}]
  
  Be very specific in choosing the tag based on the email content and label descriptions provided.
  `;
  try {
    const res: any = await replicate.run("meta/meta-llama-3-8b-instruct", {
      input: {
        system_prompt:
          "Output Strictly In JSON Format nothing else JSON object. STRICTLY JSON OBJECT, NO EXTRA DATA",
        prompt: prompt,
        max_new_tokens: 200,
        prompt_template:
          "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n{system_prompt}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
      },
    });
    const text = res.join("");
    const textToJson: EmailAnalysis = JSON.parse(text);

    return {
      success: true,
      analysis: {
        ...textToJson,
        tag: textToJson.tag?.id ? textToJson.tag : null,
      },
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
    const res: any = await replicate.run("meta/meta-llama-3-8b-instruct", {
      input: {
        system_prompt:
          "Output should be only words completing the sentence or new sentence coming after the context provided. This is not chat bot. Responses must be completing the sentence or producing new sentence.",
        prompt: context,
        max_new_tokens: 100,
        prompt_template:
          "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n{system_prompt}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
      },
    });
    const text = res.join("");
    return text;
  } catch (e) {
    return "";
  }
}
