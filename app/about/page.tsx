"use client";
import React from "react";

const About = () => {
  return (
    <div>
      <div className="mb-24 md:px-20 2xl:px-56">
        <div className="w-1 h-1" />
        <p className="mt-16 md:mt-28 text-5xl lg:text-7xl ThemeText !text-left md:!text-center ml-5 md:ml-0 ">
          About
        </p>
        <div className="mt-10 px-5 ">
          <p className="text-3xl lg:text-4xl ThemeText !text-left ">
            InboxRadarAI
          </p>
          <p className="text-lg mt-5 md:text-xl leading-relaxed text-left ">
            Welcome to our revolutionary SaaS AI app designed to streamline your
            email management process, specifically focusing on job applications.
            Our application integrates seamlessly with your Gmail inbox,
            utilizing advanced Large Language Model (LLM) technology, Gemini, to
            intercept, process, and categorize your emails with precision.
          </p>
          <p className="mt-5 text-lg md:text-xl leading-relaxed text-left">
            The app intelligently tags and classifies emails, making it
            effortless for you to manage and prioritize your job applications.
            With our insightful dashboard and detailed charts, you gain valuable
            insights into your email patterns and job application status,
            helping you stay organized and informed.
          </p>
          <p className="mt-5 text-lg md:text-xl leading-relaxed text-left">
            Our goal is to simplify the overwhelming task of email management,
            so you can focus on what truly matters. Experience the future of
            email categorization and insight with our state-of-the-art AI
            technology.
          </p>
        </div>
        <div className="mt-20 px-5">
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
        </div>
      </div>
    </div>
  );
};

export default About;
