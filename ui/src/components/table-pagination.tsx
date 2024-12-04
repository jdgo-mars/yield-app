import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

export function TablePagination({
  pageIndex,
  pageCount,
  setPageIndex,
}: {
  pageIndex: number;
  pageCount: number;
  setPageIndex: (page: number) => void;
}) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => setPageIndex(pageIndex - 1)} />
        </PaginationItem>
        {new Array(pageCount).fill(0).map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              onClick={() => setPageIndex(index)}
              isActive={index === pageIndex}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext onClick={() => setPageIndex(pageIndex + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
