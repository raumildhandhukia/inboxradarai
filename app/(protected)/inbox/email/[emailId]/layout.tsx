import React from "react";

interface Props {
  children: React.ReactNode;
}
const EmailDetailLayout: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default EmailDetailLayout;
