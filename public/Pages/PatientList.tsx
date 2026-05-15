import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ConfirmModal } from '../components/ConfirmationButton';
import { Pagination } from '../components/Pagination';
import type { SortConfig, Patient } from '../types';
import { Search, Users, Plus, X, Trash2, Loader2 } from 'lucide-react';
import { PAGE_SIZE } from '../data/constants';

interface PatientListProps {
  patients: Patient[];
  loading: boolean;
  searchQuery: string;
  sortConfig: SortConfig;
  currentPage: number;
  totalPages: number;
  paginatedPatients: Patient[];
  totalFiltered: number;
  onSearchChange: (q: string) => void;
  onSortChange: (config: SortConfig) => void;
  onPageChange: (page: number) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

function formatDate(d: string): string {
  if (!d) return '-';
  const [y, m, dd] = d.split('-');
  return `${dd}/${m}/${y}`;
}

function getRoomVariant(room: string): 'default' | 'secondary' | 'outline' {
  if (room.includes('VIP')) return 'default';
  if (room.includes('Mawar')) return 'secondary';
  return 'outline';
}

type SortOption = { value: string; label: string };
const SORT_OPTIONS: SortOption[] = [
  { value: 'name|asc',          label: 'Nama (A–Z)' },
  { value: 'name|desc',         label: 'Nama (Z–A)' },
  { value: 'tanggalMasuk|asc',  label: 'Tanggal (Terlama)' },
  { value: 'tanggalMasuk|desc', label: 'Tanggal (Terbaru)' },
];

export function PatientList({
  loading, searchQuery, sortConfig, currentPage, totalPages,
  paginatedPatients, totalFiltered, patients,
  onSearchChange, onSortChange, onPageChange, onDelete, onAddNew,
}: PatientListProps) {
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const sortValue = `${sortConfig.field}|${sortConfig.dir}`;

  function handleSortChange(value: string) {
    const [field, dir] = value.split('|') as [SortConfig['field'], SortConfig['dir']];
    onSortChange({ field, dir });
  }

  function handleDeleteConfirm() {
    if (deleteTargetId) {
      onDelete(deleteTargetId);
      setDeleteTargetId(null);
    }
  }

  const deleteTarget = patients.find((p) => p.id === deleteTargetId);

  // ── Loading State ──────────────────────────────────
  if (loading) {
    return (
      <div className="rounded-xl border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">#</TableHead>
              <TableHead>Nama Pasien</TableHead>
              <TableHead>NIK</TableHead>
              <TableHead>Diagnosa</TableHead>
              <TableHead>Tgl Masuk</TableHead>
              <TableHead>Dokter</TableHead>
              <TableHead>Ruangan</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={8}>
                <div
                  role="status"
                  aria-live="polite"
                  className="flex flex-col items-center justify-center gap-2 py-16 text-sm text-muted-foreground"
                >
                  <Loader2 className="size-6 animate-spin" />
                  Memuat data pasien...
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  // ── Main Render ────────────────────────────────────
  return (
    <div className="space-y-3">

      {/* Toolbar */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            type="search"
            placeholder="Cari nama atau NIK..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
            aria-label="Cari pasien berdasarkan nama atau NIK"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground whitespace-nowrap">Urutkan:</span>
          <Select value={sortValue} onValueChange={handleSortChange}>
            <SelectTrigger className="w-44" aria-label="Urutan tampilan data">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <Table aria-label="Daftar pasien rawat inap aktif">
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-10 text-xs">#</TableHead>
              <TableHead className="text-xs">Nama Pasien</TableHead>
              <TableHead className="text-xs hidden md:table-cell">NIK</TableHead>
              <TableHead className="text-xs hidden lg:table-cell">Diagnosa</TableHead>
              <TableHead className="text-xs">Tgl Masuk</TableHead>
              <TableHead className="text-xs hidden md:table-cell">Dokter</TableHead>
              <TableHead className="text-xs">Ruangan</TableHead>
              <TableHead className="w-12" aria-label="Aksi" />
            </TableRow>
          </TableHeader>
          <TableBody>

            {/* Empty State */}
            {paginatedPatients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8}>
                  <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
                    <Users className="size-10 text-muted-foreground/30" aria-hidden="true" />
                    {searchQuery ? (
                      <>
                        <p className="text-sm font-medium text-muted-foreground">Tidak ada hasil pencarian</p>
                        <p className="text-xs text-muted-foreground/70">
                          Tidak ditemukan pasien dengan kata kunci &ldquo;{searchQuery}&rdquo;
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => onSearchChange('')}
                        >
                          <X className="size-3" />
                          Hapus pencarian
                        </Button>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-medium text-muted-foreground">Belum ada pasien terdaftar</p>
                        <p className="text-xs text-muted-foreground/70">
                          Gunakan formulir Pasien Masuk untuk mendaftarkan pasien baru.
                        </p>
                        <Button size="sm" className="mt-2" onClick={onAddNew}>
                          <Plus className="size-3" />
                          Tambah Pasien
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (

              // Data Rows
              paginatedPatients.map((patient, i) => {
                const rowNum = (currentPage - 1) * PAGE_SIZE + i + 1;
                const avatarColors = patient.name.charCodeAt(0) % 2 === 0
                  ? 'bg-blue-50 text-blue-800'
                  : 'bg-teal-50 text-teal-800';

                return (
                  <TableRow key={patient.id} className="hover:bg-gray-50/50">

                    {/* No */}
                    <TableCell className="text-xs text-muted-foreground">{rowNum}</TableCell>

                    {/* Nama */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-medium ${avatarColors}`}
                          aria-hidden="true"
                        >
                          {getInitials(patient.name)}
                        </div>
                        <span className="max-w-30 truncate text-sm" title={patient.name}>
                          {patient.name}
                        </span>
                      </div>
                    </TableCell>

                    {/* NIK */}
                    <TableCell className="hidden font-mono text-xs text-muted-foreground md:table-cell" title={patient.nik}>
                      {patient.nik}
                    </TableCell>

                    {/* Diagnosa */}
                    <TableCell className="hidden max-w-35 truncate text-xs lg:table-cell" title={patient.diagnosa}>
                      {patient.diagnosa}
                    </TableCell>

                    {/* Tanggal */}
                    <TableCell className="text-xs">{formatDate(patient.tanggalMasuk)}</TableCell>

                    {/* Dokter */}
                    <TableCell className="hidden max-w-30 truncate text-xs text-muted-foreground md:table-cell" title={patient.dokter}>
                      {patient.dokter.replace('Dr. ', '').split(',')[0]}
                    </TableCell>

                    {/* Ruangan */}
                    <TableCell>
                      <Badge variant={getRoomVariant(patient.ruangan)} className="text-xs whitespace-nowrap">
                        {patient.ruangan}
                      </Badge>
                    </TableCell>

                    {/* Aksi */}
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-muted-foreground hover:text-red-600 hover:bg-red-50"
                        onClick={() => setDeleteTargetId(patient.id)}
                        aria-label={`Hapus pasien ${patient.name}`}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </TableCell>

                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {totalFiltered > 0 && (
          <div className="border-t bg-gray-50 px-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalFiltered={totalFiltered}
              onPageChange={onPageChange}
              hasFilter={!!searchQuery}
            />
          </div>
        )}
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        open={!!deleteTargetId}
        onOpenChange={(open) => !open && setDeleteTargetId(null)}
        patientName={deleteTarget?.name ?? ''}
        onConfirm={handleDeleteConfirm}
      />

    </div>
  );
}