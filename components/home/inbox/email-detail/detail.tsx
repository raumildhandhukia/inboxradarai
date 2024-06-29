import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import React, { useContext } from "react";
import { From, To, DateTime } from "./email";
import { EmailDetailContext } from "@/context/email-detail-context";

const EmailDetail = () => {
  const { email } = useContext(EmailDetailContext);
  return (
    <div>
      <h2 className="text-3xl font-bold ml-20 mt-5">{email?.subject}</h2>

      <div className="flex justify-between w-full mt-5">
        <div className="flex gap-5 ">
          <Avatar className="w-16 h-16">
            {/* <AvatarImage src={email.from.image} /> */}
            <AvatarFallback>NA</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center">
            <From from={email?.from || ""} type="full" />
            <To to={email?.to || ""} />
          </div>
        </div>
        <div>
          <DateTime date={email?.date || ""} type="detail" />
        </div>
      </div>
      <div className="mt-5 rounded-2xl overflow-hidden flex justify-center">
        <div
          className="!max-w-[50vw]"
          dangerouslySetInnerHTML={{
            __html: email?.body || "",
          }}
        ></div>
      </div>
    </div>
  );
};

export default EmailDetail;
