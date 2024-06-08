import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Nav from "./nav";
import Image from "next/image";
import { ContainerScroll } from "./ui/container-scroll-animation";

const Hero = () => {
  return (
    <div className="flex items-center justify-between h-[100vh] w-full ">
      <div className="md:max-w-[40vw] 2xl:max-w-[40vw] p-4 ml-16">
        <h1
          className="text-lg md:text-5xl 2xl:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  
        text-center font-sans font-bold"
        >
          Your AI Job Application Tracker
        </h1>
        <p className="text-neutral-500 my-2 text-sm 2xl:text-lg text-center ">
          Welcome to Inbox Radar, the AI-powered job application tracker that
          helps you keep track of your job applications and interviews.
          Supporting multiple email providers including Gmail, Outlook, Yahoo,
          and more.
        </p>
      </div>
      <div className="">
        <div className="flex flex-col overflow-hidden mt-64 z-20">
          <ContainerScroll
            titleComponent={
              <>
                <h1 className="text-xl font-semibold text-black dark:text-white">
                  Unleash the power of <br />
                  <span className="text-xl md:text-[2rem] font-bold mt-1 leading-none">
                    Scroll Animations
                  </span>
                </h1>
              </>
            }
          >
            <div className="max-h-[50px] w-[50px]">
              <Image
                src={`/linear.webp`}
                alt="hero"
                className=""
                draggable={false}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </ContainerScroll>
        </div>
      </div>
    </div>
  );
};

export default Hero;
