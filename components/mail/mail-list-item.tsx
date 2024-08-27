"use client";
import { EmailDetailContext } from "@/context/email-detail-context";
import { cn } from "@/utils/cn";
import { BarLoader, BeatLoader, DotLoader } from "react-spinners";
import React, {
  ComponentProps,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import { Badge } from "../ui/badge";
import { Email } from "@/types";

import { InboxContext } from "@/context/inbox-context";
import { AILabel, DateTime } from "../home/inbox/email-detail/email";
import { UserContext } from "@/context/user-context";
import { useSearchParams } from "next/navigation";

const MailListItem = (item: Email, inUnreadTab?: boolean) => {
  const searchParams = useSearchParams();
  const { id, from, subject, snippet, read, labelIds, analysis, date } = item;
  const {
    selectedEmail,
    setSelectedEmail,
    selectedAccount,
    setEmails,
    setComposeMessage,
  } = useContext(InboxContext);
  const [isAnalyzing, startAnalysis] = useTransition();
  const inboxType = searchParams.get("type");
  const { user } = useContext(UserContext);
  const [cooldown, setCooldown] = useState(false);
  const { setEmailAnalysis } = useContext(EmailDetailContext);

  useEffect(() => {
    const userLastAutoUpdate = new Date(user.lastAutoUpdate);
    const emailDate = new Date(item?.date || new Date());
    const shouldAutoUpdateEmail =
      user.autoUpdate &&
      !isAnalyzing &&
      !analysis &&
      userLastAutoUpdate < emailDate;
    const isAutoUpdateInbox =
      (inboxType === "primary" && user.updatePrimary) ||
      (inboxType === "social" && user.updateSocial) ||
      (inboxType === "promotions" && user.updatePromotions) ||
      (inboxType === "updates" && user.updateUpdates);

    if (shouldAutoUpdateEmail && isAutoUpdateInbox) {
      startAnalysis(async () => {
        const res = await fetch(`/api/ai/analyze-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailIDs: [item.id],
            findExisting: false,
            emailAddress: selectedAccount,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          const emailAnalysis = data[0];
          if (emailAnalysis) {
            if (emailAnalysis.success) {
              setEmails((prev) => {
                return prev.map((e) => {
                  if (e.id === item?.id) {
                    return { ...e, analysis: emailAnalysis.analysis };
                  }
                  return e;
                });
              });
            }
            if (emailAnalysis.limitExceeded) {
              setCooldown(true);
              setEmails((prev) => {
                return prev.map((e) => {
                  if (e.id === item.id) {
                    return {
                      ...e,
                      analysis: null,
                      limitExceeded: true,
                      timeLeft: emailAnalysis.timeLeft,
                      emailsLeft: emailAnalysis.emailsLeft > 0,
                    };
                  }
                  return e;
                });
              });
            }
          }
        }
      });
    }
  }, [user.autoUpdate, user.lastAutoUpdate, item?.date]);

  const handleEmailClick = async () => {
    setComposeMessage(false);
    setSelectedEmail(item);
    setEmailAnalysis(null);
    const res = await fetch(`/api/mail/mark-read`, {
      method: "POST",
      body: JSON.stringify({
        emailId: id,
        account: selectedAccount,
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
      {!isAnalyzing && analysis?.tag ? (
        <div className="flex items-center gap-2">
          <AILabel key={analysis.tag.id} bgColor={analysis.tag.color}>
            {analysis.tag.label}
          </AILabel>
        </div>
      ) : null}
      {isAnalyzing && (
        <div className="flex items-center gap-2">
          <BarLoader className="max-w-5 max-h-5" />
        </div>
      )}
    </button>
  );
};

export default MailListItem;
