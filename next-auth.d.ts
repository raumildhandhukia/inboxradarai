import NextAuth, { type DefaultSession } from "next-auth";
import Plans from "@/types/Plans";

export type ExtUser = DefaultSession["user"] & {
  plan: Plans;
};

declare module "next-auth" {
  interface Session {
    user: ExtUser;
  }
}
