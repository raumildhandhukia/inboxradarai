import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import DOMPurify from "dompurify";
import { EditorView } from "@tiptap/pm/view";

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
export function minMax(value = 0, min = 0, max = 0): number {
  return Math.min(Math.max(value, min), max);
}

export function posToDOMRect(
  view: EditorView,
  from: number,
  to: number
): DOMRect {
  const minPos = 0;
  const maxPos = view.state.doc.content.size;
  const resolvedFrom = minMax(from, minPos, maxPos);
  const resolvedEnd = minMax(to, minPos, maxPos);
  const start = view.coordsAtPos(resolvedFrom);
  const end = view.coordsAtPos(resolvedEnd, -1);
  const top = Math.min(start.top, end.top);
  const bottom = Math.max(start.bottom, end.bottom);
  const left = Math.min(start.left, end.left);
  const right = Math.max(start.right, end.right);
  const width = right - left;
  const height = bottom - top;
  const x = left;
  const y = top;
  const data = {
    top,
    bottom,
    left,
    right,
    width,
    height,
    x,
    y,
  };

  return {
    ...data,
    toJSON: () => data,
  };
}
