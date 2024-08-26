"use server";

import { getPasswordResetTokenByToken } from "@/data/password-reset";
import { getUserByEmail } from "@/data/user";
import { NewPasswordSchema } from "@/schemas";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  try {
    if (!token) {
      return {
        error: "Missing Token !",
      };
    }
    const validatedValues = NewPasswordSchema.safeParse(values);
    if (!validatedValues.success) {
      return {
        error: "Invalid Data !",
      };
    }
    const { password } = validatedValues.data;
    const existingToken = await getPasswordResetTokenByToken(token);
    if (!existingToken) {
      return {
        error: "Invalid reset password link !",
      };
    }
    if (existingToken.expires < new Date()) {
      return {
        error: "Reset password link expired !",
      };
    }
    const user = await getUserByEmail(existingToken.email);
    if (!user) {
      return {
        error: "No user found with that email",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
    return {
      success: "Password reset successfully",
    };
  } catch (error) {
    return {
      error: "Something went wrong!",
    };
  }
};
