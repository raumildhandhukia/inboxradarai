"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "@/components/public/hero";
import Nav from "@/components/public/nav";
import Pricing from "@/components/public/pricing";
import Feature from "@/components/public/features";
import { Social } from "@/components/auth/social-variant";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const features = [
  {
    image: "/inboxradarai.png",
    title: "AI Email Writing Assistant",
    bgColor: "bg-gradient-to-b from-indigo-50 to-red-300",
    description: (
      <div className="flex flex-col gap-y-4">
        <span>Integrated with your email editor.</span>

        <span>
          <strong>InboxRadarAI</strong> helps you write emails faster and more
          effectively.
        </span>
      </div>
    ),
  },
  {
    image: "/inboxradarai.png",
    title: "AI Email Insights",
    bgColor: "bg-gradient-to-b from-red-300 to-green-300",
    description: (
      <div className="flex flex-col gap-y-6">
        <span>No more wasting time reading lengthy emails.</span>
        <span>
          <strong>InboxRadarAI</strong> summarizes and provides insights into
          your emails, saving you time and effort.
        </span>
      </div>
    ),
  },
  {
    image: "/inboxradarai.png",
    title: "AI Labels",
    bgColor: "bg-gradient-to-b from-green-300 to-yellow-50",
    description: (
      <div className="flex flex-col gap-y-4">
        <span>Tired of manually labelling your emails?</span>
        <span>
          <strong>InboxRadarAI</strong> automatically labels your emails, so you
          can focus on what matters.
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
  const [activeFeature, setActiveFeature] = useState(-1);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [pos, setPos] = useState("fixed");
  const user = useCurrentUser();

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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef}>
      <header>
        <Nav />
      </header>
      <main>
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
      </main>
    </div>
  );
}
