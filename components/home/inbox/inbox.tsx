"use client";
import React from "react";
import EmailList from "@/components/home/inbox/email-list";
import Pagination from "@/components/home/inbox/pagination";
import { SkeletonLoader } from "@/components/home/inbox/skeleton";

import { useState, useEffect } from "react";

interface InboxProps {}
const Inbox: React.FC<InboxProps> = ({}) => {
  const [page, setPage] = useState<number>(1);
  const [pageTokens, setPageTokens] = useState<string[] | [null]>([null]);
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `/api/mail?page=${pageTokens[Math.max(page - 1, 0)]}`,
        {
          cache: "no-store",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setData(data.emails);
      setPageTokens((prev) => {
        prev[page] = data.nextPageToken;
        return prev;
      });
      setLoading(false);
    };
    getData();
  }, [page, pageTokens]);

  return (
    <div>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <EmailList emails={data} setEmails={setData}>
          <Pagination
            page={page}
            setPage={setPage}
            noNext={pageTokens[page] === undefined}
          />
        </EmailList>
      )}
    </div>
  );
};

export default Inbox;
