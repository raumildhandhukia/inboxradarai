"use client";
import React, { useContext, useTransition, useEffect } from "react";
import { InboxContext } from "@/context/inbox-context";
import { TbAnalyze } from "react-icons/tb";
import { MdArrowBack } from "react-icons/md";
import FancyButton from "@/components/ui/fancy-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Email } from "@/types";
import { EmailSkeleton } from "@/components/home/inbox/skeleton";
import DOMPurify from "dompurify";
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
  const [isLoading, startTransition] = useTransition();
  const [paginationActive, setPaginationActive] =
    React.useState<boolean>(false);

  useEffect(() => {
    const getEmail = async () => {
      const res = await fetch(`/api/mail/${emailId}`);
      if (res.ok) {
        const data = await res.json();
        data.body = Buffer.from(data.body, "base64").toString("utf-8");
        setEmail(data);
      } else {
        router.push("/inbox");
      }
    };
    startTransition(async () => {
      await getEmail();
    });
    getEmail();
    let found = emails.find((email) => email.id === emailId);
    if (found) {
      setPaginationActive(true);
      setEmail(found);
    }
  }, [emailId, emails, router]);

  const handleBack = () => {
    router.push("/inbox");
  };
  const Pagination = () => {
    const router = useRouter();
    const [emailIndex, setEmailIndex] = React.useState<number>();
    useEffect(() => {
      setEmailIndex(emails.findIndex((email) => email.id === emailId));
    }, []);
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
  if (isLoading) {
    return <EmailSkeleton />;
  }
  return (
    <div className="p-5">
      <div className="flex items-start justify-between h-12">
        <div className="flex items-start gap-5">
          <FancyButton onClick={handleBack}>
            <div className="flex gap-3">
              <MdArrowBack className="scale-[1.5] mt-[5px]" />
              <p className="">Back</p>
            </div>
          </FancyButton>
          <FancyButton
            onClick={() => {
              console.log(email);
            }}
          >
            <div className="flex gap-3">
              <TbAnalyze className="scale-[1.5] mt-[5px]" />
              <p className="">Analyze</p>
            </div>
          </FancyButton>
        </div>
        {paginationActive && <Pagination />}
      </div>
      <div className="pr-3 w-full border-t rounded-2xl shadow-lg p-5">
        <h2 className="text-3xl font-bold ml-20">{email?.subject}</h2>
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
              __html: DOMPurify.sanitize(email?.body || ""),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default EmailDetail;
