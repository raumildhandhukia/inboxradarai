"use client";
import { WavyBackground } from "@/components/ui/wavy-bg";
import React from "react";

const About = () => {
  return (
    <div className="relative">
      <WavyBackground className="max-w-4xl mx-3 pb-40" backgroundFill="white">
        <p className="text-2xl md:text-4xl lg:text-7xl  font-bold inter-var text-center">
          About Us
        </p>
      </WavyBackground>
      <div className="absolute top-[70vh] left-0 w-[100vw]"></div>
      <div className="h-screen">
        <div className="mb-24 md:px-20 2xl:px-56">
          <div className="w-1 h-1" />

          <div className="mt-10 px-5 ">
            <p className="text-3xl lg:text-4xl ThemeText !text-left ">
              InboxRadarAI
            </p>
            <p className="text-lg mt-5 md:text-xl leading-relaxed text-left">
              Welcome to our revolutionary SaaS AI app designed to automate your
              email management process. Our application integrates seamlessly
              with your Gmail inbox, utilizing advanced Large Language Model
              (LLM) technology, Gemini, to intercept, process, and categorize
              your emails with precision.
            </p>
            <p className="mt-5 text-lg md:text-xl leading-relaxed text-left">
              The app intelligently tags and classifies emails, allowing for
              custom label creation and automated labeling, making it effortless
              for you to manage and prioritize your emails. With our insightful
              dashboard and detailed charts, you gain valuable insights into
              your email patterns, helping you stay organized and informed.
            </p>
            <p className="mt-5 text-lg md:text-xl leading-relaxed text-left">
              Our goal is to simplify the overwhelming task of email management,
              so you can focus on what truly matters. Experience the future of
              email categorization and insight with our state-of-the-art AI
              technology, which also includes automated responses and much more.
            </p>
          </div>
          {/* <div className="mt-20 px-5">
          <p className="text-3xl lg:text-4xl ThemeText !text-left ">
            Developer
          </p>
          <p className="mt-5 text-lg md:text-xl leading-relaxed text-left">
            Hi, I&apos;m{" "}
            <span className="ThemeText text-2xl">Raumil Dhandhukia</span>, the
            developer behind this innovative app{" "}
            <span className="ThemeText text-2xl">InboxRadarAI</span>. With a
            passion for leveraging technology to solve everyday problems, I have
            dedicated my skills to creating solutions that enhance productivity
            and efficiency. This app is the culmination of my experience in
            utilizing AI and software development, and I am excited to share it
            with you.
          </p>
          <p className="mt-5 text-lg md:text-xl leading-relaxed text-left ">
            This application is developed using{" "}
            <span className="ThemeText text-2xl">
              Next.js, React, TypeScript, PostgreSQL, Gmail API, Gemini API,
              Stripe, Auth.js, Prisma and Tailwind CSS
            </span>
          </p>
          <p className="mt-5 text-lg md:text-xl leading-relaxed text-left ">
            Thank you for choosing our app. If you have any questions or
            feedback, feel free to reach out. Your satisfaction and success are
            my top priorities.
          </p>
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default About;
