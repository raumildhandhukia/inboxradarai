"use client";
import { Mail } from "./mail";
import { Account } from "@/types";
import { InboxContext } from "@/context/inbox-context";
import { useContext } from "react";
import { useSelectedAccount } from "@/hooks/useSelectedAccount";

export default function MailPage({
  accounts,
  defaultLayout,
  defaultCollapsed,
}: {
  accounts: Account[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
}) {
  const { selectedAccount } = useContext(InboxContext);
  useSelectedAccount(accounts[0], accounts);
  return (
    <>
      {selectedAccount && (
        <div className="hidden flex-col md:flex">
          <Mail
            accounts={accounts}
            defaultLayout={defaultLayout}
            defaultCollapsed={defaultCollapsed}
            navCollapsedSize={4}
          />
        </div>
      )}
    </>
  );
}
