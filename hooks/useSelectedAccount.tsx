import { useState, useEffect, useContext } from "react";
import { InboxContext } from "@/context/inbox-context";
import Cookies from "js-cookie";

export const useSelectedAccount = (defaultAccount: string) => {
  const { setSelectedAccount } = useContext(InboxContext);

  useEffect(() => {
    const account = Cookies.get("selectedEmailAccount");

    if (account) {
      setSelectedAccount(account);
    } else {
      setSelectedAccount(defaultAccount);
      Cookies.set("selectedEmailAccount", defaultAccount);
    }
  }, [setSelectedAccount, defaultAccount]);

  const setAccount = (account: string) => {
    setSelectedAccount(account);
    Cookies.set("selectedEmailAccount", account);
  };
  return setAccount;
};
