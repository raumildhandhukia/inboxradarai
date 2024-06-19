import { cn } from "@/utils/cn";
import React from "react";
import { motion } from "framer-motion";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
  type,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
  type?: "free" | "pro" | "max";
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  const getColor = (type: string | undefined) => {
    switch (type) {
      case "free":
        return "bg-[radial-gradient(circle_farthest-side_at_0_100%,black,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]";
      case "pro":
        return "bg-[radial-gradient(circle_farthest-side_at_0_100%,black,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]";
      case "max":
        return "bg-[radial-gradient(circle_farthest-side_at_0_100%,black,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]";
      default:
        return "#1ca0fb";
    }
  };
  return (
    <div
      className={cn(
        `relative ${type === "free" ? "p-[1px]" : "p-[1px]"} group`,
        containerClassName
      )}
    >
      {type !== "free" && (
        <motion.div
          variants={animate ? variants : undefined}
          initial={animate ? "initial" : undefined}
          animate={animate ? "animate" : undefined}
          transition={
            animate
              ? {
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }
              : undefined
          }
          style={{
            backgroundSize: animate ? "400% 400%" : undefined,
          }}
          className={cn(
            `absolute inset-0 rounded-md z-1 opacity-60 group-hover:opacity-100 blur-xl  transition duration-500 will-change-transform`
          )}
        />
      )}
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-md z-1 will-change-transform",
          `${getColor(type)}`
        )}
      />

      <div className={cn("relative z-1", className)}>{children}</div>
    </div>
  );
};
