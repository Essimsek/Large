"use client";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function MyPagination({pageCount}: {pageCount: number}) {
  // get the current page from search params
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const getVisiblePages = () => {
    const maxVisible = 5;
    
    if (pageCount <= maxVisible) {
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    }

    let start = Math.max(currentPage - Math.floor(maxVisible / 2), 1);
    let end = start + maxVisible - 1;

    if (end > pageCount) {
      end = pageCount;
      start = Math.max(end - maxVisible + 1, 1);
    }

    const pages: (number)[] = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }; 
  return (
    <Pagination>
      <PaginationContent>
        {/* PREVIOUS BUTTON */}
        <PaginationItem>
          <PaginationPrevious 
            href={createPageURL(currentPage - 1)}
           
            aria-disabled={currentPage <= 1} // disable if on first page
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {/* PAGES BUTTONS */}
        {getVisiblePages().map((page) => (
          <PaginationItem key={page}>
            <PaginationLink 
              href={createPageURL(page)} 
              isActive={currentPage === page}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* NEXT BUTTON */}
        <PaginationItem>
          <PaginationNext 
            href={createPageURL(currentPage + 1)}
            aria-disabled={currentPage >= pageCount} // disable if on last pagee
            className={currentPage >= pageCount ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

