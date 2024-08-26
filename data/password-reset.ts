import { db } from "@/lib/db";

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: {
        email,
      },
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};
export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    return await db.passwordResetToken.findUnique({
      where: {
        token,
      },
    });
  } catch (error) {
    return null;
  }
};
