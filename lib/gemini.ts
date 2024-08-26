import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = process.env.GENAI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);
export const JSONModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: { responseMimeType: "application/json" },
});
export const TextModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});
