"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export const ForgotPassword = () => {
  return (
    <Button variant="link" className="text-red-500 px-0 font-normal" asChild>
      <Link href="/auth/reset">Forgot Password?</Link>
    </Button>
  );
};
