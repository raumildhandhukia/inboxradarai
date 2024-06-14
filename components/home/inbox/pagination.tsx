import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  noNext?: boolean;
}

const Paginations: React.FC<PaginationProps> = ({ setPage, page, noNext }) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <button
            disabled={page === 1}
            className={`${page === 1 ? "text-muted cursot-default" : ""}`}
            onClick={() => {
              setPage((prev) => Math.max(prev - 1, 1));
            }}
          >
            <PaginationPrevious noHover={page === 1} />
          </button>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink noHover>{page}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <button
            disabled={noNext}
            className={`${noNext ? "text-muted cursot-default" : ""}`}
            onClick={() => {
              setPage((prev) => prev + 1);
            }}
          >
            <PaginationNext noHover={noNext} />
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Paginations;
