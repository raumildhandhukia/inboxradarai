import React from "react";
import { Badge } from "@/components/ui/badge";

export function AILabel({
  children,
  bgColor,
}: {
  children: string;
  bgColor?: string;
}) {
  return (
    <Badge
      style={{
        backgroundColor: bgColor,
      }}
    >
      {children}
    </Badge>
  );
}
export const From = ({ from, type }: { from: string; type?: string }) => {
  // from will have this format Raumil D <raumild@gmail.com> we want to extract the name not email
  if (type === "email") {
    return <div>{from.split("<")[1].split(">")[0]}</div>;
  }
  return <div>{from.split("<")[0]}</div>;
};

export const Message = ({ sub, body }: { sub: string; body: string }) => {
  return (
    <p className="line-clamp-1">
      {sub && <strong className="font-bold">{sub + " - "} </strong>}
      <span className="text-muted-foreground">{body}</span>
    </p>
  );
};

export const DateTime = ({ date }: { date: Date }) => {
  const output = () => {
    const now = new Date();
    const given = new Date(date);
    const hhmm = new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const mmdd = new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const yymmdd = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    if (now.getUTCDate() === given.getUTCDate()) {
      return hhmm;
    } else {
      if (now.getUTCFullYear() === given.getUTCFullYear()) {
        return mmdd;
      } else {
        return yymmdd;
      }
    }
  };

  return <div>{output()}</div>;
};
