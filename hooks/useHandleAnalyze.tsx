import { EmailDetailContext } from "../context/email-detail-context";
import { InboxContext } from "../context/inbox-context";
import { useContext } from "react";

export const useHandleAnalyze = () => {
  const {
    setEmailAnalysis,
    setCooldown,
    setCooldownTime,
    setEmailsLeft,
    startTransition,
  } = useContext(EmailDetailContext);
  const { setEmails } = useContext(InboxContext);

  const handleAnalyze = async (
    emailID: string,
    accountId: number,
    findExisting?: boolean,
    shouldSetEmailAnalysis?: boolean
  ) => {
    let limitExceeded: boolean;
    const analyzeEmail = async () => {
      const res = await fetch(`/api/ai/analyze-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailIDs: [emailID],
          accountId,
          findExisting: !!findExisting,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const emailAnalysis = data[0];
        if (emailAnalysis.success) {
          shouldSetEmailAnalysis && setEmailAnalysis(emailAnalysis.analysis);
          setEmails((emails) => {
            return emails.map((email) => {
              if (email.id === emailID) {
                return {
                  ...email,
                  analysis: emailAnalysis.analysis,
                };
              }
              return email;
            });
          });
        }

        if (emailAnalysis.limitExceeded) {
          limitExceeded = true;
          setEmailAnalysis(null);
          setCooldown(true);
          // setCooldownTime(emailAnalysis.timeLeft);
          setEmailsLeft(true);
          setEmails((prev) => {
            return prev.map((e) => {
              if (e.id === emailID) {
                return {
                  ...e,
                  analysis: null,
                  limitExceeded: true,
                  timeLeft: emailAnalysis.timeLeft,
                  emailsLeft: emailAnalysis.emailsLeft > 0,
                };
              }
              return e;
            });
          });
        }
      }
      return limitExceeded;
    };

    // Use startTransition to handle the state transition

    // Call the asynchronous function inside startTransition
    limitExceeded = await analyzeEmail();

    return limitExceeded;
  };

  return handleAnalyze;
};
