import { db } from "@/lib/db";

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
