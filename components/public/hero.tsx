import React from "react";
import { Spotlight } from "../ui/spotlight";
import Image from "next/image";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const Hero = () => {
  return (
    <div className="-mb-44 md:mb-0">
      <div className="mt-[12vh] md:mt-0 flex flex-col md:flex-row justify-center md:items-center md:justify-around w-full h-[100vh]">
        <Spotlight
          className="-top-10 left-0 2xl:left-10 2xl:-top-20"
          fill="white"
        />
        <div className="md:min-w-[45vw] 2xl:max-w-[40vw] p-8 md:p-4 md:ml-16">
          <h1
            className="text-4xl md:text-5xl 2xl:text-7xl  bg-clip-text ThemeText  
        text-center font-bold"
          >
            Let AI Manage Your Gmail Inbox
          </h1>
          <p className="text-neutral-900  font-medium my-2 text-sm  2xl:text-lg text-center ">
            Welcome to Inbox Radar, the AI-powered Inbox organizer. Customize AI
            Labels, automate email categorization, and manage your Gmail inbox.
          </p>
        </div>

        <div className="flex flex-col overflow-hidden z-0 -mt-36 md:mt-0">
          <ContainerScroll
            titleComponent={
              <>
                <h1 className="text-xl font-semibold bg-clip-text ThemeText">
                  Unleash the power of AI
                  <br />
                  <span className="text-xl md:text-[2rem] font-bold mt-1 leading-none">
                    to organize your emails
                  </span>
                </h1>
              </>
            }
          >
            <Image
              src={`/1.png`}
              alt="hero"
              className="p-2 md:p-0 mx-auto rounded-2xl object-cover h-full object-left-top w-full"
              draggable={false}
              width={800}
              height={1}
            />
          </ContainerScroll>
        </div>
      </div>
    </div>
  );
};

export default Hero;
