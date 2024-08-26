"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
  label: string;
  href: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ label, href }) => {
  return (
    <Button
      size="sm"
      variant="link"
      className="font-normal w-full"
      asChild
      onClick={() => {}}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};
