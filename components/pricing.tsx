"use client";
import React from "react";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { IconAppWindow } from "@tabler/icons-react";
import Image from "next/image";

const Pricing = () => {
  return (
    <div>
      <div className="font-bold text-4xl md:text-5xl text-center mb-20">
        <p className="text-purple">Pricing</p>
      </div>
      <div className="flex flex-col items-center gap-y-3 md:flex-row justify-center md:gap-x-3">
        <div className="max-w-sm">
          <BackgroundGradient
            className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900"
            type="free"
          >
            <div className="pricing-card bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg">
              <h3 className="ThemeText text-3xl !text-left mb-4">Free</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Perfect for getting started
              </p>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-black dark:text-neutral-200">
                  $0
                </span>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  /month
                </span>
              </div>
              <ul className="text-neutral-600 dark:text-neutral-400 mb-6">
                <li className="mb-2">25 Email Analyses</li>
                <li className="mb-2">No Insights Dashboard</li>
                <li className="mb-2">No Custom Tag Generation</li>
                <li className="mb-2">1 Email Processing per Minute</li>
              </ul>
              <button className="w-full rounded-full px-4 py-2 bg-black text-white dark:bg-zinc-800">
                Get Started
              </button>
            </div>
          </BackgroundGradient>
        </div>

        <div className="max-w-sm">
          <BackgroundGradient
            type="pro"
            className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900"
          >
            <div className="pricing-card bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg">
              <h3 className="text-3xl font-bold text-black dark:text-indigo-200 mb-4">
                Pro
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                For professionals
              </p>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-black dark:text-neutral-200">
                  $1.99
                </span>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  /month
                </span>
              </div>
              <ul className="text-neutral-600 dark:text-neutral-400 mb-6">
                <li className="mb-2">1000 Email Analyses</li>
                <li className="mb-2">Insights Dashboard</li>
                <li className="mb-2">No Custom Tag Generation</li>
                <li className="mb-2">1 Email Processing per Minute</li>
              </ul>
              <button className="w-full rounded-full px-4 py-2 bg-black text-white dark:bg-zinc-800">
                Buy Now
              </button>
            </div>
          </BackgroundGradient>
        </div>
        <div className="max-w-sm">
          <BackgroundGradient
            type="max"
            className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900"
          >
            <div className="pricing-card bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg">
              <h3 className="text-3xl font-bold text-black dark:text-yellow-300 mb-4">
                Max
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                For power users
              </p>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-black dark:text-neutral-200">
                  $4.99
                </span>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  /month
                </span>
              </div>
              <ul className="text-neutral-600 dark:text-neutral-400 mb-6">
                <li className="mb-2">5000 Email Analyses</li>
                <li className="mb-2">Insights Dashboard</li>
                <li className="mb-2">Custom Tag Generation</li>
                <li className="mb-2">Unlimited Email Processing</li>
              </ul>
              <button className="w-full rounded-full px-4 py-2 bg-black text-white dark:bg-zinc-800">
                Buy Now
              </button>
            </div>
          </BackgroundGradient>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
