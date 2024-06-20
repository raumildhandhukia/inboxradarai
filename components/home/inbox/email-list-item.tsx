import React, { useState, useTransition, useContext } from "react";
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
} from "@/components/home/inbox/email";
import { Button } from "@/components/ui/button";
import { TbAnalyze } from "react-icons/tb";
import { Skeleton } from "@/components/ui/skeleton";
import { InboxContext } from "@/context/inbox-context";

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
  const analysis = email?.analysis;

  const handleAnalyze = () => {
    startAnalysis(async () => {
      const res = await fetch(`/api/ai/analyze-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailIDs: [email.id],
        }),
      });
      if (res.ok) {
        const data = await res.json();
        const emailAnalysis = data[0];
        if (emailAnalysis && emailAnalysis?.success) {
          setEmails((prev) => {
            return prev.map((e) => {
              if (e.id === email.id) {
                return { ...e, analysis: emailAnalysis.analysis };
              }
              return e;
            });
          });
        }
      }
    });
  };

  const handleAccordianClick = async () => {
    setIsOpen(!isOpen);
    if (!isAnalyzing && !isOpen && !analysis) {
      handleAnalyze();
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
                {/* <input
                  className="max-w-fit flex-shrink-0"
                  type="checkbox"
                  {...{ checked: selectedEmails.includes(email.id) }}
                  value={email.id}
                  onChange={handleEmailSelect}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                /> */}

                <div className="min-w-[15vw] flex-auto">
                  <div className="flex gap-3 justify-start items-center ">
                    {email?.analysis?.tag && !isOpen && (
                      <AILabel bgColor={`${email?.analysis?.tag?.color}`}>
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
            {analysis && !isAnalyzing ? (
              <>
                <div className="flex flex-col">
                  <Button
                    variant="hacker"
                    className="ml-1 p-2 rounded-full"
                    onClick={handleAnalyze}
                  >
                    <div className="">
                      <TbAnalyze className="scale-[1.5]" />
                    </div>
                  </Button>
                </div>
                <div className="min-w-[12.3vw] flex justify-start items-center ">
                  <div className="flex flex-col">
                    <p className="font-bold text-xs w-full">
                      {email?.analysis.isImportant
                        ? "Important"
                        : "Not Important"}
                    </p>
                    <div className="flex items-start justify-start gap-3 flex-wrap mt-2">
                      {email?.analysis?.tag && (
                        <AILabel
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
                  {email?.analysis.actions?.map(
                    (action: string, index: number) => (
                      <span key={index}>
                        {`${index + 1}) `}
                        {action}
                      </span>
                    )
                  )}
                </div>
              </>
            ) : (
              renderSkeleton()
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const renderSkeleton = () => {
  return (
    <div className="w-full flex gap-10">
      <div>
        <Skeleton className="ml-3 h-8 w-7 rounded-xl bg-primary/10" />
      </div>
      <div className="w-[12vw] flex flex-col gap-1 -ml-5">
        <Skeleton className="h-4 w-full rounded-md bg-primary/10" />
        <div className="flex gap-2">
          <Skeleton className="h-4 w-12 rounded-md bg-primary/10" />
          <Skeleton className="h-4 w-16 rounded-md bg-primary/10" />
        </div>
      </div>
      <div className="w-[20vw] flex-1 ml-1">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-full rounded-md bg-primary/10" />
          <Skeleton className="h-4 w-[75%] rounded-md bg-primary/10" />
        </div>
      </div>
      <div className="">
        <Skeleton className="h-4 w-[10vw] rounded-md bg-primary/10" />
      </div>
    </div>
  );
};
export default EmailListItem;
