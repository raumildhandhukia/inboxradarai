"use client";
import React, { useState, useTransition } from "react";
import Card from "@/components/auth/card";
import { Meteors } from "@/components/ui/meteors";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { FcGoogle } from "react-icons/fc";
import { FaYahoo } from "react-icons/fa";
import { Header } from "@/components/auth/header";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import Link from "next/link";

const LoginForm = () => {
  return (
    <div className="">
      <div className=" w-full relative max-w-xs">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
        <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
          <div className="flex flex-col gap-y-5 w-full">
            <Header />
            <Highlight className="text-black dark:text-white">
              Google verification pending !!!
            </Highlight>

            <Button
              variant="outline"
              className="z-20 w-full h-max bg-gradient-to-br from-[rgba(103,162,178,0.67)] to-[rgba(110,93,237,0.2)]"
              onClick={() => {
                signIn("google", {
                  callbackUrl: DEFAULT_LOGIN_REDIRECT,
                });
              }}
            >
              <div className="flex justify-center items-center gap-x-3">
                <FcGoogle className="w-10 h-10" />
                <p className="text-md md:text-lg">Log In with Google</p>
              </div>
            </Button>
            <Button variant="link" className="-mb-4">
              <Link href="/" className="ThemeText">
                Back to Home Page
              </Link>
            </Button>
          </div>

          <Meteors number={30} />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
