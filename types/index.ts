import { RgbaColor } from "react-colorful";

export interface Label {
  id: string;
  label: string | null | undefined;
  description: string | null | undefined;
  color: string | null | undefined;
}

export interface Tag {
  id: string;
  label: string | null | undefined;
  description: string | null | undefined;
  color: string | null | undefined;
}

export interface EmailAnalysis {
  emailId: string;
  summary: string | null | undefined;
  isImportant: boolean | null | undefined;
  actions: string[] | null | undefined;
  tag: Tag | null | undefined;
}

export interface Email {
  id: string;
  labelIds: string[] | null | undefined;
  snippet: string | null | undefined;
  subject: string | null | undefined;
  from: string | null | undefined;
  to: string | null | undefined;
  date: string | null | undefined;
  body: string | null | undefined;
}
