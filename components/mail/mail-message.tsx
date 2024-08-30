"use client";
import React, { useState, useContext, useTransition, useEffect } from "react";
import { RiExpandDiagonalFill } from "react-icons/ri";
import { GrClear } from "react-icons/gr";
import { Bot, BotOff, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import EmailInputs from "@/components/mail/mail-message-email";
import { InboxContext } from "@/context/inbox-context";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "../ui/separator";
import Editor from "@/components/editor/text-editor";
import { ScrollArea } from "../ui/scroll-area";
import AISwitch from "./ai-switch";
import { Switch } from "@nextui-org/react";
import { Label } from "../ui/label";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { PLANS } from "@/config/app";
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
  const [isAIselected, setIsAIselected] = useState<boolean>(false);
  const user = useCurrentUser();
  useEffect(() => {
    if (user) {
      const plan = PLANS.find((p) =>
        p.price.priceIds.production.includes(user.stripePriceId)
      );
      if (plan?.contentAi) {
        setIsAIselected(true);
      }
    }
  }, [user]);

  const handleAIButtonClick = () => {
    if (isAIselected) {
      setIsAIselected(false);
    } else {
      if (user) {
        const plan = PLANS.find((p) =>
          p.price.priceIds.production.includes(user.stripePriceId)
        );
        if (plan?.contentAi) {
          setIsAIselected(true);
        } else {
          toast({
            title: "Upgrade to Pro",
            description: "You need to upgrade to Pro to use Pro AI features",
          });
        }
      }
    }
  };

  const handleSendMessage = () => {
    const send = async () => {
      if (!selectedAccount) {
        return;
      }
      const res = await fetch("/api/mail/send", {
        method: "POST",
        body: JSON.stringify({
          from: selectedAccount,
          to,
          cc,
          bcc,
          subject,
          message,
          accountId: selectedAccount.accountId,
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
  return (
    <div className="h-max flex flex-col justify-between w-full">
      <div className="">
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-black font-bold">New Message</span>
              <span className="text-sm">Compose a new message</span>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleAIButtonClick}
                className="flex gap-2 bg-gradient-to-l from-green-400 to-green-200 hover:from-green-500 hover:to-green-300"
                variant="ghost"
              >
                {isAIselected ? <Bot /> : <BotOff />}
                <span>AI</span>
              </Button>
              {/* <Button
                onClick={clearMessageProps}
                className="flex gap-2 bg-gradient-to-l from-red-400 to-red-400 hover:from-red-700 hover:to-red-400"
                variant="destructive"
              >
                <GrClear />
                <span>Clear</span>
              </Button> */}
              <Button
                onClick={handleSendMessage}
                disabled={isLoading}
                className="text-black flex gap-2 bg-gradient-to-r from-indigo-200 to-red-100 hadow-sm hover:from-indigo-200 hover:to-red-200 "
              >
                <Send className="w-4" />
                Send
              </Button>
            </div>
          </div>
        </div>
        <Separator />
        <div id="message-form" className="h-full">
          <div className="max-h-[15vh] h-max">
            <div className="flex flex-col gap-2 px-2 pt-4">
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
            </div>
          </div>
          <div className="px-2 py-4">
            <Editor
              useAI={isAIselected}
              content={message}
              setContent={setMessage}
              className={`border-none focus:outline-none text-xs w-full p-1 h-[72vh] overflow-scroll `}
            />
          </div>

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
    </div>
  );
};

export default Message;
