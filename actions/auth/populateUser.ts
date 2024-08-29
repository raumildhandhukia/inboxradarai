"use server";
import { db } from "@/lib/db";
import { generateFromEmail } from "unique-username-generator";

export async function populateUser(userId: string, userEmail: string) {
  try {
    let username;
    let search = true;
    while (search) {
      username = generateFromEmail(userEmail, 3);
      const existingUser = await db.user.findFirst({
        where: {
          username,
        },
      });
      if (!existingUser) {
        search = false;
      }
    }
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        emailProcessed: 0,
        username,
        emailVerified: new Date(),
        lastAutoUpdate: new Date(),
        lastFreeTierRefillDate: new Date(),
      },
    });
    await db.userSettings.create({
      data: {
        userId,
      },
    });
  } catch (error) {
    throw new Error("Failed to populate user.");
  }
}
