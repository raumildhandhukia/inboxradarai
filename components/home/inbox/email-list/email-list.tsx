"use client";
import React, { Dispatch, SetStateAction } from "react";
import { TbAnalyze } from "react-icons/tb";
import { MdDeselect } from "react-icons/md";
import { IoMdRefreshCircle } from "react-icons/io";
import FancyButton from "@/components/ui/fancy-button";
import EmailListItem from "@/components/home/inbox/email-list/email-list-item";
import { useRouter } from "next/navigation";

interface EmailListProps {
  emails: any[];
  refresh: () => void;
  children?: React.ReactNode;
}

const EmailList: React.FC<EmailListProps> = ({ emails, refresh, children }) => {
  const [selectedEmails, setSelectedEmails] = React.useState<string[]>([]);
  const router = useRouter();

  const handleEmailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    if (checked) {
      setSelectedEmails((prev) => [...prev, value]);
    } else {
      setSelectedEmails((prev) => prev.filter((id) => id !== value));
    }
  };

  const handleEmailClick = (emailId: string) => {
    router.push("/inbox/email/" + emailId);
  };

  return (
    <div className="p-5">
      <div className="flex items-start justify-between h-12">
        <div className="flex items-start gap-5">
          {/* {selectedEmails.length === 0 ? (
            <FancyButton onClick={refresh} className="!z-0">
              <div className="flex gap-3">
                <IoMdRefreshCircle className="scale-[1.5] mt-[5px] hover:animate-spin360" />
                <p className="">Reload</p>
              </div>
            </FancyButton>
          ) : (
            <>
              <FancyButton
                onClick={() => {
                  setSelectedEmails([]);
                }}
              >
                <div className="flex gap-3">
                  <p className="">Analyze</p>
                  <TbAnalyze className="scale-[1.5] mt-[5px]" />
                </div>
              </FancyButton>
              <FancyButton
                className="text-[12px] rounded-full w-max"
                onClick={() => {
                  setSelectedEmails([]);
                }}
              >
                <p>Clear Selected</p>
                <MdDeselect className="scale-[1.5]" />
              </FancyButton>
            </>
          )} */}
        </div>
        <div>{children}</div>
      </div>

      {emails.map((email) => (
        <EmailListItem
          email={email}
          key={email.id}
          selectedEmails={selectedEmails}
          setSelectedEmails={setSelectedEmails}
          handleEmailClick={handleEmailClick}
          handleEmailSelect={handleEmailSelect}
        />
      ))}
    </div>
  );
};

export default EmailList;
