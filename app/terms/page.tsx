import React from "react";
import fs from "fs";
import path from "path";

const Policy = () => {
  const policyHtml = fs.readFileSync(
    path.join(process.cwd(), "app/terms/terms.html"),
    "utf-8"
  );

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: policyHtml }} />
    </>
  );
};

export default Policy;
