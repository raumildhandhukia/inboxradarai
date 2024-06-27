import { RgbaColor } from "react-colorful";

export interface Label {
  id: string;
  label: string;
  description: string;
  color: string;
  predefinedId?: number;
  isActive: boolean;
}

export interface Tag {
  id: string;
  label: string;
  description: string;
  color: string;
}

export interface EmailAnalysis {
  summary: string;
  isImportant: boolean;
  actions: string[];
  tag: Tag;
  emailId: string;
}

export interface AnalysisTypeBase {
  success: boolean;
}

export interface AnalysisSuccess extends AnalysisTypeBase {
  success: true;
  analysis: EmailAnalysis;
}

export interface AnalysisFailure extends AnalysisTypeBase {
  success: false;
  analysis?: undefined;
}

export type AnalysisType = AnalysisSuccess | AnalysisFailure;

export interface FailureResponseType extends AnalysisFailure {
  emailId: string;
  limitExceeded?: boolean;
  timeLeft?: number;
  emailsLeft?: number;
}

export interface SuccessResponseType extends AnalysisSuccess {
  emailId: string;
}

export type AnalysisResponseType = SuccessResponseType | FailureResponseType;

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
