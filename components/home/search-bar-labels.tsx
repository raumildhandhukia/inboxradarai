import { useState } from "react";
import { predefinedLabels, labelSearchPlaceholders } from "@/data";
import { PlaceholdersAndVanishInput } from "@/components/ui/vanish-input";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { Label, Plan } from "@/types";
import { AILabel } from "./inbox/email-detail/email";
import { ScrollArea } from "../ui/scroll-area";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface SearchBarLabelsProps {
  labels: Label[];
  setLabels: (label: Label, callback: () => void) => void;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
  setNewLabel: React.Dispatch<React.SetStateAction<Label>>;
  plan: Plan;
}

const LABELS = predefinedLabels.map((label, index) => ({
  id: index.toString(),
  label: label.label,
  description: label.description,
  color: label.color,
  predefinedId: label.id,
  isActive: true,
}));

const SearchBarLabels: React.FC<SearchBarLabelsProps> = ({
  labels,
  setLabels,
  setCurrentTab,
  setNewLabel,
  plan,
}) => {
  const user = useCurrentUser();
  const [searchResults, setSearchResults] = useState<Label[]>(LABELS);
  const [searchBarValue, setSearchBarValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    let results = LABELS.filter((label) =>
      label.label.toLowerCase().includes(query)
    ).filter((label) => !labels.some((l) => l.label === label.label));
    setSearchResults(results);
    if (searchBarValue.length === 0) {
      setSearchResults([]);
    }
  };
  const onCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewLabel((prev) => {
      return { ...prev, label: searchBarValue };
    });
    setCurrentTab("create-label");
  };

  const SearchButton = () => (
    <button
      disabled={searchResults.length !== 0}
      type="submit"
      className="absolute right-2 top-1/2 z-50 -translate-y-1/2 rounded-full text-sm px-4 py-2 disabled:bg-gray-100 disabled:text-black text-white bg-black dark:bg-zinc-900 dark:disabled:bg-zinc-800 transition duration-200 flex items-center justify-center"
    >
      Create
    </button>
  );

  return (
    <div>
      <PlaceholdersAndVanishInput
        placeholders={labelSearchPlaceholders}
        onChange={handleChange}
        onSubmit={onCreate}
        searchBarValue={searchBarValue}
        setSearchBarValue={setSearchBarValue}
      >
        <SearchButton />
      </PlaceholdersAndVanishInput>
      {searchBarValue.length > 0 && (
        <ScrollArea className="h-28 mx-4 rounded-b-2xl border shadow-md">
          <div className="p-4">
            {searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <>
                  <div
                    onClick={() => {
                      setLabels(result, () => {
                        setSearchResults((prev) =>
                          prev.filter((label) => label.label !== result.label)
                        );
                      });
                    }}
                    key={index}
                    className="text-sm cursor-pointer hover:bg-gray-100 border-b py-1 px-3 overflow-hidden mb-2"
                  >
                    {result.label}
                    <span className="text-[11px] text-muted-foreground leading-tight">
                      {" - "}
                      {result.description}
                    </span>
                  </div>
                  {/* <Separator className="my-2" /> */}
                </>
              ))
            ) : (
              <div className="text-muted-foreground text-[12px] flex justify-center">
                <span>Create a personolized label </span>
              </div>
            )}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default SearchBarLabels;
