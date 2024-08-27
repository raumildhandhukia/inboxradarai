import { ScrollArea } from "@/components/ui/scroll-area";
import { Email } from "@/types";
import MailListItem from "./mail-list-item";
import { useState } from "react";

interface MailListProps {
  items: Email[];
  inUnreadTab?: boolean;
}

export function MailList({ items, inUnreadTab }: MailListProps) {
  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-1 p-4 pt-0">
        {items.map((item) => (
          <MailListItem key={item.id} {...item} />
        ))}
      </div>
    </ScrollArea>
  );
}
