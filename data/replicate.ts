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
