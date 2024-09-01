"use client";
import { EmailDetailContext } from "@/context/email-detail-context";
import { cn } from "@/utils/cn";
import { BarLoader } from "react-spinners";
import React, {
  ComponentProps,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import { Badge } from "../ui/badge";
import { Email, Label, Tag } from "@/types";
import { useHandleAnalyze } from "@/hooks/useHandleAnalyze";
import { InboxContext } from "@/context/inbox-context";
import { AILabel, DateTime } from "../home/inbox/email-detail/email";
import { UserContext } from "@/context/user-context";
import { useSearchParams } from "next/navigation";
import { set } from "date-fns";
import { TimerIcon } from "lucide-react";

const MailListItem = (item: Email, inUnreadTab?: boolean) => {
  const handleAnalyze = useHandleAnalyze();
  const searchParams = useSearchParams();
  const { id, from, subject, snippet, read, labelIds, analysis, date } = item;
  const {
    selectedEmail,
    setSelectedEmail,
    selectedAccount,
    setEmails,
    setComposeMessage,
  } = useContext(InboxContext);

  const inboxType = searchParams.get("type");
  const { user } = useContext(UserContext);
  const { setEmailAnalysis, cooldown } = useContext(EmailDetailContext);
  const [isAnalyzing, startTransition] = useTransition();
  const [limitExceeded, setLimitExceeded] = useState(false);

  useEffect(() => {
    const userLastAutoUpdate = new Date(user.lastAutoUpdate);
    const emailDate = new Date(item?.date || new Date());
    const shouldAutoUpdateEmail = !isAnalyzing && !analysis;
    const isAutoUpdateInbox =
      (inboxType === "primary" && user.updatePrimary) ||
      (inboxType === "social" && user.updateSocial) ||
      (inboxType === "promotions" && user.updatePromotions) ||
      (inboxType === "updates" && user.updateUpdates);
    if (shouldAutoUpdateEmail) {
      startTransition(async () => {
        if (!selectedAccount) {
          return;
        }
        const limitExceeded = await handleAnalyze(
          item.id,
          selectedAccount.accountId,
          false,
          selectedEmail?.id === item.id ? true : false
        );
        setLimitExceeded(limitExceeded);
      });
    }
  }, [user.autoUpdate, user.lastAutoUpdate, item?.date]);

  const handleEmailClick = async () => {
    if (!selectedAccount) {
      return;
    }
    setComposeMessage(false);
    setSelectedEmail(item);
    setEmailAnalysis(null);

    const res = await fetch(`/api/mail/mark-read`, {
      method: "POST",
      body: JSON.stringify({
        emailId: id,
        accountId: selectedAccount.accountId,
        label: "UNREAD",
      }),
    });
    if (res.ok) {
      setSelectedEmail({ ...item, read: true });
      {
        !inUnreadTab &&
          setEmails((prev) => {
            return prev.map((email) => {
              if (email.id === id) {
                return { ...email, read: true };
              }
              return email;
            });
          });
      }
    }
  };

  return (
    <button
      key={id}
      className={cn(
        "max-w-full flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
        selectedEmail?.id === id && "bg-muted scale-[1.01] border-red-400",
        read && "bg-muted"
      )}
      onClick={handleEmailClick}
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="font-semibold">{from}</div>
            {!item.read && (
              <span className="flex h-2 w-2 rounded-full bg-blue-600" />
            )}
          </div>
          {date && (
            <div
              className={cn(
                "ml-auto text-xs",
                selectedEmail?.id === id
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              <DateTime date={date} />
            </div>
          )}
        </div>
        <div className="text-xs font-medium">{subject}</div>
      </div>
      <div className="text-xs text-muted-foreground overflow-ellipsis line-clamp-2">
        {snippet?.substring(0, 128)}
      </div>

      <div className="flex gap-2">
        {limitExceeded && (
          <div className="text-xs text-muted-foreground">
            <TimerIcon className="w-4 h-4" />
          </div>
        )}
        {isAnalyzing && (
          <div className="flex items-center gap-2">
            <BarLoader className="max-w-5 max-h-5" />
          </div>
        )}
        {analysis?.tags?.map((tag) => (
          <div key={tag.id} className="flex items-center gap-2">
            <AILabel bgColor={tag.color}>{tag.label}</AILabel>
          </div>
        ))}
      </div>
    </button>
  );
};

export default MailListItem;
