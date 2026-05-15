import { PAGE_SIZE } from '../data/constants';
import { Button } from '@/components/ui/button';
import { ChevronLeft,ChevronRight } from 'lucide-react';
import {cn} from '@/lib/utils';
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalFiltered: number;
  onPageChange: (page: number) => void;
  hasFilter: boolean;
}

export function Pagination({ 
  currentPage, 
  totalPages, 
  totalFiltered, 
  onPageChange, 
  hasFilter }: PaginationProps) {
  const start = Math.min((currentPage - 1) * PAGE_SIZE + 1, totalFiltered);
  const end = Math.min(currentPage * PAGE_SIZE, totalFiltered);

  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-xs text-muted-foreground">
        Menampilkan {start}–{end} dari {totalFiltered} pasien{hasFilter ? ' (difilter)' : ''}
      </span>

      <nav  className="flex items-center gap-2" role="navigation" aria-label="Navigasi halaman">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Halaman sebelumnya"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant="outline"
            size="icon"
            className={cn(
              'size-8 text-xs',
              page === currentPage && 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:text-white'
            )}
            onClick={() => onPageChange(page)}
            aria-label={`Halaman ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Halaman berikutnya"
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </Button>
      </nav>
    </div>
  );
};
