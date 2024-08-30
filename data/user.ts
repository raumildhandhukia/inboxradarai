import { db } from "@/lib/db";
import { sendEmail } from "./gmail";

interface UserData {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}

export const getUserByEmail = async (email: string | undefined) => {
  if (!email) {
    return null;
  }
  try {
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    return existingUser;
  } catch (e) {
    console.log(e);
  }
};

export const getUserById = async (id: string | undefined) => {
  if (!id) {
    return null;
  }
  try {
    const existingUser = await db.user.findUnique({
      where: {
        id,
      },
    });
    return existingUser;
  } catch (e) {
    console.log(e);
  }
};

export const getUsersByName = async (query: string | undefined) => {
  if (!query) {
    return null;
  }
  try {
    const users = await db.user.findMany({
      where: {
        email: {
          startsWith: query,
          mode: "insensitive",
        },
      },
    });
    const userData: UserData[] = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      };
    });
    return userData;
  } catch (e) {
    console.log(e);
    return null;
  }
};
const isUserSubscribed = (user: any) => {
  return Boolean(
    user.stripePriceId &&
      user.stripeCurrentPeriodEnd &&
      user.stripeCurrentPeriodEnd.getTime() > Date.now()
  );
};

export const performCronOperations = async () => {
  try {
    const users = await db.user.findMany();
    users.forEach(async (user) => {
      try {
        if (!isUserSubscribed(user)) {
          const differenceInDays = Math.floor(
            (new Date().getTime() -
              new Date(user.lastFreeTierRefillDate as Date).getTime()) /
              (1000 * 60 * 60 * 24)
          );

          if (differenceInDays > 30) {
            await db.user.update({
              where: {
                id: user.id,
              },
              data: {
                lastFreeTierRefillDate: new Date(),
                emailProcessed: 0,
              },
            });
          }
          // sendEmail
        }
      } catch (e) {
        console.log(e);
      }
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
