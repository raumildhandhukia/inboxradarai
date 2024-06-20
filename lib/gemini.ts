import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = process.env.GENAI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);
export const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
