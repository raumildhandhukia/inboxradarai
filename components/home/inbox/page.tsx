"use client";
// import Inbox from "@/components/home/inbox/inbox";
import { InboxContext } from "@/context/inbox-context";
import { useRouter } from "next/navigation";
import React, { useContext, useTransition, useState, useEffect } from "react";
// import EmailList from "@/components/home/inbox/email-list/email-list";
import Paginations from "@/components/home/inbox/pagination";
import { EmailListSkeleton } from "@/components/home/inbox/skeleton";
import {
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useSearchParams } from "next/navigation";
export default function Page({ inboxes }: { inboxes: any[] }) {
  const searchParams = useSearchParams();
  const inboxType = searchParams.get("type");
  const labelName = searchParams.get("label");
  const [refreshEmails, setRefreshEmails] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [pageTokens, setPageTokens] = useState<string[] | [null]>([null]);
  const { emails, setEmails } = useContext(InboxContext);

  const [isLoading, startTransition] = useTransition();

  const handleRefresh = () => {
    setRefreshEmails(true);
  };

  let URL = `/api/mail?page=${pageTokens[Math.max(page - 1, 0)]}`;
  if (inboxType) {
    URL += `&type=${inboxType}`;
  } else if (labelName) {
    URL += `&label=${labelName}`;
  }

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        setEmails(data.emails);
        setPageTokens((prev) => {
          prev[page] = data.nextPageToken;
          return prev;
        });
      }
    };
    if (refreshEmails) {
      startTransition(async () => {
        await getData();
      });
      setRefreshEmails(false);
    }
    getData();
  }, [page, pageTokens, setEmails, refreshEmails, URL]);
  const Prev = () => (
    <button
      disabled={page === 1}
      className={`${page === 1 ? "text-muted-foreground cursot-default" : ""}`}
      onClick={() => {
        setPage((prev) => Math.max(prev - 1, 1));
      }}
    >
      <PaginationPrevious noHover={page === 1} />
    </button>
  );
  const Current = () => <PaginationLink noHover>{page}</PaginationLink>;
  const Next = () => (
    <button
      disabled={pageTokens[page] === undefined}
      className={`${
        pageTokens[page] === undefined ? "text-muted cursot-default" : ""
      }`}
      onClick={() => {
        setPage((prev) => prev + 1);
      }}
    >
      <PaginationNext noHover={pageTokens[page] === undefined} />
    </button>
  );
  return (
    <div>
      {isLoading ? (
        <EmailListSkeleton />
      ) : (
        <div className="mx-5 border-t rounded-3xl shadow-lg">
          {/* <EmailList emails={emails} refresh={handleRefresh}>
            <Paginations
              prev={<Prev />}
              current={<Current />}
              next={<Next />}
            />
          </EmailList> */}
        </div>
      )}
    </div>
  );
}
