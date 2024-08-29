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
    emailAddress: string,
    findExisting?: boolean
  ) => {
    const analyzeEmail = async () => {
      const res = await fetch(`/api/ai/analyze-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailIDs: [emailID],
          emailAddress,
          findExisting: !!findExisting,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const emailAnalysis = data[0];
        if (emailAnalysis.success) {
          setEmailAnalysis(emailAnalysis.analysis);
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
          setEmailAnalysis(null);
          setCooldown(true);
          setCooldownTime(emailAnalysis.timeLeft);
          setEmailsLeft(emailAnalysis.emailsLeft > 0);
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
    };

    // Use startTransition to handle the state transition
    startTransition(async () => {
      // Call the asynchronous function inside startTransition
      await analyzeEmail();
    });
  };

  return handleAnalyze;
};