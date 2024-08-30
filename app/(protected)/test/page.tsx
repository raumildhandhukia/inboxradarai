"use client";
import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Editor } from "@/components/editor/text-editor";
interface TestProps {}

const Test = ({}: TestProps) => {
  const [content, setContent] = React.useState<string>("");

  return (
    <div className="p-10 h-screen">
      <Editor
        content={content}
        setContent={setContent}
        className="h-[80vh]"
        useAI={true}
      />
    </div>
  );
};

export default Test;
