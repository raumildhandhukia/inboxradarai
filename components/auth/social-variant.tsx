"use client";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
  const searchParams = useSearchParams();
  const plan = searchParams.get("sub-to-plan");
  const onClick = () => {
    signIn("google", {
      callbackUrl: plan ? `/subscribe/${plan}` : DEFAULT_LOGIN_REDIRECT,
    });
  };

  // Animation variants with correct types
  const springUpDown = {
    y: [0, -20, 0], // Moves up then back down
    transition: {
      repeat: Infinity, // Repeat the animation
      repeatType: "mirror" as "mirror", // Explicitly type as 'mirror'
      duration: 4, // Duration of each cycle
      ease: "easeInOut", // Smooth animation
    },
  };

  return (
    <div className="flex items-center gap-x-2 z-50">
      <Button
        variant="indigo"
        className="flex items-center gap-5 px-10 py-7 rounded-full z-50 w-full"
        onClick={() => {
          onClick();
        }}
      >
        <motion.div animate={springUpDown}>
          <FcGoogle className="h-16 w-16" />
        </motion.div>
        <div className="flex justify-center gap-3 text-xl font-bold tracking-wide text-gray-800">
          Connect with Gmail
        </div>
      </Button>
    </div>
  );
};
