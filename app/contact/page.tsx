"use client";
import React from "react";
import { ContactForm } from "@/components/public/footer/contact";
import { WavyBackground } from "@/components/ui/wavy-bg";
const About = () => {
  return (
    <div className="relative">
      <WavyBackground className="max-w-4xl mx-3 pb-40" backgroundFill="white">
        <p className="text-2xl md:text-4xl lg:text-7xl  font-bold inter-var text-center">
          Contact Us
        </p>
      </WavyBackground>
      <div className="absolute top-[70vh] left-0 w-[100vw]">
        <div className="flex justify-center items-center px-32">
          <ContactForm />
        </div>
      </div>
      <div className="h-[50vh]"></div>
    </div>
  );
};

export default About;
