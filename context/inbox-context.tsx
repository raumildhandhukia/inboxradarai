import React, { createContext } from "react";

interface InboxContextType {
  emails: any[];
  setEmails: React.Dispatch<React.SetStateAction<any[]>>;
}

const InboxContextDefault: InboxContextType = {
  emails: [],
  setEmails: () => {},
};
export const InboxContext = createContext(InboxContextDefault);
interface InboxContextProviderProps {
  children: React.ReactNode;
}
const Context: React.FC<InboxContextProviderProps> = ({ children }) => {
  const [emails, setEmails] = React.useState<any[]>([]);
  return (
    <InboxContext.Provider value={{ emails, setEmails }}>
      {children}
    </InboxContext.Provider>
  );
};

export default Context;
