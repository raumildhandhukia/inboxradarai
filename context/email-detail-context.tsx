import {
  Dispatch,
  SetStateAction,
  TransitionStartFunction,
  createContext,
  useContext,
  useState,
  useTransition,
} from "react";
import { Email, EmailAnalysis } from "@/types";

interface EmailDetailContextType {
  cooldown: boolean;
  setCooldown: Dispatch<SetStateAction<boolean>>;
  cooldownTime: number;
  setCooldownTime: React.Dispatch<React.SetStateAction<number>>;
  emailsLeft: boolean;
  setEmailsLeft: React.Dispatch<React.SetStateAction<boolean>>;
  isAnalyzing: boolean;
  startTransition: TransitionStartFunction;
  email: Email | null;
  setEmail: Dispatch<SetStateAction<Email | null>>;
  emailAnalysis: EmailAnalysis | null;
  setEmailAnalysis: Dispatch<SetStateAction<EmailAnalysis | null>>;
  handleAnalyze: (
    emailID: string,
    accountId: number,
    findExisting?: boolean
  ) => void;
}

const defaultContext: EmailDetailContextType = {
  cooldown: false,
  setCooldown: () => {},
  cooldownTime: 0,
  setCooldownTime: () => {},
  emailsLeft: true,
  setEmailsLeft: () => {},
  isAnalyzing: false,
  startTransition: () => {},
  email: null,
  setEmail: () => {},
  emailAnalysis: null,
  setEmailAnalysis: () => {},
  handleAnalyze: () => {},
};

export const EmailDetailContext = createContext(defaultContext);

interface EmailDetailContextProviderProps {
  children: React.ReactNode;
}

const Context: React.FC<EmailDetailContextProviderProps> = ({ children }) => {
  const [cooldown, setCooldown] = useState<boolean>(false);
  const [cooldownTime, setCooldownTime] = useState<number>(0);
  const [emailsLeft, setEmailsLeft] = useState<boolean>(true);
  const [isAnalyzing, startTransition] = useTransition();
  const [email, setEmail] = useState<Email | null>(null);
  const [emailAnalysis, setEmailAnalysis] = useState<EmailAnalysis | null>(
    null
  );

  const handleAnalyze = async (
    emailID: string,
    accountId: number,
    findExisting?: boolean
  ) => {
    startTransition(async () => {
      const res = await fetch(`/api/ai/analyze-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailIDs: [emailID],
          accountId: accountId,
          findExisting: !!findExisting,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        const emailAnalysis = data[0];
        if (emailAnalysis.success) {
          setEmailAnalysis(emailAnalysis.analysis);
        }

        if (emailAnalysis.limitExceeded) {
          setEmailAnalysis(null);
          setCooldown(true);
          setCooldownTime(emailAnalysis.timeLeft);
          setEmailsLeft(emailAnalysis.emailsLeft > 0);
        }
      }
    });
  };

  return (
    <EmailDetailContext.Provider
      value={{
        cooldown,
        setCooldown,
        cooldownTime,
        setCooldownTime,
        emailsLeft,
        setEmailsLeft,
        isAnalyzing,
        startTransition,
        email,
        setEmail,
        emailAnalysis,
        setEmailAnalysis,
        handleAnalyze,
      }}
    >
      {children}
    </EmailDetailContext.Provider>
  );
};

export default Context;
