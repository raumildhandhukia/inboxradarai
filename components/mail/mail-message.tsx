"use client";
import React, { useState, useContext, useTransition } from "react";
import { RiExpandDiagonalFill } from "react-icons/ri";
import { GrClear } from "react-icons/gr";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import EmailInputs from "@/components/mail/mail-message-email";
import { InboxContext } from "@/context/inbox-context";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Editor from "@/components/editor/text-editor";
interface MessageProps {
  defaultto?: string[];
  defaultcc?: string[];
  defaultbcc?: string[];
  defaultsubject?: string;
  defaultmessage?: string;
}

const Message: React.FC<MessageProps> = ({
  defaultbcc,
  defaultcc,
  defaultmessage,
  defaultsubject,
  defaultto,
}) => {
  const { toast } = useToast();
  const [to, setTo] = useState<string[]>(defaultto || []);
  const [cc, setCc] = useState<string[]>(defaultcc || []);
  const [bcc, setBcc] = useState<string[]>(defaultbcc || []);
  const [subject, setSubject] = useState<string>(defaultsubject || "");
  const [message, setMessage] = useState<string>(defaultmessage || "");
  const { composeMessage, setComposeMessage, selectedAccount } =
    useContext(InboxContext);
  const [isLoading, startTransition] = useTransition();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [dialogueStyle, setDialogueStyle] = useState({
    width: "50%",
    height: "auto",
    minWidth: "50%",
  });

  const handleSendMessage = () => {
    const send = async () => {
      const res = await fetch("/api/mail/send", {
        method: "POST",
        body: JSON.stringify({
          from: selectedAccount,
          to,
          cc,
          bcc,
          subject,
          message,
          account: selectedAccount,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        clearMessageProps();
        setComposeMessage(false);
        toast({
          title: "Sent",
          description: "Your message has been sent successfully",
        });
      } else {
        toast({
          title: "Could not send",
          description: "Your message could not be sent",
        });
      }
    };
    startTransition(send);
  };

  const clearMessageProps = () => {
    setTo([]);
    setCc([]);
    setBcc([]);
    setSubject("");
    setMessage("");
  };
  const handleExpandButton = () => {
    setIsExpanded(!isExpanded);
    setDialogueStyle(
      isExpanded
        ? { width: "50%", height: "auto", minWidth: "50%" }
        : { minWidth: "80%", height: "90vh", width: "80%" }
    );
  };
  return (
    <Dialog open={composeMessage} onOpenChange={setComposeMessage}>
      <DialogContent
        className="h-max flex flex-col justify-between"
        style={dialogueStyle}
      >
        <div className="">
          <DialogHeader>
            <div className="flex items-center justify-between relative">
              <div>
                <DialogTitle className="text-black">New Message</DialogTitle>
                <DialogDescription>Compose a new message</DialogDescription>
              </div>
              <div className="absolute right-3 -top-2 flex gap-2">
                <button onClick={clearMessageProps}>
                  <GrClear />
                </button>
                <button onClick={handleExpandButton}>
                  <RiExpandDiagonalFill />
                </button>
              </div>
            </div>
          </DialogHeader>
          <div id="message-form" className="h-full p-4 space-y-3">
            <EmailInputs
              to={to}
              cc={cc}
              bcc={bcc}
              setTo={setTo}
              setBcc={setBcc}
              setCc={setCc}
            />
            <div className="border rounded-md flex items-center gap-2 px-2 h-max">
              <p className="text-xs text-muted-foreground">Subject</p>
              <input
                className="border-none h-5 focus:outline-none text-xs w-full"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
              />
            </div>
            <Editor
              content={message}
              setContent={setMessage}
              className={`border-none focus:outline-none text-xs w-full p-1 ${
                isExpanded ? "h-[55vh]" : "h-72"
              } overflow-scroll`}
            />

            {/* <div className="border rounded-md flex items-center h-max gap-2 px-2">
           <textarea
                id="message"
                placeholder="start typing your message..."
                className={`border-none focus:outline-none text-xs w-full p-1 ${
                  isExpanded ? "max-h-[50vh]" : "max-h-64"
                } overflow-scroll`}
                value={message}
                rows={isExpanded ? 40 : 8}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              /> 
            </div>*/}
          </div>
        </div>
        <DialogFooter className="">
          <Button onClick={handleSendMessage} disabled={isLoading}>
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Message;
