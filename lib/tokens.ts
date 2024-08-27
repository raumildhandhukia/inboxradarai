import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset";

export const generateVerificationToken = async (email: string) => {
  try {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 24 * 3600 * 1000);
    const existingToken = await getVerificationTokenByEmail(email);
    if (existingToken) {
      await db.verificationToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }
    const newVerificationToken = await db.verificationToken.create({
      data: {
        email,
        token,
        expires,
      },
    });
    return newVerificationToken;
  } catch (error) {
    console.error(error);
  }
};

export const generatePasswordVerificationToken = async (email: string) => {
  try {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 24 * 3600 * 1000);
    const existingToken = await getPasswordResetTokenByEmail(email);
    if (existingToken) {
      await db.passwordResetToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }
    const newPasswordResetToken = await db.passwordResetToken.create({
      data: {
        email,
        token,
        expires,
      },
    });
    return newPasswordResetToken;
  } catch (error) {
    console.error(error);
  }
};
