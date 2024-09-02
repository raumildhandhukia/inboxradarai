import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ContainerScroll } from "../ui/container-scroll-animation";

const Feature = ({
  title,
  description,
  image,
  header,
  bgColor,
  isActive,
  className,
  isMobile,
}: {
  title: React.ReactNode;
  description: React.ReactNode;
  isActive: boolean;
  bgColor: string;
  header: React.ReactNode;
  image: string;
  className?: string;
  isMobile?: boolean;
}) => {
  return (
    <div
      className={cn(
        `${isMobile ? "min-h-screen" : "h-screen"} max-w-screen flex ${
          isMobile ? "flex-col pt-20" : "items-center justify-between py-10"
        } px-10 text-white`,
        bgColor
      )}
    >
      <div className={`flex ${isMobile ? "flex-col" : "gap-4 items-center"}`}>
        {isMobile ? (
          <div className="w-full flex justify-center">{header}</div>
        ) : (
          <ContainerScroll
            cardClassNames={`w-full`}
            titleComponent={
              <div className="w-full flex justify-center">{header}</div>
            }
          >
            <AnimatePresence mode="wait">
              <motion.img
                src={image}
                alt="hero"
                className={cn(
                  "p-2 md:p-0 mx-auto rounded-2xl object-cover h-full",
                  className
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
          </ContainerScroll>
        )}
        <div className={isMobile ? "mt-8" : ""}>
          {title}
          {description}
        </div>
      </div>
    </div>
  );
};

export default Feature;
