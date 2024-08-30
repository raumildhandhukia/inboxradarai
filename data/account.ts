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
          accountId: account.accountId,
        };
      });
    return preparedAccounts;
  } catch (e) {
    return [];
  }
};

export const getAccountById = async (accountId: number) => {
  try {
    const account = await db.account.findUnique({
      where: {
        accountId,
      },
      select: {
        email: true,
        refresh_token: true,
        userId: true,
      },
    });
    if (
      !account ||
      !account.email ||
      !account.refresh_token ||
      !account.userId
    ) {
      return null;
    } else {
      return account;
    }
  } catch (e) {
    return null;
  }
};

export const verifyAccount = async (accountId: number, userId: string) => {
  try {
    const account = await getAccountById(accountId);
    if (!account) {
      return false;
    }
    return account.userId === userId;
  } catch (e) {
    return false;
  }
};
