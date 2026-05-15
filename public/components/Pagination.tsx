import { PAGE_SIZE } from '../data/constants';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalFiltered: number;
  onPageChange: (page: number) => void;
  hasFilter: boolean;
}

export function Pagination({ currentPage, totalPages, totalFiltered, onPageChange, hasFilter }: PaginationProps) {
  const start = Math.min((currentPage - 1) * PAGE_SIZE + 1, totalFiltered);
  const end = Math.min(currentPage * PAGE_SIZE, totalFiltered);

  return (
    <div className="pagination">
      <span className="pag-info">
        Menampilkan {start}–{end} dari {totalFiltered} pasien{hasFilter ? ' (difilter)' : ''}
      </span>
      <div className="pag-btns" role="navigation" aria-label="Navigasi halaman">
        <button
          className="pag-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Halaman sebelumnya"
        >
          ‹
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`pag-btn${page === currentPage ? ' active' : ''}`}
            onClick={() => onPageChange(page)}
            aria-label={`Halaman ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
        <button
          className="pag-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Halaman berikutnya"
        >
          ›
        </button>
      </div>
    </div>
  );
}
