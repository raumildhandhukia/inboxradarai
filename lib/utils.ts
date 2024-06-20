import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import DOMPurify from "dompurify";
import { convert } from "html-to-text";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filterSensitiveData(body: string) {
  const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*/g;
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/g;
  const phoneRegex = /(\+?\d{1,2}\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}/g;
  const whitespaceRegex = /[\n\t\r]/g;
  return body
    .replace(urlRegex, "")
    .replace(emailRegex, "SOMEEMAIL@DOMAIN.EXT")
    .replace(phoneRegex, "(XXX)-XXX-XXXX")
    .replace(whitespaceRegex, "");
}

export function decodeAndSanitizeHTML(html: string) {
  return DOMPurify.sanitize(Buffer.from(html, "base64").toString("utf-8"));
}

export function convertAndFilterHTMLToText(html: string) {
  return filterSensitiveData(convert(html));
}
