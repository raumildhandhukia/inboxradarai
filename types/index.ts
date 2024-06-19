import { RgbaColor } from "react-colorful";

export interface Label {
  id: number;
  label: string;
  description: string;
  color: RgbaColor;
  error: string;
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
  AILabel: {
    label: string;
    color: string;
  };
}
