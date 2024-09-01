import { RgbaColor } from "react-colorful";
import { Tag as TagPrisma } from "@prisma/client";

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
  tags: any[];
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
  errorCode?: number;
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

export type EmailSearchResultProps = {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  date: string;
  snippet: string;
};

export interface Email {
  id: string;
  labelIds: string[] | null | undefined;
  snippet: string | null | undefined;
  subject: string | null | undefined;
  from: string | null | undefined;
  deliveredTo: string | null | undefined;
  to: string | null | undefined;
  date: string | null | undefined;
  body: string | null | undefined;
  threadId: string | null | undefined;
  messageId: string | null | undefined;
  read?: boolean;
  analysis?: EmailAnalysis | null;
}

export type UserPreferences = {
  name: string;
  email: string;
  labels: TagPrisma[];
  plan: string;
  updateSocial: boolean;
  updatePrimary: boolean;
  updatePromotions: boolean;
  updateUpdates: boolean;
  autoUpdate: boolean;
  emailsProcessed: number;
  customLabels: TagPrisma[];
  predefinedLabels: TagPrisma[];
  stripeEndDate: string;
  lastAutoUpdate: Date;
  hasPlanCancelled: boolean;
  planEndingDate: Date | null;
};
export type Plan = {
  id: number;
  name: string;
  plan: string;
  emailsAllowed: number;
  processLimit: boolean;
  autoProcess: boolean;
  customTag: number;
  totalTags: number;
  price: {
    amount: number;
    priceIds: {
      test: string;
      production: string;
    };
  };
};
export type Account = {
  id: string;
  email: string;
  accountId: number;
};

export type inbox = {};
