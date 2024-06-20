"use client";
import React, { useContext, useTransition, useEffect } from "react";
import { InboxContext } from "@/context/inbox-context";
import { TbAnalyze } from "react-icons/tb";
import { MdArrowBack } from "react-icons/md";
import FancyButton from "@/components/ui/fancy-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Email } from "@/types";
import { EmailSkeleton } from "@/components/home/inbox/skeleton";
import { decodeAndSanitizeHTML } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
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
  To,
  AILabel,
} from "@/components/home/inbox/email";
import { useRouter } from "next/navigation";
import Paginations from "@/components/home/inbox/pagination";
import { Button } from "@/components/ui/button";
import {
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface EmailListProps {
  params: { emailId: string };
}

const EmailDetail: React.FC<EmailListProps> = ({ params }) => {
  const emailId = params.emailId;
  const router = useRouter();
  const { emails } = useContext(InboxContext);
  const [email, setEmail] = React.useState<Email>();
  const [emailAnalysis, setEmailAnalysis] = React.useState<any>({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAnalyzing, startAnalysis] = useTransition();
  const [paginationActive, setPaginationActive] =
    React.useState<boolean>(false);

  useEffect(() => {
    const getEmail = async () => {
      const res = await fetch(`/api/mail/${emailId}`);
      if (res.ok) {
        const data = await res.json();
        data.body = decodeAndSanitizeHTML(data.body);
        setEmail(data);
        if (data.analysis) {
          setEmailAnalysis(data.analysis);
        }
        setIsLoading(false);
      } else {
        router.push("/inbox");
      }
    };
    getEmail();

    let found = emails.find((email) => email.id === emailId);
    if (found) {
      setPaginationActive(true);
    }
  }, [emailId, emails, router]);

  const handleAnalyze = async () => {
    startAnalysis(async () => {
      const res = await fetch(`/api/ai/analyze-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailIDs: [emailId],
        }),
      });
      if (res.ok) {
        const data = await res.json();
        const emailAnalysis = data[0];
        if (emailAnalysis.success) {
          setEmailAnalysis(emailAnalysis.analysis);
        }
      }
    });
  };

  const handleClickOnAI = () => {
    if (!emailAnalysis) {
      handleAnalyze();
    }
  };

  const handleBack = () => {
    router.push("/inbox");
  };

  const renderEmail = () => (
    <div className="p-5">
      <div className="flex items-start justify-between h-12">
        <div className="flex items-start gap-5">
          <FancyButton onClick={handleBack}>
            <div className="flex gap-3">
              <MdArrowBack className="scale-[1.5] mt-[5px]" />
              <p className="">Back</p>
            </div>
          </FancyButton>
          <FancyButton onClick={handleAnalyze}>
            <div className="flex gap-3">
              <TbAnalyze className="scale-[1.5] mt-[5px]" />
              <p className="">Analyze</p>
            </div>
          </FancyButton>
        </div>
        {paginationActive && <Pagination emailId={emailId} emails={emails} />}
      </div>
      <div className="pr-3 w-full border-t rounded-2xl shadow-lg p-5">
        {emailAnalysis && !isAnalyzing ? (
          <div
            className="text-lg text-md text-muted-foreground mx-10 bg-gray-100 rounded-3xl"
            onClick={handleClickOnAI}
          >
            <div className="p-5">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="font-bold text-black text-xl">
                    AI Insights
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="">
                      <div className="flex gap-5">
                        {emailAnalysis?.tag && (
                          <AILabel bgColor={emailAnalysis?.tag?.color}>
                            {emailAnalysis?.tag?.label}
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
                              <span className="font-bold">
                                Suggested Actions:
                              </span>
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
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        ) : (
          renderSkeleton()
        )}

        <h2 className="text-3xl font-bold ml-20 mt-5">{email?.subject}</h2>

        <div className="flex justify-between w-full mt-5">
          <div className="flex gap-5 ">
            <Avatar className="w-16 h-16">
              {/* <AvatarImage src={email.from.image} /> */}
              <AvatarFallback>NA</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center">
              <From from={email?.from || ""} type="full" />
              <To to={email?.to || ""} />
            </div>
          </div>
          <div>
            <DateTime date={email?.date || ""} type="detail" />
          </div>
        </div>
        <div className="mt-5 rounded-2xl overflow-hidden flex justify-center">
          <div
            className="!max-w-[50vw]"
            dangerouslySetInnerHTML={{
              __html: email?.body || "",
            }}
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full">
      {isLoading ? <EmailSkeleton /> : renderEmail()}
    </div>
  );
};

interface PaginationProps {
  emailId: string;
  emails: Email[];
}

const Pagination = ({ emailId, emails }: PaginationProps) => {
  const router = useRouter();
  const [emailIndex, setEmailIndex] = React.useState<number>();
  useEffect(() => {
    setEmailIndex(emails.findIndex((email) => email.id === emailId));
  }, [emailId, emails]);
  const Prev = () => (
    <button
      disabled={emailIndex === 0}
      className={`${
        emailIndex === 0 ? "text-muted-foreground cursot-default" : ""
      }`}
      onClick={() => {
        emailIndex !== undefined &&
          router.push(`/inbox/email/${emails[emailIndex - 1].id}`);
      }}
    >
      <PaginationPrevious noHover={emailIndex === 0} />
    </button>
  );
  const Next = () => (
    <button
      disabled={emailIndex === emails.length - 1}
      className={`${
        emailIndex === emails.length - 1
          ? "text-muted-foreground cursot-default"
          : ""
      }`}
      onClick={() => {
        emailIndex !== undefined &&
          router.push(`/inbox/email/${emails[emailIndex + 1].id}`);
      }}
    >
      <PaginationNext noHover={emailIndex === emails.length - 1} />
    </button>
  );
  return (
    <div className="flex gap-5">
      <Paginations
        prev={<Prev />}
        current={<PaginationLink noHover>{emailIndex}</PaginationLink>}
        next={<Next />}
      />
    </div>
  );
};

const renderSkeleton = () => (
  <div className="text-lg text-md text-muted-foreground mx-10 bg-gray-100 rounded-3xl">
    <div className="p-5">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-bold text-black text-xl">
            AI Insights
          </AccordionTrigger>
          <AccordionContent>
            <div className="">
              <div className="flex gap-5 ml-1">
                <Skeleton className="w-16 h-4" />

                <Skeleton className="w-24 h-4" />
              </div>
              <div className="mt-2 ml-1">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-[65%] h-4 mt-1" />
              </div>
              <div className="flex flex-col gap-1 ml-1 mt-2">
                <Skeleton className="w-36 h-4" />

                <Skeleton className="w-20 h-4" />
                <Skeleton className="w-24 h-4" />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </div>
);
export default EmailDetail;
