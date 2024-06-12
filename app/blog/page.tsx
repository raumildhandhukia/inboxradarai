"use client";
import { WavyBackground } from "@/components/ui/wavy-bg";
import React from "react";

const About = () => {
  return (
    <WavyBackground
      className="max-w-4xl mx-auto pb-40"
      backgroundFill="#0a0a0a"
    >
      <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
        Blog
      </p>
      <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
        Currently no blogs are available. Please check back later. Thank you.
      </p>
    </WavyBackground>
  );
};

export default About;
