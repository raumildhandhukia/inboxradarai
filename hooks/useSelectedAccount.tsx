import { useState, useEffect, useContext } from "react";
import { InboxContext } from "@/context/inbox-context";
import Cookies from "js-cookie";
import { Account } from "@/types";

export const useSelectedAccount = (
  defaultAccount: Account,
  allAccounts: Account[]
) => {
  const { setSelectedAccount } = useContext(InboxContext);

  useEffect(() => {
    const account = Cookies.get("selectedEmailAccountId");

    if (
      account &&
      allAccounts.find((a) => a.accountId.toString() === account)
    ) {
      setSelectedAccount(
        allAccounts.find((a) => a.accountId.toString() === account)!
      );
    } else {
      setSelectedAccount(defaultAccount);

      Cookies.set(
        "selectedEmailAccountId",
        defaultAccount.accountId.toString()
      );
    }
  }, [setSelectedAccount, defaultAccount, allAccounts]);

  const setAccount = (account: Account) => {
    setSelectedAccount(account);

    Cookies.set("selectedEmailAccountId", account.accountId.toString());
  };
  return setAccount;
};
