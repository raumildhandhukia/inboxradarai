import { Account, Email } from "@/types";
import React, { createContext, useState } from "react";

interface InboxContextType {
  emails: any[];
  setEmails: React.Dispatch<React.SetStateAction<any[]>>;
  selectedAccount: Account | null;
  setSelectedAccount: React.Dispatch<React.SetStateAction<Account | null>>;
  selectedEmail: Email | null;
  setSelectedEmail: React.Dispatch<React.SetStateAction<Email | null>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  isMessageBoxOpen: boolean;
  setIsMessageBoxOpen: React.Dispatch<React.SetStateAction<boolean>>;
  composeMessage: boolean;
  setComposeMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

const InboxContextDefault: InboxContextType = {
  emails: [],
  setEmails: () => {},
  selectedAccount: null,
  setSelectedAccount: () => {},
  selectedEmail: null,
  setSelectedEmail: () => {},
  query: "",
  setQuery: () => {},
  isMessageBoxOpen: false,
  setIsMessageBoxOpen: () => {},
  composeMessage: false,
  setComposeMessage: () => {},
};
export const InboxContext = createContext(InboxContextDefault);
interface InboxContextProviderProps {
  children: React.ReactNode;
}
const Context: React.FC<InboxContextProviderProps> = ({ children }) => {
  const [emails, setEmails] = useState<any[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [query, setQuery] = useState<string>("");
  const [isMessageBoxOpen, setIsMessageBoxOpen] = useState<boolean>(false);
  const [composeMessage, setComposeMessage] = useState<boolean>(false);

  return (
    <InboxContext.Provider
      value={{
        emails,
        setEmails,
        selectedAccount,
        setSelectedAccount,
        selectedEmail,
        setSelectedEmail,
        query,
        setQuery,
        isMessageBoxOpen,
        setIsMessageBoxOpen,
        composeMessage,
        setComposeMessage,
      }}
    >
      {children}
    </InboxContext.Provider>
  );
};

export default Context;
