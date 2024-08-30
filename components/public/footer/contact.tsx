"use client";
import { useRef, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BeatLoader } from "react-spinners";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <BeatLoader color="#fff" />
    </div>
  );
};

export const ContactForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const clearForm = () => {
    refs.fname.current && (refs.fname.current.value = "");
    refs.lname.current && (refs.lname.current.value = "");
    refs.email.current && (refs.email.current.value = "");
    refs.message.current && (refs.message.current.value = "");
  };
  type Refs = {
    fname: React.RefObject<HTMLInputElement>;
    lname: React.RefObject<HTMLInputElement>;
    email: React.RefObject<HTMLInputElement>;
    message: React.RefObject<HTMLTextAreaElement>;
  };

  // Create an object to hold refs for each field
  const refs: Refs = {
    fname: useRef<HTMLInputElement>(null),
    lname: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const fname = refs.fname.current?.value;
    const lname = refs.lname.current?.value;
    const email = refs.email.current?.value;
    const message = refs.message.current?.value;
    if (!fname || !lname || !email || !message) {
      setErrorMessage("All fields are required to send message.");
      return;
    }
    startTransition(async () => {
      try {
        const res = await fetch("/api/send-message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fname, lname, email, message }),
        });
        if (!res.ok) {
          setErrorMessage("An error occurred. Please try again later.");
        }
        clearForm();
        toast({
          title: "Message sent",
          description: "We will get back to you soon.",
        });
      } catch (error) {
        setErrorMessage("An error occurred. Please try again later.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col md:items-start">
        <h3 className="ThemeText text-4xl"></h3>
      </div>
      <div className="flex flex-col md:flex-row md:gap-10 ">
        <div className="mt-5">
          <p className="ThemeText !text-left md:w-[13.5rem] 2xl:w-[15.5rem]">
            First Name
          </p>
          <Input
            ref={refs.fname}
            type="text"
            placeholder="your name"
            className="text-sm mt-1"
          />
        </div>
        <div className="mt-5">
          <p className="ThemeText !text-left md:w-[13.5rem] 2xl:w-[15.5rem]">
            Last Name
          </p>
          <Input
            ref={refs.lname}
            type="text"
            placeholder="your last name"
            className="text-sm mt-1"
          />
        </div>
      </div>
      <div className="mt-5">
        <p className="ThemeText !text-left">Email</p>
        <Input
          ref={refs.email}
          type="email"
          placeholder="your email"
          className="text-sm mt-1 w-full md:w-[29.5rem] 2xl:w-[33.5rem]"
        />
      </div>
      <div className="mt-5">
        <p className="ThemeText !text-left">Message</p>
        <Textarea
          ref={refs.message}
          placeholder="your message"
          className="text-sm mt-1 w-full md:w-[29.5rem] 2xl:w-[33.5rem]"
        />
      </div>
      <div className="">
        <p className="text-red-500 text-sm font-semibold mt-1 min-h-[1.2rem]">
          {errorMessage}
        </p>
        <div className="flex justify-between mt-3 md:mt-0">
          {isPending ? (
            <Loader />
          ) : (
            <div className="mt-2">
              <Button
                className="px-8 rounded-none"
                variant="hacker"
                type="submit"
              >
                Send
              </Button>
            </div>
          )}
          <div className="flex items-center justify-center gap-2">
            <p>Support:</p>
            <Link
              href="mailto:inboxradarai@gmail.com"
              className="underline text-muted-foreground"
            >
              inboxradarai@gmail.com
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};
