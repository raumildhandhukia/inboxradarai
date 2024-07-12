import React from "react";
import { Badge } from "@/components/ui/badge";
import { MdClose } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export function AILabel({
  children,
  bgColor,
  className,
  deleteLabel,
  isActive,
}: {
  children: React.ReactNode;
  bgColor?: string;
  className?: string;
  deleteLabel?: () => void;
  isActive?: boolean;
}) {
  return (
    <Badge
      className={`${className} !max-h-5 ${
        isActive ? "shadow-xl transform translate-y-[-5px] scale-[105%]" : ""
      }`}
      style={{
        backgroundColor: bgColor,
      }}
    >
      <div className="flex gap-2 leading-3 text-black overflow-hidden">
        {children}
        {deleteLabel && (
          <MdClose
            onClick={deleteLabel}
            className="cursor-pointer text-red-900"
          />
        )}
      </div>
    </Badge>
  );
}
export const From = ({
  from,
  type,
  className,
}: {
  from: string;
  type?: string;
  className?: string;
}) => {
  // from will have this format Raumil D <raumild@gmail.com> we want to extract the name not email
  if (type === "email") {
    return (
      <div className={`${className}`}>{from.split("<")[1].split(">")[0]}</div>
    );
  }
  if (type === "full") {
    return <div className={`${className}`}>{from}</div>;
  }
  return (
    <div className={`${className} text-gray-800 dark:text-white`}>
      {from.split("<")[0]}
    </div>
  );
};
export const To = ({ to, type }: { to: string; type?: string }) => {
  return <div className="text-muted-foreground">to: {to.split("<")[0]}</div>;
};
export const Message = ({ sub, body }: { sub: string; body: string }) => {
  return (
    <p className="line-clamp-1">
      {sub && <strong className="font-bold">{sub + " - "} </strong>}
      <span className="text-muted-foreground">{body}</span>
    </p>
  );
};

export const DateTime = ({ date, type }: { date: string; type?: string }) => {
  const output = () => {
    const now = new Date();
    const given = new Date(date);
    let hhmm = new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    let mmdd = new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const yymmdd = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    if (now.getUTCDate() === given.getUTCDate()) {
      if (type === "detail") {
        const differenceOfTimeInHourAndMinutes = Math.abs(
          now.getTime() - given.getTime()
        );
        const differenceInMinutes = differenceOfTimeInHourAndMinutes / 60000;
        if (differenceInMinutes < 60) {
          hhmm += ` (${Math.floor(differenceInMinutes)} minutes ago)`;
        }
        const differenceInHours = differenceInMinutes / 60;
        if (differenceInHours < 24) {
          hhmm += ` (${Math.floor(differenceInHours)} hours ago)`;
        }
      }
      return hhmm;
    } else {
      if (now.getUTCFullYear() === given.getUTCFullYear()) {
        const differenceInDays = Math.abs(
          now.getUTCDate() - given.getUTCDate()
        );
        if (type === "detail") {
          if (differenceInDays === 1) {
            mmdd += ` (Yesterday ${hhmm})`;
          }
          if (differenceInDays > 1) {
            mmdd += ` (${differenceInDays} days ago)`;
          }
        }
        return mmdd;
      } else {
        return yymmdd;
      }
    }
  };

  return <div>{output()}</div>;
};
