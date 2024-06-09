"use server";
import { signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";

import { redirect } from "next/navigation";

export const logout = async () => {
  let toRedirect = false;

  try {
    await signOut();
    return { success: "Logout Successful" };
  } catch (error) {
    if (isRedirectError(error)) {
      toRedirect = true;
    }
    throw error;
  } finally {
    if (toRedirect) {
      redirect("/auth/login");
    }
  }
};
