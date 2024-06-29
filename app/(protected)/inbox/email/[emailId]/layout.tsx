import React from "react";
import EmailDetailContextProvider from "@/context/email-detail-context-provider";
import InboxContextProvider from "@/context/inbox-context-provider";

interface Props {
  children: React.ReactNode;
}
const EmailDetailLayout: React.FC<Props> = ({ children }) => {
  return <EmailDetailContextProvider>{children}</EmailDetailContextProvider>;
};

export default EmailDetailLayout;
