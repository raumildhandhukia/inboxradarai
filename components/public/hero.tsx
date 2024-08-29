"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ContainerScroll } from "../ui/container-scroll-animation";
import GradualSpacing from "../ui/gradual-spacing";
import { Social } from "../auth/social-variant";
import { cn } from "@/lib/utils";

const headers = [
  <h1
    key="1"
    className="text-xl font-semibold bg-clip-text ThemeText w-max overflow-hidden relative"
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
const Hero = ({ activeFeature }: { activeFeature: number }) => {
  return (
    <div className="h-full">
      <div className="flex flex-col justify-center items-center h-full">
        <ContainerScroll
          cardClassNames={`${activeFeature === -1 ? "w-full " : "w-[62vh]"}`}
          titleComponent={
            <div className="w-full flex justify-center">
              {headers[activeFeature + 1]}
            </div>
          }
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={activeFeature}
              src={images[activeFeature + 1].src}
              alt="hero"
              className={cn(
                "p-2 md:p-0 mx-auto rounded-2xl object-cover h-full",
                images[activeFeature + 1].className
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
        </ContainerScroll>
      </div>
    </div>
  );
};

export default Hero;
