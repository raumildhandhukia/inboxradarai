import {
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import { Email } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Paginations from "../pagination";
import React, { useContext } from "react";
import { InboxContext } from "@/context/inbox-context";

interface PaginationProps {
  emailId: string;
}
const Pagination = ({ emailId }: PaginationProps) => {
  const router = useRouter();
  const [paginationActive, setPaginationActive] = useState<boolean>(false);
  const { emails } = useContext(InboxContext);
  const [emailIndex, setEmailIndex] = useState<number>();
  useEffect(() => {
    let index = emails.findIndex((email) => email.id === emailId);
    if (index >= 0) {
      setPaginationActive(true);
      setEmailIndex(index);
    }
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
    <>
      {paginationActive && (
        <div className="flex gap-5">
          <Paginations
            prev={<Prev />}
            current={<PaginationLink noHover>{emailIndex}</PaginationLink>}
            next={<Next />}
          />
        </div>
      )}
    </>
  );
};

export default Pagination;
