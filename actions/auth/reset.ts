"use server";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordVerificationToken } from "@/lib/tokens";
import * as z from "zod";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  try {
    const verifiedValues = ResetSchema.safeParse(values);
    if (!verifiedValues.success) {
      return {
        error: "Invalid Email !",
      };
    }
    const { email } = verifiedValues.data;
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      return {
        error: "No user found with that email",
      };
    }

    const passwordResetToken = await generatePasswordVerificationToken(email);
    if (!passwordResetToken) {
      return {
        error: "Something went wrong!",
      };
    }
    const { name } = existingUser;
    await sendPasswordResetEmail(
      name || email,
      email,
      passwordResetToken.token
    );
    return {
      success: "Reset link sent to your email",
    };
  } catch (error) {
    return {
      error: "Something went wrong!",
    };
  }
};
