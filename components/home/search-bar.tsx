"use client";
import { EmailSearchResultProps } from "@/types";
import React, { SetStateAction, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { DateTime } from "./inbox/email-detail/email";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [results, setResults] = useState<EmailSearchResultProps[]>([]);
  const [query, setQuery] = useState<string>("");

  const getResults = async (query: string) => {
    const res = await fetch(`/api/mail/search?query=${query}`);
    if (res.status === 201) {
      return await res.json();
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.length > 0) {
      const res = await getResults(e.target.value);
      setResults(res);
    } else {
      setResults([]);
    }
  };

  const EmailSearchResult = ({
    id,
    sender,
    senderEmail,
    subject,
    date,
    snippet,
    setQuery,
  }: EmailSearchResultProps & {
    setQuery: React.Dispatch<SetStateAction<string>>;
  }) => {
    const router = useRouter();
    const handleEmailSearchResultClick = () => {
      setQuery("");
      router.push(`/inbox/email/${id}`);
    };
    return (
      <div
        className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50"
        onClick={handleEmailSearchResultClick}
      >
        <div className="flex items-center gap-2">
          <p className="font-semibold">{sender}</p>
          <p className="text-sm text-gray-500">{senderEmail}</p>
          <p className="text-sm text-gray-900">
            <DateTime date={date} />
          </p>
        </div>
        <p className="font-medium">{subject}</p>

        <p className="text-sm text-gray-500 overflow-hidden overflow-ellipsis max-h-10">
          {snippet}
        </p>
      </div>
    );
  };

  return (
    <div className="fixed ml-10 h-[10vh] flex items-center justify-center gap-4">
      <div className="w-[50vw]">
        <form>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-10 rounded-full"
              value={query}
              onChange={handleChange}
            />
          </div>

          {query.length > 0 && (
            <div className="z-50 absolute left-3 w-[48vw] flex flex-col gap-1 border-b border-l border-r rounded-b-2xl px-4 py-2 bg-white max-h-96 overflow-scroll">
              {results.map((result, index) => (
                <EmailSearchResult
                  key={index}
                  id={result.id}
                  setQuery={setQuery}
                  sender={result.sender}
                  senderEmail={result.senderEmail}
                  subject={result.subject}
                  date={result.date}
                  snippet={result.snippet}
                />
              ))}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
