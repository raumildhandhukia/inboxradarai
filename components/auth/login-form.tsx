"use client";
import React, { useState, useTransition } from "react";
import Card from "@/components/auth/card";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const LoginForm = () => {
  return (
    <Card headerLabel="">
      <div className="flex flex-col gap-y-5 w-full">
        <div className="flex justify-center items-center w-full gap-9">
          <Button
            variant="secondary"
            className="w-[45%]"
            onClick={() => {
              signIn("google", {
                callbackUrl: DEFAULT_LOGIN_REDIRECT,
              });
            }}
          >
            Google
          </Button>
          <Button
            variant="secondary"
            className="w-[45%]"
            onClick={() => {
              signIn("yahoo", {
                callbackUrl: DEFAULT_LOGIN_REDIRECT,
              });
            }}
          >
            Yahoo
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default LoginForm;
