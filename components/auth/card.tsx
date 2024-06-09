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
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardWrapper;
