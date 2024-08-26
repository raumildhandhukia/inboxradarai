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

const SearchBar = ({}: {}) => {
  const { query, setQuery } = useContext(InboxContext);

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
