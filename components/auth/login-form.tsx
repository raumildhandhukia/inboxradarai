"use client";
import React, { useState, useTransition } from "react";
import Card from "@/components/auth/card";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { FcGoogle } from "react-icons/fc";
import { FaYahoo } from "react-icons/fa";

const LoginForm = () => {
  return (
    <Card>
      <div className="flex flex-col gap-y-5 w-full">
        <Button
          variant="outline"
          className="z-20 w-full h-max bg-gradient-to-br from-[rgba(255,255,255,0.67)] to-[rgba(255,255,255,0.2)]"
          onClick={() => {
            signIn("google", {
              callbackUrl: DEFAULT_LOGIN_REDIRECT,
            });
          }}
        >
          <div className="flex justify-center items-center gap-x-3">
            <FcGoogle className="w-10 h-10" />
            <p className="text-xl">Log In with Google</p>
          </div>
        </Button>
        {/* <div>
          <p className="ThemeText text-xl">Or</p>
        </div>
        <Button
          variant="secondary"
          className="z-20 w-full h-max bg-gradient-to-b from-cyan-500 to-blue-500"
          onClick={() => {
            signIn("yahoo", {
              callbackUrl: DEFAULT_LOGIN_REDIRECT,
            });
          }}
        >
          <div className="flex justify-center items-center gap-x-3">
            <FaYahoo className="w-10 h-10 " />
            <p className=" text-xl">Log In with Yahoo</p>
          </div>
        </Button> */}
      </div>
    </Card>
  );
};

export default LoginForm;
