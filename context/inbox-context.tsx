import React, { createContext } from "react";

interface InboxContextType {
  emails: any[];
  setEmails: React.Dispatch<React.SetStateAction<any[]>>;
  test: any[];
  setTest: React.Dispatch<React.SetStateAction<any[]>>;
}

const InboxContextDefault: InboxContextType = {
  emails: [],
  setEmails: () => {},
  test: [],
  setTest: () => {},
};
export const InboxContext = createContext(InboxContextDefault);
interface InboxContextProviderProps {
  children: React.ReactNode;
}
const Context: React.FC<InboxContextProviderProps> = ({ children }) => {
  const [emails, setEmails] = React.useState<any[]>([]);
  const [test, setTest] = React.useState<any[]>(["ka naga"]);
  return (
    <InboxContext.Provider value={{ emails, setEmails, test, setTest }}>
      {children}
    </InboxContext.Provider>
  );
};

export default Context;
