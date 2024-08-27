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
  const springUpDownConnectWithGoogle = {
    y: [0, -5, 0], // Moves up then back down
    transition: {
      repeat: Infinity, // Repeat the animation
      repeatType: "mirror" as "mirror", // Explicitly type as 'mirror'
      duration: 2, // Duration of each cycle
      ease: "easeInOut", // Smooth animation
    },
  };

  const springDownUp = {
    y: [0, 5, 0], // Moves down then back up
    transition: {
      repeat: Infinity,
      repeatType: "mirror" as "mirror", // Explicitly type as 'mirror'
      duration: 2,
      ease: "easeInOut",
    },
  };

  return (
    <div className="flex items-center w-full gap-x-2 z-50">
      <Button
        variant="indigo"
        className="flex items-center gap-5 p-10 rounded-full z-50"
        onClick={() => {
          onClick();
        }}
      >
        <motion.div animate={springUpDown}>
          <FcGoogle className="h-20 w-20" />
        </motion.div>
        <div className="flex justify-center gap-3 text-3xl text-gray-800">
          Sign In / Connect with Google
        </div>
      </Button>
    </div>
  );
};
