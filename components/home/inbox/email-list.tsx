"use client";
import React, { Dispatch, SetStateAction } from "react";
import { TbAnalyze } from "react-icons/tb";
import { MdDeselect } from "react-icons/md";
import { IoMdRefreshCircle } from "react-icons/io";
import FancyButton from "@/components/ui/fancy-button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DateTime,
  Message,
  From,
  AILabel,
} from "@/components/home/inbox/email";

interface EmailListProps {
  emails: any[];
  setEmails: Dispatch<SetStateAction<any[]>>;
  children?: React.ReactNode;
}

const EmailList: React.FC<EmailListProps> = ({
  emails,
  setEmails,
  children,
}) => {
  const [selectedEmails, setSelectedEmails] = React.useState<string[]>([]);

  const handleEmailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    if (checked) {
      setSelectedEmails((prev) => [...prev, value]);
    } else {
      setSelectedEmails((prev) => prev.filter((id) => id !== value));
    }
  };

  return (
    <div className="p-5">
      <div className="flex items-start justify-between h-12">
        <div className="flex items-start gap-5">
          {selectedEmails.length === 0 ? (
            <FancyButton>
              <div className="flex gap-3">
                <IoMdRefreshCircle className="scale-[1.5] mt-[5px]" />
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
          )}
        </div>
        <div>{children}</div>
      </div>
      <div className="overflow-y-scroll max-h-[77vh] pr-3">
        <Table>
          <TableBody>
            {emails.map((email) => {
              return (
                <TableRow key={email.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      {...{ checked: selectedEmails.includes(email.id) }}
                      value={email.id}
                      onChange={handleEmailSelect}
                    />
                  </TableCell>
                  <TableCell>
                    <AILabel bgColor={`${email.AILabel.color}`}>
                      {email.AILabel.text}
                    </AILabel>
                  </TableCell>
                  <TableCell className="max-w-[15vw]">
                    <From from={email.from} />
                  </TableCell>
                  <TableCell className="max-w-[40vw]">
                    <Message sub={email.subject} body={email.snippet} />
                  </TableCell>
                  <TableCell className="min-w-[7vw] text-right !text-[13px]">
                    <DateTime date={email.date} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EmailList;
