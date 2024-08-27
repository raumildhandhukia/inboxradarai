"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  let toRedirect = false;
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    console.error(validatedFields.error);
    return { error: "Invalid Fields!" };
  }
  const { email, password } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email is not registered." };
  }
  if (existingUser && !existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);
    if (!verificationToken) {
      return { error: "Failed to generate verification token!" };
    }
    const { name } = existingUser;
    await sendVerificationEmail(name || email, email, verificationToken.token);
    return { success: "Email not verified, verification email sent!" };
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials!" };
        default:
          return { error: "Login Failed, something went wrong!" };
      }
    }
    if (isRedirectError(error)) {
      toRedirect = true;
      throw error;
    }
    throw error;
  } finally {
    // if (toRedirect) {
    //   redirect(DEFAULT_LOGIN_REDIRECT);
    // }
  }
};
