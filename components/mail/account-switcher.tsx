"use client";

import * as React from "react";
import { SiGmail } from "react-icons/si";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Account } from "@/types";
import { InboxContext } from "@/context/inbox-context";
import { UserContext } from "@/context/user-context";
import { useEffect } from "react";
import { useSelectedAccount } from "@/hooks/useSelectedAccount";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { Button } from "../ui/button";
import { PLANS } from "@/config/app";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface AccountSwitcherProps {
  isCollapsed: boolean;
  accounts: Account[];
}

export function AccountSwitcher({
  isCollapsed,
  accounts,
}: AccountSwitcherProps) {
  const user = useCurrentUser();
  const { selectedAccount } = React.useContext(InboxContext);
  const router = useRouter();
  const setAccount = useSelectedAccount(accounts[0], accounts);
  const plan = PLANS.find(
    (p) => p.price.priceIds.production === user?.stripePriceId
  );

  if (!selectedAccount) {
    return null;
  }
  const handleAddGoogleInbox = () => {
    signIn("google", {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  const setAccountUsingEmail = (email: string) => {
    const account = accounts.find((a) => a.email === email);
    if (account) {
      setAccount(account);
    }
    router.push(`/inbox?type=primary`);
  };

  return (
    <Select
      defaultValue={selectedAccount.email}
      onValueChange={setAccountUsingEmail}
    >
      <SelectTrigger
        className={cn(
          "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
          isCollapsed &&
            "flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden"
        )}
        aria-label="Select account"
      >
        <SelectValue placeholder="Select an account">
          <SiGmail />
          <span className={cn("ml-2", isCollapsed && "hidden")}>
            {selectedAccount.email}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {accounts.map((account) => (
          <SelectItem key={account.email} value={account.email}>
            <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
              <SiGmail />
              {account.email}
            </div>
          </SelectItem>
        ))}
        <Button
          onClick={handleAddGoogleInbox}
          variant="ghost"
          className="w-full"
        >
          <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
            <IoMdAdd className="-ml-5" />
            add new inbox
          </div>
        </Button>
      </SelectContent>
    </Select>
  );
}
