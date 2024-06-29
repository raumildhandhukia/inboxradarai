"use client";
import React, { useContext, useEffect } from "react";
import { EmailSkeleton } from "@/components/home/inbox/skeleton";
import { decodeAndSanitizeHTML } from "@/lib/utils";
import { useRouter } from "next/navigation";
import EmailDetailHeader from "@/components/home/inbox/email-detail/header";
import AIInsights from "@/components/home/inbox/email-detail/ai-insights";
import { EmailDetailContext } from "@/context/email-detail-context";
import Detail from "@/components/home/inbox/email-detail/detail";

interface EmailListProps {
  params: { emailId: string };
}

const EmailDetail: React.FC<EmailListProps> = ({ params }) => {
  const emailId = params.emailId;
  const router = useRouter();
  const { setEmail, setEmailAnalysis } = useContext(EmailDetailContext);
  const [isLoading, setIsLoading] = React.useState(true);

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
  }, [emailId, router, setEmail, setEmailAnalysis]);

  return (
    <div className="h-full">
      {isLoading ? (
        <EmailSkeleton />
      ) : (
        <div className="p-5">
          <EmailDetailHeader emailId={emailId} />
          <div className="pr-3 w-full border-t rounded-2xl shadow-lg p-5">
            <div className="text-lg text-md text-muted-foreground mx-10 bg-gray-100 rounded-3xl">
              <AIInsights />
            </div>
            <Detail />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailDetail;
