import React, {
  useState,
  useTransition,
  useContext,
  useEffect,
  use,
  useCallback,
} from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DateTime,
  Message,
  From,
  AILabel,
} from "@/components/home/inbox/email-detail/email";
import { UserContext } from "@/context/user-context";
import { Button } from "@/components/ui/button";
import { TbAnalyze } from "react-icons/tb";
import { EmailListItemSkeleton } from "@/components/home/inbox/skeleton";
import { InboxContext } from "@/context/inbox-context";
import LimitExceeded from "@/components/home/inbox/limit-exceeded";
import { useSearchParams } from "next/navigation";

interface EmailListItemProps {
  email: any;
  selectedEmails: string[];
  setSelectedEmails: (emails: string[]) => void;
  handleEmailSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailClick: (emailId: string) => void;
}

const EmailListItem: React.FC<EmailListItemProps> = ({
  email,
  selectedEmails,
  setSelectedEmails,
  handleEmailSelect,
  handleEmailClick,
}) => {
  const { setEmails } = useContext(InboxContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isAnalyzing, startAnalysis] = useTransition();
  const [cooldown, setCooldown] = useState(false);
  const analysis = email?.analysis;
  const { user } = useContext(UserContext);
  const searchParams = useSearchParams();
  const inboxType = searchParams.get("type");

  const handleAnalyze = (findExisting: boolean) => {
    startAnalysis(async () => {
      const res = await fetch(`/api/ai/analyze-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailIDs: [email.id],
          findExisting,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        const emailAnalysis = data[0];
        if (emailAnalysis) {
          if (emailAnalysis.success) {
            setEmails((prev) => {
              return prev.map((e) => {
                if (e.id === email.id) {
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
                if (e.id === email.id) {
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
  };

  useEffect(() => {
    const userLastAutoUpdate = new Date(user.lastAutoUpdate);
    const emailDate = new Date(email.date);
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
            emailIDs: [email.id],
            findExisting: false,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          const emailAnalysis = data[0];
          if (emailAnalysis) {
            if (emailAnalysis.success) {
              setEmails((prev) => {
                return prev.map((e) => {
                  if (e.id === email.id) {
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
                  if (e.id === email.id) {
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
  }, [user.autoUpdate, user.lastAutoUpdate, email.date]);

  const handleAccordianClick = async () => {
    setIsOpen(!isOpen);
    if (!isAnalyzing && !isOpen && !analysis) {
      handleAnalyze(true);
    }
  };

  const renderAccordianContet = () => {
    if (cooldown) {
      return (
        <LimitExceeded
          timer={email.timeLeft}
          handleAnalyze={handleAnalyze}
          removeCooldown={() => {
            setCooldown(false);
          }}
          emailsLeft={email.emailsLeft}
        />
      );
    }
    if (isAnalyzing) {
      return <EmailListItemSkeleton />;
    }
    if (analysis) {
      return (
        <>
          <div className="flex flex-col">
            <Button
              variant="hacker"
              className="ml-1 p-2 rounded-full"
              onClick={() => handleAnalyze(false)}
            >
              <div className="">
                <TbAnalyze className="scale-[1.5]" />
              </div>
            </Button>
          </div>
          <div className="min-w-[12.3vw] flex justify-start items-center ">
            <div className="flex flex-col">
              <p className="font-bold text-xs w-full">
                {email?.analysis.isImportant ? "Important" : "Not Important"}
              </p>
              <div className="flex items-start justify-start gap-3 flex-wrap mt-2">
                {email?.analysis?.tag && (
                  <AILabel
                    isActive={false}
                    bgColor={email?.analysis?.tag.color}
                    className="text-xs"
                  >
                    {email?.analysis?.tag.label}
                  </AILabel>
                )}
              </div>
            </div>
          </div>

          <span className="ml-2">{email?.analysis.summary}</span>
          <div className="min-w-[15vw] flex flex-col">
            {email?.analysis.actions?.map((action: string, index: number) => (
              <span key={index}>
                {`${index + 1}) `}
                {action}
              </span>
            ))}
          </div>
        </>
      );
    }
  };

  return (
    <Accordion
      type="single"
      collapsible
      key={email.id}
      className="hover:bg-gray-50 dark:hover:bg-[rgba(143,136,136,0.1)]"
    >
      <AccordionItem value="item-1">
        <div className="flex gap-x-2 justify-start items-center px-2">
          <AccordionTrigger
            className=" max-w-10"
            onClick={handleAccordianClick}
          ></AccordionTrigger>
          <div>
            <div
              className="flex flex-col cursor-pointer transition-colors w-full py-2 text-sm "
              key={email.id}
              onClick={() => {
                handleEmailClick(email.id);
              }}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="min-w-[15vw] flex-auto">
                  <div className="flex gap-3 justify-start items-center ">
                    {email?.analysis?.tag && !isOpen && (
                      <AILabel
                        isActive={false}
                        bgColor={`${email?.analysis?.tag?.color}`}
                      >
                        {email?.analysis?.tag?.label}
                      </AILabel>
                    )}
                    <From from={email.from} className="line-clamp-2" />
                  </div>
                </div>
                <div className="flex-grow">
                  <Message sub={email.subject} body={email.snippet} />
                </div>
                <div className="min-w-[7vw] text-right !text-[13px] flex-shrink-0">
                  <DateTime date={email.date} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <AccordionContent>
          <div className="flex justify-start items-start gap-5 mt-2 text-muted-foreground">
            {
              renderAccordianContet() // render the content of the accordion
            }
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default EmailListItem;
