import FancyButton from "@/components/ui/fancy-button";
import React from "react";
import { MdArrowBack } from "react-icons/md";
import { TbAnalyze } from "react-icons/tb";
import Pagination from "./pagination";
import { Email } from "@/types";
import { useContext } from "react";
import { EmailDetailContext } from "@/context/email-detail-context";
import { useRouter } from "next/navigation";
const EmailDetailHeader = ({ emailId }: { emailId: string }) => {
  const { isAnalyzing, handleAnalyze } = useContext(EmailDetailContext);
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <div className="flex items-start justify-between h-12">
      <div className="flex items-start gap-5">
        <FancyButton onClick={handleBack}>
          <div className="flex gap-3">
            <MdArrowBack className="scale-[1.5] mt-[5px]" />
            <p className="">Back</p>
          </div>
        </FancyButton>
        {!isAnalyzing && (
          <FancyButton onClick={handleAnalyze}>
            <div className="flex gap-3">
              <TbAnalyze className="scale-[1.5] mt-[5px]" />
              <p className="">Analyze</p>
            </div>
          </FancyButton>
        )}
      </div>
      <Pagination emailId={emailId} />
    </div>
  );
};

export default EmailDetailHeader;
