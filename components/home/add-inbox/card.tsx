"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IoMdAdd } from "react-icons/io";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const CardP = () => {
  const user = useCurrentUser();
  const handleAddGoogleInbox = () => {
    signIn("google", {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div>
      <Card className="w-[400px]">
        <CardHeader>
          <div className="flex justify-center">
            <p>Add Inbox</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <Button
              className="flex gap-3 leading-3"
              variant="secondary"
              onClick={handleAddGoogleInbox}
            >
              <IoMdAdd />
              <p>add gmail inbox </p>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardP;
