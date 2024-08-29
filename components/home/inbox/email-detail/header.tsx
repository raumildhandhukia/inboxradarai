import FancyButton from "@/components/ui/fancy-button";
import React from "react";
import { MdArrowBack } from "react-icons/md";
import { TbAnalyze } from "react-icons/tb";
import Pagination from "./pagination";
import { Email } from "@/types";
import { useContext } from "react";
import { EmailDetailContext } from "@/context/email-detail-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
const EmailDetailHeader = ({ emailId }: { emailId: string }) => {
  const { isAnalyzing } = useContext(EmailDetailContext);
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <div className="flex items-start justify-between h-12">
      <div className="flex items-start gap-5">
        <Button onClick={handleBack} variant="hacker">
          <div className="flex gap-2 leading-3">
            <MdArrowBack className="scale-[1.1]" />
            <p className="mt-[1px]">Back</p>
          </div>
        </Button>
        {/* {!isAnalyzing && (
          <Button onClick={handleAnalyze} variant="hacker">
            <div className="flex gap-2 leading-3">
              <TbAnalyze className="scale-[1.1]" />
              <p className="mt-[1px]">Analyze</p>
            </div>
          </Button>
        )} */}
      </div>
      <Pagination emailId={emailId} />
    </div>
  );
};

export default EmailDetailHeader;
