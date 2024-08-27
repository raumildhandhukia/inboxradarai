import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import React, { useContext, useState } from "react";
import { EmailDetailContext } from "@/context/email-detail-context";
import { EmailDetailsSkeleton } from "@/components/home/inbox/skeleton";
import LimitExceeded from "@/components/home/inbox/limit-exceeded";
import { AILabel } from "./email";
import { InboxContext } from "@/context/inbox-context";
import { Button } from "@/components/ui/button";

const AIInsights = ({ emailId }: { emailId: string }) => {
  const {
    isAnalyzing,
    cooldown,
    cooldownTime,
    setCooldown,
    emailsLeft,
    emailAnalysis,
    handleAnalyze,
  } = useContext(EmailDetailContext);
  const { selectedAccount, setEmails } = useContext(InboxContext);
  const [isOpen, setIsOpen] = useState(true);
  const [value, setValue] = useState("2");

  const getAccordianTitle = () => {
    if (cooldown) {
      return "Upgrade Your Plan";
    } else {
      if (isAnalyzing) {
        return "Getting your email insights using AI";
      }
      return "AI Insights";
    }
  };

  const handleAccordianClick = async () => {
    setIsOpen(!isOpen);
    if (!isOpen && !cooldown && !isAnalyzing && !emailAnalysis) {
      handleAnalyze(emailId, selectedAccount);
      if (emailAnalysis) {
        setEmails((prev) => {
          return prev.map((email) => {
            if (email.id === emailId) {
              return { ...email, analysis: emailAnalysis };
            }
            return email;
          });
        });
      }
    }
  };
  return (
    <div>
      <Accordion type="single" collapsible defaultChecked>
        <AccordionItem value="item-1">
          <AccordionTrigger
            className="font-bold text-black text-md w-full p-2"
            onClick={handleAccordianClick}
          >
            <div className="flex justify-between ">
              <div>{getAccordianTitle()}</div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {cooldown ? (
              <div className="flex justify-start items-center gap-5 px-2">
                <LimitExceeded
                  timer={cooldownTime}
                  handleAnalyze={() => {
                    handleAnalyze(emailId, selectedAccount);
                    if (emailAnalysis) {
                      setEmails((prev) => {
                        return prev.map((email) => {
                          if (email.id === emailId) {
                            return { ...email, analysis: emailAnalysis };
                          }
                          return email;
                        });
                      });
                    }
                  }}
                  removeCooldown={() => {
                    setCooldown(false);
                  }}
                  emailsLeft={emailsLeft}
                />
              </div>
            ) : isAnalyzing ? (
              <EmailDetailsSkeleton />
            ) : (
              <div>
                <div className="mb-5">
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleAnalyze(emailId, selectedAccount);
                      if (emailAnalysis) {
                        setEmails((prev) => {
                          return prev.map((email) => {
                            if (email.id === emailId) {
                              return { ...email, analysis: emailAnalysis };
                            }
                            return email;
                          });
                        });
                      }
                    }}
                  >
                    {" "}
                    Re-analyze{" "}
                  </Button>
                </div>
                <div className="text-sm ">
                  <div className="flex gap-5">
                    {emailAnalysis?.tag && (
                      <AILabel
                        bgColor={emailAnalysis?.tag?.color || "rgba(0,0,0,0.1)"}
                      >
                        <span>{emailAnalysis?.tag?.label}</span>
                      </AILabel>
                    )}

                    <span className="italic font-bold ml-1">
                      {emailAnalysis &&
                        (emailAnalysis?.isImportant
                          ? " Important"
                          : " Not Important")}
                    </span>
                  </div>
                  <h2 className="mt-2 ml-1">{emailAnalysis?.summary}</h2>
                  <div className="flex flex-col gap-1 ml-1 mt-2">
                    {emailAnalysis?.actions &&
                      emailAnalysis?.actions.length > 0 && (
                        <>
                          <span className="font-bold">Suggested Actions:</span>
                          {emailAnalysis?.actions?.map(
                            (action: string, index: number) => (
                              <span key={index}>
                                {`${index + 1}) `}
                                {action}
                              </span>
                            )
                          )}
                        </>
                      )}
                  </div>
                </div>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AIInsights;
