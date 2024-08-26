import { db } from "@/lib/db";
import { auth } from "@/auth";
import { Account } from "@/types";
export const getAccounts = async () => {
  const session = await auth();
  if (!session) {
    return [];
  }
  const userId = session.user.id;
  try {
    const accounts = await db.account.findMany({
      where: {
        userId,
      },
    });

    const preparedAccounts: Account[] = accounts
      .filter((account) => account.providerAccountId && account.email)
      .map((account) => {
        return {
          id: account.providerAccountId,
          email: account.email || "",
        };
      });
    return preparedAccounts;
  } catch (e) {
    return [];
  }
};
