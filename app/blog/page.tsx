"use client";
import { WavyBackground } from "@/components/ui/wavy-bg";
import React from "react";

const About = () => {
  return (
    <WavyBackground className="max-w-4xl mx-3 pb-40" backgroundFill="white">
      <p className="text-2xl md:text-4xl lg:text-7xl  font-bold inter-var text-center">
        Blog
      </p>
      <p className="text-base md:text-lg mt-4 font-normal inter-var text-center">
        Currently no blogs are available. Please check back later. Thank you.
      </p>
    </WavyBackground>
  );
};

export default About;
