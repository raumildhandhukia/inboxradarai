import React from "react";
import fs from "fs";
import path from "path";
import Nav from "@/components/public/nav";

const Policy = () => {
  const policyHtml = fs.readFileSync(
    path.join(process.cwd(), "app/cookie-policy/cookie.html"),
    "utf-8"
  );

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: policyHtml }} />
    </>
  );
};

export default Policy;
