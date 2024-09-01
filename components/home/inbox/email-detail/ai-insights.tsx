import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import React, { useContext, useState, useTransition } from "react";
import { EmailDetailContext } from "@/context/email-detail-context";
import { EmailDetailsSkeleton } from "@/components/home/inbox/skeleton";
import LimitExceeded from "@/components/home/inbox/limit-exceeded";
import { AILabel } from "./email";
import { InboxContext } from "@/context/inbox-context";
import { Button } from "@/components/ui/button";
import { Tag } from "@/types";
import { useHandleAnalyze } from "@/hooks/useHandleAnalyze";

const AIInsights = ({ emailId }: { emailId: string }) => {
  const {
    cooldown,
    cooldownTime,
    setCooldown,
    emailsLeft,
    emailAnalysis,
    // handleAnalyze,
  } = useContext(EmailDetailContext);
  const { selectedAccount, setEmails } = useContext(InboxContext);
  const [limitExceeded, setLimitExceeded] = useState(false);
  const [isAnalyzing, startTransition] = useTransition();
  const handleAnalyze = useHandleAnalyze();
  const [isOpen, setIsOpen] = useState(true);
  const [value, setValue] = useState("2");

  const getAccordianTitle = () => {
    if (isAnalyzing) {
      return "Getting your email insights using AI";
    }
    return "AI Insights";
  };
  const handleAnalysis = async () => {
    if (!selectedAccount) {
      return;
    }
    startTransition(async () => {
      const res = await handleAnalyze(
        emailId,
        selectedAccount.accountId,
        false,
        true
      );
      setLimitExceeded(res);
    });
  };

  if (!selectedAccount) {
    return null;
  }
  return (
    <div>
      <Accordion
        type="single"
        collapsible
        defaultChecked
        defaultValue="ai-insights"
      >
        <AccordionItem value="ai-insights">
          <AccordionTrigger
            className="font-bold text-black text-md w-full p-2"
            // onClick={handleAccordianClick}
          >
            <div className="flex justify-between ">
              <div>{getAccordianTitle()}</div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {limitExceeded ? (
              <div className="flex justify-start items-center gap-5 px-2">
                <LimitExceeded
                  handleAnalyze={handleAnalysis}
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
                  <Button variant="destructive" onClick={handleAnalysis}>
                    {emailAnalysis ? "Re-Analyze" : "Analyze"}
                  </Button>
                </div>
                <div className="text-sm ">
                  <div className="flex gap-5">
                    {emailAnalysis?.tags?.map((t: Tag) => {
                      return (
                        <AILabel
                          key={t.id + emailId}
                          bgColor={t.color || "rgba(0,0,0,0.1)"}
                        >
                          <span>{t.label}</span>
                        </AILabel>
                      );
                    })}

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
