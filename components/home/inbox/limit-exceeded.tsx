import { Button } from "@/components/ui/button";
import { useState, useEffect, useContext } from "react";
import { TbAnalyze } from "react-icons/tb";
// import { InboxContext } from "@/context/inbox-context";
// import { EmailDetailContext } from "@/context/email-detail-context";

interface LimitExceededProps {
  handleAnalyze: () => void;
  removeCooldown: () => void;
  emailsLeft: boolean;
}

const LimitExceeded: React.FC<LimitExceededProps> = ({
  handleAnalyze,
  removeCooldown,
  emailsLeft,
}) => {
  // const { selectedAccount } = useContext(InboxContext);
  // const { cooldownTime, setCooldownTime } = useContext(EmailDetailContext);
  // useEffect(() => {
  //   if (cooldownTime > 0) {
  //     setTimeout(() => setCooldownTime(cooldownTime - 1), 1000);
  //   } else {
  //     if (emailsLeft) {
  //       removeCooldown();
  //     }
  //   }
  // }, [cooldownTime]);

  return (
    <div className="flex justify-center items-center gap-5 px-2">
      {
        <>
          <Button
            variant="hacker"
            className="w-4 rounded-full"
            // disabled={cooldownTime > 0}
            onClick={handleAnalyze}
          >
            <div>
              <TbAnalyze className="scale-[1.5]" />
            </div>
          </Button>
          <p className="">
            You have exceeded the limit of 15 requests per 60 seconds. Please
            wait for 60 seconds before making your next request.
          </p>
        </>
      }
    </div>
  );
};

export default LimitExceeded;
