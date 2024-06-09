import React from "react";
import { Spotlight } from "./ui/spotlight";
import Image from "next/image";
import { ContainerScroll } from "./ui/container-scroll-animation";

const Hero = () => {
  return (
    <div>
      <div className="mt-[12vh] md:mt-0 flex flex-col md:flex-row justify-center md:items-center md:justify-around w-full h-[100vh]">
        <Spotlight
          className="-top-10 left-0 2xl:left-10 2xl:-top-20"
          fill="white"
        />
        <div className="md:max-w-[40vw] 2xl:max-w-[40vw] p-8 md:p-4 md:ml-16">
          <h1
            className="text-4xl md:text-5xl 2xl:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  
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

        <div className="flex flex-col overflow-hidden z-0">
          <ContainerScroll
            titleComponent={
              <>
                <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 ">
                  Unleash the power of AI
                  <br />
                  <span className="text-xl md:text-[2rem] font-bold mt-1 leading-none">
                    to organize your job applications
                  </span>
                </h1>
              </>
            }
          >
            <div className="">
              <Image
                src={`/1.png`}
                alt="hero"
                className=""
                draggable={false}
                width={650}
                height={50}
              />
            </div>
          </ContainerScroll>
        </div>
      </div>
    </div>
  );
};

export default Hero;
