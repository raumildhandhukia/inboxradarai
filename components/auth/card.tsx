import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Header } from "@/components/auth/header";
interface CardProps {
  isModal?: boolean;
  children: React.ReactNode;
}

const CardWrapper: React.FC<CardProps> = ({ isModal = false, children }) => {
  return (
    <Card className="md:w-[400px] shadow-md bg-gradient-to-b from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0.2)]">
      <CardHeader>
        <Header label="" />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardWrapper;
