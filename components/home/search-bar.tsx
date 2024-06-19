"use client";
import React from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/vanish-input";
import FancyButton from "@/components/ui/fancy-button";

const SearchBar = () => {
  const placeholders = [
    "Search for a user",
    "Search for a message",
    "Search for a group",
  ];
  return (
    <div className="fixed ml-10 h-[10vh] flex items-center justify-center gap-4">
      <div className=" w-[50vw]">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={() => {}}
          onSubmit={() => {}}
        />
      </div>
      <FancyButton className="text-[13px]">From</FancyButton>
      <FancyButton className="text-[13px]">To</FancyButton>
      <FancyButton className="text-[13px]">Date</FancyButton>
    </div>
  );
};

export default SearchBar;
