"use server";

import { db } from "@/lib/db";

type User = {
  id: string;
  updateSocial: boolean;
  updatePrimary: boolean;
  updatePromotions: boolean;
  updateUpdates: boolean;
  autoUpdate: boolean;
};

export const setUserPreferences = async (userPreferences: User) => {
  try {
    const user = await db.user.update({
      where: {
        id: userPreferences.id,
      },
      data: {
        updateSocial: userPreferences.updateSocial,
        updatePrimary: userPreferences.updatePrimary,
        updatePromo: userPreferences.updatePromotions,
        updateUpdate: userPreferences.updateUpdates,
        autoUpdate: userPreferences.autoUpdate,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};
