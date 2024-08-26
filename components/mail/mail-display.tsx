"use client";
import { From, To, DateTime } from "@/components/home/inbox/email-detail/email";
import { Email } from "@/types";
import { Trash2, InboxIcon } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EmailDetailContext } from "@/context/email-detail-context";
import { useContext, useEffect, useState, useTransition } from "react";
import { decodeAndSanitizeHTML } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { InboxContext } from "@/context/inbox-context";
import AIInsights from "@/components/home/inbox/email-detail/ai-insights";
import { useToast } from "@/components/ui/use-toast";
import Editor from "@/components/editor/text-editor";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MailDisplayProps {
  mail: Email | null;
}

export function MailDisplay({ mail }: MailDisplayProps) {
  const { toast } = useToast();
  const router = useRouter();
  const { setEmailAnalysis, setEmail } = useContext(EmailDetailContext);
  const { selectedAccount, setEmails } = useContext(InboxContext);
  const [emailBody, setEmailBody] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [replyMessage, setReplyMessage] = useState<string>("");
  const [test, setTest] = useState<string>("");
  const [isReplyWindowExpanded, setIsReplyWindowExpanded] =
    useState<boolean>(false);
  const [isSendingReply, startTransition] = useTransition();
  useEffect(() => {
    const getEmail = async () => {
      const res = await fetch(`/api/mail/${mail?.id}?email=${selectedAccount}`);
      if (res.ok) {
        const data = await res.json();
        data.body = decodeAndSanitizeHTML(data.body);
        setEmailBody(data.body);
        if (data.analysis) {
          setEmailAnalysis(data.analysis);
        }
        setIsLoading(false);
      }
    };
    if (mail) {
      getEmail();
    }
  }, [router, setEmailAnalysis, mail, selectedAccount]);

  const handleTrash = async () => {
    if (!mail) return;
    const res = await fetch(`/api/mail/trash`, {
      method: "POST",
      body: JSON.stringify({
        emailId: mail.id,
        account: selectedAccount,
        action: mail.labelIds?.includes("TRASH") ? "UNTRASH" : "TRASH",
      }),
    });
    if (res.ok) {
      setEmail(null);
      setEmails((prev) => {
        return prev.filter((email: Email) => email.id !== mail.id);
      });
      const title = mail.labelIds?.includes("TRASH") ? "Restored" : "Trashed";
      const description =
        title === "Trashed"
          ? "Conversation can be restored from Trash."
          : "Conversation moved back to Inbox.";
      toast({
        title,
        description,
      });
    }
  };

  const handleSendReply = async () => {
    const send = async () => {
      const res = await fetch("/api/mail/send", {
        method: "POST",
        body: JSON.stringify({
          from: selectedAccount,
          to: [mail?.from?.split(" <")[1].split(">")[0] || ""],
          subject: `${mail?.subject}`,
          message: replyMessage,
          account: selectedAccount,
          threadId: mail?.threadId,
          messageId: mail?.messageId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        setReplyMessage("");
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

  return (
    <div className="flex h-full flex-col">
      {mail ? (
        <div className="flex flex-col max-h-screen">
          <div className="flex items-start p-4" id="email-info">
            <div className="flex items-start gap-4 text-sm">
              {/* <Avatar>
                <AvatarImage alt={mail.from || ""} />
                <AvatarFallback>NA</AvatarFallback>
              </Avatar> */}
              <div className="grid gap-1 ml-5">
                <div className="font-semibold">{mail.from}</div>
                <div className="line-clamp-1 text-xs">{mail.subject}</div>
                <div className="line-clamp-1 text-xs">
                  <span className="font-medium">To:</span> {mail.to}
                </div>
              </div>
            </div>
            <div className="ml-auto flex flex-col gap-2">
              {mail.date && (
                <div className="text-xs text-muted-foreground">
                  <DateTime date={mail?.date || ""} type="detail" />
                </div>
              )}
              <div className="flex justify-end">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={!mail}
                      onClick={handleTrash}
                    >
                      {mail &&
                        (mail?.labelIds?.includes("TRASH") ? (
                          <>
                            <InboxIcon className="h-4 w-4" />
                            <span className="sr-only">Restore</span>
                          </>
                        ) : (
                          <>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Move To Trash</span>
                          </>
                        ))}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {mail?.labelIds?.includes("TRASH")
                      ? "Restore"
                      : "Move To Trash"}
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
          <Separator />
          <ScrollArea className="flex-1" id="email-details">
            <div className="text-lg text-md text-muted-foreground mx-5 ">
              <AIInsights emailId={mail?.id} />
            </div>
            {/* <Separator /> */}
            <div className="flex-1  p-3">
              <div className="mt-5  rounded-2xl flex justify-center">
                <div
                  dangerouslySetInnerHTML={{
                    __html: emailBody || "",
                  }}
                ></div>
              </div>
            </div>
          </ScrollArea>
          <Separator className="mt-auto" />
          <div className="p-4" id="email-reply">
            {isReplyWindowExpanded ? (
              <Dialog
                open={isReplyWindowExpanded}
                onOpenChange={setIsReplyWindowExpanded}
              >
                <DialogContent className="h-max flex flex-col justify-between !min-w-[80%]">
                  <div className="">
                    <DialogHeader>
                      <div className="flex items-center justify-between relative">
                        <div>
                          <DialogTitle className="text-black">
                            <span>
                              Reply To{" "}
                              <span className="text-muted-foreground">
                                {mail?.from}
                              </span>
                            </span>
                          </DialogTitle>
                          <DialogDescription>
                            Compose a reply message
                          </DialogDescription>
                        </div>
                      </div>
                    </DialogHeader>
                    <div id="message-form" className="h-full p-4 space-y-3">
                      <Editor
                        content={replyMessage}
                        placeholder={`Click here to reply ${mail?.from}...`}
                        setContent={setReplyMessage}
                        className={`border-none focus:outline-none text-xs w-full p-1 h-[55vh] overflow-scroll`}
                      />
                    </div>
                  </div>
                  <DialogFooter className="">
                    <Button onClick={handleSendReply} disabled={isLoading}>
                      Reply
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ) : (
              <div className="grid gap-4">
                <Editor
                  expandButton
                  handleButtonClick={() => {
                    setIsReplyWindowExpanded((prev) => !prev);
                  }}
                  content={replyMessage}
                  setContent={setReplyMessage}
                  className="text-xs h-[20vh]"
                  placeholder={`Click here to reply ${mail.from}...`}
                />
                {/* <textarea
                id="message"
                placeholder={`Click here to reply ${mail.from}...`}
                className={`border-none focus:outline-none text-xs w-full p-1 
                 min-h-[10vh] max-h-[15vh]
                overflow-scroll`}
                value={replyMessage}
                onChange={(e) => {
                  setReplyMessage(e.target.value);
                }}
              /> */}
                <div className="flex items-center">
                  <Button
                    onClick={handleSendReply}
                    size="sm"
                    className="ml-auto"
                    disabled={isSendingReply}
                  >
                    Reply
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No message selected
        </div>
      )}
    </div>
  );
}
