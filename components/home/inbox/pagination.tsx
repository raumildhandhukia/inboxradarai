import React, { ReactNode } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

interface PaginationProps {
  prev: ReactNode;
  current: ReactNode;
  next: ReactNode;
}

const Paginations: React.FC<PaginationProps> = ({ prev, current, next }) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>{prev}</PaginationItem>
        <PaginationItem>{current}</PaginationItem>
        <PaginationItem>{next}</PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Paginations;
