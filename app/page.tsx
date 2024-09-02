"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "@/components/public/hero";
import Nav from "@/components/public/nav";
import Pricing from "@/components/public/pricing";
import Feature from "@/components/public/features";
import { Social } from "@/components/auth/social-variant";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import GridPattern from "@/components/ui/grid";
import { cn } from "@/utils/cn";
import DotPattern from "@/components/ui/dot";
import CookieConsent from "@/components/public/cookie";
import { useCookies } from "react-cookie";
import GradualSpacing from "@/components/ui/gradual-spacing";
import Footer from "@/components/public/footer/footer";
import BoxReveal from "@/components/ui/box-reveal";

const features = [
  {
    image: "/autocomplete.gif",
    header: (
      <h1
        key="2"
        className="text-xl font-semibold bg-clip-text ThemeText w-max overflow-hidden text-white"
      >
        <span className="-mb-10">Unleash the power of AI</span>

        <GradualSpacing
          className="text-xl md:text-[2rem] font-bold mt-1 leading-none w-max overflow-hidden"
          text="to write your emails"
        />
      </h1>
    ),
    title: (
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <p className="text-[2.5rem] font-semibold">
          <span className="text-[#5046e6]">AI</span> Email Writing Assistant
        </p>
      </BoxReveal>
    ),
    description: (
      <div className="flex flex-col gap-y-4">
        <BoxReveal boxColor={"#5046e6"} duration={0.5}>
          <h2 className="mt-[.5rem] text-[1.3rem] ">
            Featuring{" "}
            <span className="text-[#5046e6]">
              AI Suggestions & Autocompletion
            </span>
          </h2>
        </BoxReveal>

        <div className="mt-[1.5rem] ">
          <div className="text-[2rem]">
            <BoxReveal boxColor={"#5046e6"} duration={0.5}>
              <span>-&gt; Integrated with your email editor.</span>
            </BoxReveal>

            <BoxReveal boxColor={"#5046e6"} duration={0.5}>
              <span>
                -&gt;{" "}
                <strong>
                  InboxRadar<span className="text-[#5046e6]">AI</span>
                </strong>{" "}
                helps you write emails faster and more effectively.
              </span>
            </BoxReveal>
          </div>
        </div>

        <BoxReveal boxColor={"#5046e6"} duration={0.5}>
          <span className="text-[1.1rem]">
            Keep your responses clean and concise by using AI assistant.
          </span>
        </BoxReveal>
      </div>
    ),
  },
  {
    image: "/insights.gif",
    header: (
      <h1
        key="3"
        className="text-xl font-semibold bg-clip-text ThemeText text-white w-max overflow-hidden"
      >
        <span className="-mb-10">Unleash the power of AI</span>
        <GradualSpacing
          className="text-xl md:text-[2rem] font-bold mt-1 leading-none w-max overflow-hidden"
          text="to save time with insights"
        />
      </h1>
    ),
    title: (
      <div className="text-[2.5rem] font-semibold">
        <BoxReveal boxColor={"#5046e6"} duration={0.5}>
          <>
            <span className="text-[#5046e6]">AI</span> Email Insights
          </>
        </BoxReveal>
      </div>
    ),
    description: (
      <div className="mt-[1.5rem] ">
        <div className="text-[1.6rem]">
          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <>-&gt; No more wasting time reading lengthy emails.</>
          </BoxReveal>
          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <>
              -&gt;{" "}
              <strong>
                InboxRadar<span className="text-[#5046e6]">AI</span>
              </strong>{" "}
              summarizes and provides insights into your emails, saving your
              time and effort.
            </>
          </BoxReveal>
        </div>
      </div>
    ),
  },
  {
    image: "/label-cropped.gif",
    header: (
      <h1
        key="4"
        className="text-xl font-semibold bg-clip-text ThemeText text-white w-max overflow-hidden"
      >
        <span className="-mb-10">Unleash the power of AI</span>
        <GradualSpacing
          className="text-xl md:text-[2rem] font-bold mt-1 leading-none w-max overflow-hidden"
          text="to label your emails"
        />
      </h1>
    ),
    title: (
      <div className="text-[2.5rem] font-semibold">
        <BoxReveal boxColor={"#5046e6"} duration={0.5}>
          <>
            <span className="text-[#5046e6]">AI</span> Email Labeling
          </>
        </BoxReveal>
      </div>
    ),
    description: (
      <div className="flex flex-col gap-y-4">
        <BoxReveal boxColor={"#5046e6"} duration={0.5}>
          <h2 className="mt-[.5rem] text-[1.3rem] ">
            You Describe Your Label,{" "}
            <span className="text-[#5046e6]">AI labels it for you.</span>
          </h2>
        </BoxReveal>

        <div className="mt-[1.5rem] ">
          <div className="text-[1.5rem]">
            <BoxReveal boxColor={"#5046e6"} duration={0.5}>
              <>
                -&gt; Create custom labels for your emails for one time and let{" "}
                <strong>AI</strong> handle the rest.
              </>
            </BoxReveal>
            <BoxReveal boxColor={"#5046e6"} duration={0.5}>
              <>
                -&gt;{" "}
                <strong>
                  InboxRadar<span className="text-[#5046e6]">AI</span>
                </strong>{" "}
                automatically labels your emails, so you can focus on what
                matters.
              </>
            </BoxReveal>
          </div>
        </div>

        <BoxReveal boxColor={"#5046e6"} duration={0.5}>
          <span className="text-[1.1rem]">
            Tired of manually labelling your emails?
          </span>
        </BoxReveal>
      </div>
    ),
  },
];
const MobileMessage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 px-4">
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <p className="text-2xl font-semibold text-white text-center">
          Full experience available only on Desktop
        </p>
      </BoxReveal>
    </div>
  );
};

export default function Home() {
  const [cookie, setCookie] = useCookies(["cookieConsent"]);
  const [showCookie, setShowCookie] = useState(false);
  const [activeFeature, setActiveFeature] = useState(-1);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [pos, setPos] = useState("");
  const user = useCurrentUser();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!cookie.cookieConsent) {
      setShowCookie(true);
    }
  }, [cookie]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={containerRef} className="max-w-screen overflow-hidden">
      <header>
        <Nav />
      </header>
      <main className="flex flex-col">
        <div
          className={`${pos} relative h-screen bg-gradient-to-b from-black to-gray-900`}
        >
          <GridPattern
            width={20}
            height={20}
            x={-1}
            y={-1}
            className={cn(
              "[mask-image:linear-gradient(to_bottom,white,transparent,transparent)] "
            )}
          />
          <DotPattern
            width={20}
            height={20}
            x={-1}
            y={-1}
            className={cn(
              "[mask-image:linear-gradient(to_top,white,transparent,transparent)] "
            )}
          />
          <Hero isMobile={isMobile} />
          {!user && !isMobile && (
            <div className="absolute bottom-24 translate-x-[21%] w-full z-50">
              <div className="flex justify-center items-center z-50">
                <Social />
              </div>
            </div>
          )}
        </div>

        {isMobile ? (
          <>
            <div className="flex flex-col">
              {features.map((feature, index) => (
                <div key={index} className="relative">
                  <DotPattern
                    width={20}
                    height={20}
                    x={-1}
                    y={-1}
                    className={cn(
                      "[mask-image:linear-gradient(to_bottom,white,transparent,transparent)] mt-[0.5rem]"
                    )}
                  />
                  <DotPattern
                    width={20}
                    height={20}
                    x={-1}
                    y={-1}
                    className={cn(
                      "[mask-image:linear-gradient(to_top,white,transparent,transparent)] "
                    )}
                  />
                  <Feature
                    {...feature}
                    isActive={true}
                    isMobile={true}
                    bgColor={
                      index % 2 === 0
                        ? "bg-gradient-to-b from-gray-900 to-black"
                        : "bg-gradient-to-b from-black to-gray-900"
                    }
                  />
                </div>
              ))}
            </div>
            <MobileMessage />
          </>
        ) : (
          <>
            {features.map((feature, index) => (
              <div key={index} className="relative">
                <DotPattern
                  width={20}
                  height={20}
                  x={-1}
                  y={-1}
                  className={cn(
                    "[mask-image:linear-gradient(to_bottom,white,transparent,transparent)] mt-[0.5rem]"
                  )}
                />
                <DotPattern
                  width={20}
                  height={20}
                  x={-1}
                  y={-1}
                  className={cn(
                    "[mask-image:linear-gradient(to_top,white,transparent,transparent)] "
                  )}
                />
                <Feature
                  {...feature}
                  isActive={true}
                  bgColor={
                    index % 2 === 0
                      ? "bg-gradient-to-b from-gray-900 to-black"
                      : "bg-gradient-to-b from-black to-gray-900"
                  }
                />
              </div>
            ))}
            <div className="w-full">
              <div className="h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 relative">
                <DotPattern
                  width={20}
                  height={20}
                  x={-1}
                  y={-1}
                  className={cn(
                    "[mask-image:linear-gradient(to_bottom,white,transparent,transparent)] mt-2"
                  )}
                />
                <GridPattern
                  width={20}
                  height={20}
                  x={-1}
                  y={-1}
                  className={cn(
                    "[mask-image:linear-gradient(to_top,white,transparent,transparent)] "
                  )}
                />
                <Pricing noHeading />
                {/* <div className="absolute bottom-0 left-0 w-full">
                  <Footer mini />
                </div> */}
              </div>
            </div>
          </>
        )}

        {/* {showCookie && <CookieConsent />} */}
      </main>
    </div>
  );
}
