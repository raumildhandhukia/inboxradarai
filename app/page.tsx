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

const features = [
  {
    image: "/inboxradarai.png",
    title: (
      <p className="text-[2.5rem] font-semibold">
        <span className="text-[#5046e6]">AI</span> Email Writing Assistant
      </p>
    ),
    bgColor: "bg-gradient-to-b from-indigo-50 to-red-300",
    description: (
      <div className="flex flex-col gap-y-4">
        <h2 className="mt-[.5rem] text-[1.3rem] ">
          Featuring{" "}
          <span className="text-[#5046e6]">
            AI Suggestions & Autocompletion
          </span>
        </h2>

        <div className="mt-[1.5rem] ">
          <p className="text-[2rem]">
            -&gt; Integrated with your email editor.
            <br />
            -&gt; <strong>InboxRadarAI</strong> helps you write emails faster
            and more effectively. <br />
          </p>
        </div>

        <span className="text-[1.1rem]">
          Keep your responses clean and concise by using AI assistant.
        </span>
      </div>
    ),
  },
  {
    image: "/inboxradarai.png",
    title: (
      <p className="text-[2.5rem] font-semibold">
        <span className="text-[#5046e6]">AI</span> Email Insights
      </p>
    ),
    bgColor: "bg-gradient-to-b from-red-300 to-green-300",
    description: (
      <div className="mt-[1.5rem] ">
        <p className="text-[1.6rem]">
          -&gt; No more wasting time reading lengthy emails.
          <br />
          -&gt; <strong>InboxRadarAI</strong> summarizes and provides insights
          into your emails, saving your time and effort. <br />
        </p>
      </div>
    ),
  },
  {
    image: "/Label.gif",
    title: (
      <p className="text-[2.5rem] font-semibold">
        <span className="text-[#5046e6]">AI</span> Email Labeling
      </p>
    ),
    bgColor: "bg-gradient-to-b from-green-300 to-yellow-50",
    description: (
      <div className="flex flex-col gap-y-4">
        <h2 className="mt-[.5rem] text-[1.3rem] ">
          You Describe Your Label,{" "}
          <span className="text-[#5046e6]">AI labels it for you.</span>
        </h2>

        <div className="mt-[1.5rem] ">
          <p className="text-[1.5rem]">
            -&gt; Create custom labels for your emails for one time and let{" "}
            <strong>AI</strong> handle the rest.
            <br />
            -&gt; <strong>InboxRadarAI</strong> automatically labels your
            emails, so you can focus on what matters.
          </p>
        </div>

        <span className="text-[1.1rem]">
          Tired of manually labelling your emails?
        </span>
      </div>
    ),
  },
  {
    image: "/inboxradarai.png",
    title: "",
    description: "",
    bgColor: "bg-gradient-to-b from-yellow-50 to-white",
  },
];

export default function Home() {
  const [cookie, setCookie] = useCookies(["cookieConsent"]);
  const [showCookie, setShowCookie] = useState(false);
  const [activeFeature, setActiveFeature] = useState(-1);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [pos, setPos] = useState("fixed");
  const user = useCurrentUser();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!cookie.cookieConsent) {
      setShowCookie(true);
    }
  }, [cookie]);

  // Set thresholds for transformation to occur after last feature
  const endTransitionThreshold =
    (features.length + 2) / (features.length + 3) + 0.02;

  const containerWidth = useTransform(
    scrollYProgress,
    [0, 0.1, endTransitionThreshold, endTransitionThreshold + 0.1], // Adjusted threshold
    ["100%", "50%", "50%", "50%"] // Return to 100% width
  );
  const containerX = useTransform(
    scrollYProgress,
    [0, 0.25, endTransitionThreshold, endTransitionThreshold + 0.1], // Adjusted threshold
    ["0%", "-5%", "-5%", "-100%"] // Move out to the left side
  );
  const containerOpacity = useTransform(
    scrollYProgress,
    [0, endTransitionThreshold, endTransitionThreshold + 0.1], // Adjusted threshold
    [1, 1, 1] // Keep opacity consistent at 1
  );
  const pricingX = useTransform(
    scrollYProgress,
    [
      endTransitionThreshold,
      endTransitionThreshold + 0.1,
      endTransitionThreshold + 0.2,
    ],
    ["100%", "0%", "0%"]
  );
  const pricingOpacity = useTransform(
    scrollYProgress,
    [
      endTransitionThreshold,
      endTransitionThreshold + 0.1,
      endTransitionThreshold + 0.2,
    ],
    [0, 1, 1]
  );
  const socialY = useTransform(scrollYProgress, [0, 0.1], ["100%", "100%"]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const newActiveFeature = Math.floor(scrollPosition / windowHeight) - 1;

      setActiveFeature(
        Math.max(-1, Math.min(newActiveFeature, features.length - 1))
      );
    };
    const windowWidth = window.innerWidth;
    setIsMobile(windowWidth <= 768);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-gradient-to-b from-white to-indigo-300"
    >
      <header>
        <Nav />
      </header>
      <main>
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
        {isMobile ? (
          <div className="flex flex-col justify-center items-center h-screen">
            <Hero activeFeature={activeFeature} isMobile />
          </div>
        ) : (
          <>
            <motion.div
              style={{
                width: containerWidth,
                x: containerX,
                opacity: containerOpacity,
              }}
              className={`${pos} top-0 left-0 h-screen`}
            >
              <Hero activeFeature={activeFeature} />
              {!user && (
                <motion.div
                  style={{
                    x: containerX,
                    y: socialY,
                    opacity: containerOpacity,
                  }}
                  className="absolute bottom-20 left-[38%] flex justify-center items-center mb-8"
                >
                  <Social />
                </motion.div>
              )}
            </motion.div>
            <div className="h-screen" /> {/* Spacer for initial hero view */}
            {features.map((feature, index) => (
              <Feature
                key={index}
                {...feature}
                isActive={activeFeature === index}
              />
            ))}
            <motion.div
              style={{
                x: pricingX,
                opacity: pricingOpacity,
              }}
              className="fixed top-0 left-0 h-screen w-full"
            >
              <div className="h-screen flex items-center justify-center">
                <Pricing noHeading showFooter />
              </div>
            </motion.div>
          </>
        )}
        {showCookie && <CookieConsent />}
      </main>
    </div>
  );
}
