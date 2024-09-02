/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ContainerScroll } from "../ui/container-scroll-animation";
import GradualSpacing from "../ui/gradual-spacing";
import { Social } from "../auth/social-variant";
import { cn } from "@/lib/utils";
import Footer from "./footer/footer";
import Feature from "./features";
import BoxReveal from "../ui/box-reveal";

export const headers = [
  <h1
    key="1"
    className="text-xl font-semibold bg-clip-text ThemeText text-white w-max overflow-hidden relative"
  >
    <span className="-mb-10">Unleash the power of AI</span>
    <GradualSpacing
      className="text-xl md:text-[2rem] font-bold mt-1 leading-none w-max overflow-hidden"
      text="to organize your emails"
    />
  </h1>,
  <h1
    key="2"
    className="text-xl font-semibold bg-clip-text ThemeText w-max overflow-hidden"
  >
    <span className="-mb-10">Unleash the power of AI</span>

    <GradualSpacing
      className="text-xl md:text-[2rem] font-bold mt-1 leading-none w-max overflow-hidden"
      text="to write your emails"
    />
  </h1>,
  <h1
    key="3"
    className="text-xl font-semibold bg-clip-text ThemeText w-max overflow-hidden"
  >
    <span className="-mb-10">Unleash the power of AI</span>
    <GradualSpacing
      className="text-xl md:text-[2rem] font-bold mt-1 leading-none w-max overflow-hidden"
      text="to save time with insights"
    />
  </h1>,
  <h1
    key="4"
    className="text-xl font-semibold bg-clip-text ThemeText w-max overflow-hidden"
  >
    <span className="-mb-10">Unleash the power of AI</span>
    <GradualSpacing
      className="text-xl md:text-[2rem] font-bold mt-1 leading-none w-max overflow-hidden"
      text="to label your emails"
    />
  </h1>,
];
const images = [
  { src: "/inboxradarai.png", className: "object-contain" },
  {
    src: "/autocomplete.gif",
    className: "object-contain",
  },
  {
    src: "/insights.gif",
    className: "object-contain",
  },
  {
    src: "/label-cropped.gif",
    className: "object-contain",
  },
  {
    src: "/inboxradarai.png",
    className: "object-contain",
  },
  {
    src: "/inboxradarai.png",
    className: "object-contain",
  },
];
const Hero = ({ isMobile }: { isMobile?: boolean }) => {
  if (isMobile) {
    return (
      <div className="flex flex-col justify-center items-center w-ful h-full">
        {/* <ContainerScroll
          titleComponent={
            <div className="flex justify-center items-center ">
              {headers[0]}
            </div>
          }
        >
          <img
            src={`/inboxradarai.png`}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={true}
          />
        </ContainerScroll> */}
        <div className="mt-8 px-10">
          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <p className="text-[2.4rem] font-semibold text-white">
              InboxRadar<span className="text-[#5046e6]">AI</span>
            </p>
          </BoxReveal>
          <div className="flex flex-col gap-y-4">
            <BoxReveal boxColor={"#5046e6"} duration={0.5}>
              <h2 className="text-[1rem] text-white">
                Featuring{" "}
                <span className="text-[#5046e6]">
                  Email Client powered by AI
                </span>
              </h2>
            </BoxReveal>

            <div className="mt-[1.2rem] ">
              <div className="text-[1.1rem] text-white">
                <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                  <span>
                    -&gt; Seamlessly integrated with{" "}
                    <span className="text-[#5046e6]">Gmail</span>.
                  </span>
                </BoxReveal>

                <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                  <span>
                    -&gt; Explore the power of AI to{" "}
                    <span className="text-[#5046e6]">organize</span> your emails
                    <span> & unlimited inboxes.</span>
                  </span>
                </BoxReveal>
              </div>
            </div>

            <div className="text-[1.3rem] text-purple">
              <BoxReveal boxColor={"purple"} duration={0.7}>
                <span>-&gt; Get insights on your emails.</span>
              </BoxReveal>
              <BoxReveal boxColor={"purple"} duration={0.7}>
                <span> -&gt; Get AI assistant to write your emails.</span>
              </BoxReveal>
              <BoxReveal boxColor={"purple"} duration={0.7}>
                <span> -&gt; Let AI label your emails.</span>
              </BoxReveal>
              <BoxReveal boxColor={"purple"} duration={0.7}>
                <span>
                  -&gt; User privacy is priority.{" "}
                  <span className="text-[#5046e6]">No data is stored.</span>
                </span>
              </BoxReveal>
              <BoxReveal boxColor={"purple"} duration={0.7}>
                <span>
                  -&gt;
                  <span className="text-[#5046e6]">
                    {" "}
                    Sensitive information is filtered before processing your
                    emails.
                  </span>
                </span>
              </BoxReveal>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="h-full flex flex-col md:flex-row md:items-center md:justify-start gap-10 md:px-20">
      <div className="flex flex-col md:justify-start md:items-start md:max-w-[60%] md:-ml-10 md:mt-24">
        <ContainerScroll
          cardClassNames={`w-full`}
          titleComponent={
            <div className="w-full flex justify-center">{headers[0]}</div>
          }
        >
          <img
            src={images[0].src}
            alt="hero"
            className={cn(
              "p-2 md:p-0 mx-auto rounded-2xl object-cover",
              images[0].className
            )}
          />
        </ContainerScroll>
      </div>
      <div className="flex-1">
        <BoxReveal boxColor={"#5046e6"} duration={0.5}>
          <p className="text-[0.5rem] lg:text-[2.5rem] font-semibold text-white">
            InboxRadar<span className="text-[#5046e6]">AI</span>
          </p>
        </BoxReveal>
        <div className="flex flex-col gap-y-4">
          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <h2 className="text-[1.3rem] text-white">
              Featuring{" "}
              <span className="text-[#5046e6]">Email Client powered by AI</span>
            </h2>
          </BoxReveal>

          <div className="mt-[1.5rem] ">
            <div className="text-[1.4rem] text-white">
              <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                <span>
                  -&gt; Seamlessly integrated with{" "}
                  <span className="text-[#5046e6]">Gmail</span>.
                </span>
              </BoxReveal>

              <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                <span>
                  -&gt; Explore the power of AI to{" "}
                  <span className="text-[#5046e6]">organize</span> your emails
                  <span> & unlimited inboxes.</span>
                </span>
              </BoxReveal>
            </div>
          </div>

          <div className="text-[1.4rem] text-purple">
            <BoxReveal boxColor={"purple"} duration={0.7}>
              <span>-&gt; Get insights on your emails.</span>
            </BoxReveal>
            <BoxReveal boxColor={"purple"} duration={0.7}>
              <span> -&gt; Get AI assistant to write your emails.</span>
            </BoxReveal>
            <BoxReveal boxColor={"purple"} duration={0.7}>
              <span> -&gt; Let AI label your emails.</span>
            </BoxReveal>
            <BoxReveal boxColor={"purple"} duration={0.7}>
              <span>
                -&gt; User privacy is priority.{" "}
                <span className="text-[#5046e6]">No data is stored.</span>
              </span>
            </BoxReveal>
            <BoxReveal boxColor={"purple"} duration={0.7}>
              <span>
                -&gt;
                <span className="text-[#5046e6]">
                  {" "}
                  Sensitive information is filtered before processing your
                  emails.
                </span>
              </span>
            </BoxReveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
