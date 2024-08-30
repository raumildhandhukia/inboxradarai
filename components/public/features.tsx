import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BoxReveal } from "@/components/ui/box-reveal";
import DotPattern from "../ui/dot";
import GridPattern from "../ui/grid";

const Feature = ({
  title,
  description,
  bgColor,
  isActive,
}: {
  title: React.ReactNode;
  description: React.ReactNode;
  isActive: boolean;
  bgColor: string;
}) => {
  return (
    <div
      className={cn(`h-screen flex items-center justify-end pt-40 `, bgColor)}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={isActive ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-1/2 pr-16"
      >
        <>
          {title}
          {description}
        </>
      </motion.div>
    </div>
  );
};

export default Feature;
