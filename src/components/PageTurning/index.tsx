"use client";

import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationContent,
  PaginationEllipsis,
  PaginationPrevious,
} from "../ui/pagination";

interface PaginationWithLinksProps {
  current: number;
  pageSize: number;
  total?: number;
  radius?: boolean;
  className?: string;
  onChange?(current?: number): void;
}

const PaginationWithLinks: React.FC<PaginationWithLinksProps> = ({
  radius,
  current,
  pageSize,
  onChange,
  className = "",
  total = 0,
}) => {
  const style = radius ? `cursor-pointer rounded-full` : `cursor-pointer`;

  const totalPageCount = Math.ceil(total / pageSize);

  const renderPageNumbers = () => {
    const items: React.ReactNode[] = [];
    const maxVisiblePages = 5;

    if (totalPageCount <= maxVisiblePages) {
      for (let i = 1; i <= totalPageCount; i++) {
        items.push(
          <PaginationItem key={i} onClick={() => onChange?.(i)}>
            <PaginationLink isActive={current === i} className={style}>
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }
    } else {
      items.push(
        <PaginationItem key={1} onClick={() => onChange?.(1)}>
          <PaginationLink isActive={current === 1} className={style}>
            1
          </PaginationLink>
        </PaginationItem>,
      );

      if (current > 3) {
        items.push(
          <PaginationItem key="ellipsis-start" className={style}>
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }

      const start = Math.max(2, current - 1);
      const end = Math.min(totalPageCount - 1, current + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i} onClick={() => onChange?.(i)}>
            <PaginationLink isActive={current === i} className={style}>
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }

      if (current < totalPageCount - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }

      items.push(
        <PaginationItem
          key={totalPageCount}
          onClick={() => onChange?.(totalPageCount)}
        >
          <PaginationLink
            className={style}
            isActive={current === totalPageCount}
          >
            {totalPageCount}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return items;
  };

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={current === 1}
            tabIndex={current === 1 ? -1 : undefined}
            className={`${style} w-[36px] h-[36px] px-0 py-0 ${
              current === 1 || !total ? `opacity-50` : ""
            }`}
            onClick={
              current === 1 || !total
                ? undefined
                : () => onChange?.(Math.max(current - 1, 1))
            }
          />
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          <PaginationNext
            aria-disabled={current === totalPageCount}
            tabIndex={current === totalPageCount ? -1 : undefined}
            className={`${style} w-[36px] h-[36px] px-0 py-0  ${
              current === totalPageCount || !total ? `opacity-50` : ""
            }`}
            onClick={
              current === totalPageCount || !total
                ? undefined
                : () => onChange?.(Math.min(current + 1, totalPageCount))
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationWithLinks;
