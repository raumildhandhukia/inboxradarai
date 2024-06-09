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
  headerLabel: string;
  isModal?: boolean;
  children: React.ReactNode;
}

const CardWrapper: React.FC<CardProps> = ({
  headerLabel,
  isModal = false,
  children,
}) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardWrapper;
