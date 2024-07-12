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

const AIInsights = ({}: {}) => {
  const {
    isAnalyzing,
    cooldown,
    cooldownTime,
    setCooldown,
    emailsLeft,
    emailAnalysis,
    handleAnalyze,
  } = useContext(EmailDetailContext);
  const [isOpen, setIsOpen] = useState(false);

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
      handleAnalyze();
    }
  };
  return (
    <div className="p-5">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger
            className="font-bold text-black text-xl w-full"
            onClick={handleAccordianClick}
          >
            <div className="flex justify-between ">
              <div>{getAccordianTitle()}</div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {" "}
            {cooldown ? (
              <div className="flex justify-start items-center gap-5 px-2">
                <LimitExceeded
                  timer={cooldownTime}
                  handleAnalyze={handleAnalyze}
                  removeCooldown={() => {
                    setCooldown(false);
                  }}
                  emailsLeft={emailsLeft}
                />
              </div>
            ) : isAnalyzing ? (
              <EmailDetailsSkeleton />
            ) : (
              <div className="text-sm -ml-1">
                <div className="flex gap-5">
                  {emailAnalysis?.tag && emailAnalysis?.tag?.label && (
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
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AIInsights;
