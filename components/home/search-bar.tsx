"use client";
import React, {
  SetStateAction,
  useContext,
  useState,
  useRef,
  useEffect,
  Dispatch,
} from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { InboxContext } from "@/context/inbox-context";
import { Kbd } from "@nextui-org/kbd";

const SearchBar = ({ search }: { search: () => void }) => {
  const { query, setQuery } = useContext(InboxContext);

  useEffect(() => {
    const onKeydown = async (e: KeyboardEvent) => {
      if (e.key === "Enter" && query.length > 0) {
        search();
      }
    };
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, []);

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="w-full">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="pl-10 rounded-full"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          {query && query.length > 0 && (
            <button
              className="absolute right-1 top-1 bg-gray-200 px-2 rounded-full"
              onClick={search}
            >
              <Kbd keys={["enter"]}></Kbd>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
