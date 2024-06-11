"use client";
import React from "react";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsPatchCheckFill } from "react-icons/bs";

import Image from "next/image";
import { Button } from "@/components/ui/button";

const Pricing = () => {
  return (
    <div>
      <div className="font-bold text-4xl md:text-5xl text-center mb-20 -mt-44 md:mt-0">
        <p className="text-purple">Pricing</p>
      </div>
      <div className="flex flex-col items-center gap-y-3 md:flex-row justify-center md:gap-x-3">
        <div className="max-w-sm w-[80%] md:w-[30%] h-[90%]">
          <BackgroundGradient
            className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900"
            type="free"
          >
            <div className="relative pricing-card bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg min-h-[48vh] md:min-h-[64vh]">
              <h3 className="ThemeText text-3xl !text-left mb-4">Free</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Perfect for getting started
              </p>
              <div className="text-center mb-6 flex justify-center items-center">
                <span className="text-4xl font-bold text-black dark:text-neutral-200">
                  $0
                </span>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  /month
                </span>
              </div>
              <ul className="text-neutral-600 dark:text-neutral-400 mb-6">
                <li className="mb-2 flex gap-2 leading-[17px]">
                  <BsPatchCheckFill color="#D3D3D3" />
                  25 Email Analyses
                </li>
                <li className="mb-2 flex gap-2 leading-[17px]">
                  <AiFillCloseCircle color="gray" />
                  No Insights Dashboard
                </li>
                <li className="mb-2 flex gap-2 leading-[17px]">
                  <AiFillCloseCircle color="gray" />
                  No Custom Tag Generation
                </li>
                <li className="mb-2 flex gap-2 leading-[17px]">
                  <AiFillCloseCircle color="gray" />1 Email Processing per
                  Minute
                </li>
              </ul>
              <Button
                variant="secondary"
                className="absolute bottom-3 left-0 w-full rounded-full px-4 py-2 text-white"
              >
                Get Started
              </Button>
            </div>
          </BackgroundGradient>
        </div>

        <div className="max-w-sm w-[80%] md:w-[30%] h-[90%]">
          <BackgroundGradient
            type="pro"
            className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 "
          >
            <div className="relative pricing-card bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg min-h-[48vh] md:min-h-[64vh]">
              <h3 className="text-3xl font-bold text-black dark:text-indigo-200 mb-4">
                Pro
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Recommended for daily users
              </p>
              <div className="text-center mb-6 flex justify-center items-center">
                <span className="text-4xl font-bold text-black dark:text-neutral-200">
                  $1.99{" "}
                  <p className="line-through text-green-200 text-xl">$4.99</p>
                </span>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  /month
                </span>
              </div>
              <ul className="text-neutral-600 dark:text-neutral-400 mb-6">
                <li className="mb-2 flex gap-2 leading-[17px]">
                  <BsPatchCheckFill color="#D3D3D3" />
                  1000 Email Analyses
                </li>
                <li className="mb-2 flex gap-2 leading-[17px]">
                  <BsPatchCheckFill color="#D3D3D3" />
                  Insights Dashboard
                </li>
                <li className="mb-2 flex gap-2 leading-[17px]">
                  <AiFillCloseCircle color="gray" />
                  No Custom Tag Generation
                </li>
                <li className="mb-2 flex gap-2 leading-[17px]">
                  <AiFillCloseCircle color="gray" />1 Email Processing per
                  Minute
                </li>
              </ul>
              <Button
                variant="default"
                className="absolute bottom-3 left-0 w-full rounded-full px-3 py-1 text-black bg-green-500 hover:bg-yellow-300"
              >
                Buy Now
              </Button>
            </div>
          </BackgroundGradient>
        </div>
        <div className="max-w-sm w-[80%] md:w-[30%] h-[90%]">
          <BackgroundGradient
            type="max"
            className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900"
          >
            <div className="relative pricing-card bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg min-h-[48vh] md:min-h-[64vh]">
              <h3 className="text-3xl font-bold text-black dark:text-yellow-300 mb-4">
                Max
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                For power users
              </p>
              <div className="text-center mb-6 flex justify-center items-center">
                <span className="text-4xl font-bold text-black dark:text-neutral-200">
                  $4.99{" "}
                  <p className="line-through text-green-200 text-xl">$9.99</p>
                </span>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  /month
                </span>
              </div>
              <ul className="text-neutral-600 dark:text-neutral-400 mb-6">
                <li className="mb-2 flex gap-2 leading-[17px]">
                  <BsPatchCheckFill color="#D3D3D3" />
                  5000 Email Analyses
                </li>
                <li className="mb-2 flex gap-2 leading-[17px]">
                  <BsPatchCheckFill color="#D3D3D3" />
                  Insights Dashboard
                </li>
                <li className="mb-2 flex gap-2 leading-[17px]">
                  <BsPatchCheckFill color="#D3D3D3" />
                  Custom Tag Generation
                </li>
                <li className="mb-2 flex gap-2 leading-[17px]">
                  <BsPatchCheckFill color="#D3D3D3" />
                  Unlimited Email Processing
                </li>
              </ul>
              <Button
                variant="default"
                className="absolute bottom-3 left-0 w-full rounded-full px-3 py-1 text-black bg-green-500 hover:bg-yellow-300"
              >
                Buy Now
              </Button>
            </div>
          </BackgroundGradient>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
