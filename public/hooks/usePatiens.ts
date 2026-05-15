import { useState, useEffect, useMemo } from 'react';
import type { Patient, SortConfig } from '../types';
import { MOCK_PATIENTS, PAGE_SIZE, LOAD_DELAY_MS } from '../data/constants';

interface UsePatientsReturn {
  patients: Patient[];
  loading: boolean;
  searchQuery: string;
  sortConfig: SortConfig;
  currentPage: number;
  totalPages: number;
  paginatedPatients: Patient[];
  totalFiltered: number;
  setSearchQuery: (q: string) => void;
  setSortConfig: (config: SortConfig) => void;
  setCurrentPage: (page: number) => void;
  addPatient: (patient: Patient) => void;
  deletePatient: (id: string) => void;
}

export function usePatients(): UsePatientsReturn {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQueryState] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ field: 'tanggalMasuk', dir: 'desc' });
  const [currentPage, setCurrentPageState] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPatients([...MOCK_PATIENTS]);
      setLoading(false);
    }, LOAD_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const filteredSorted = useMemo(() => {
    let result = [...patients];

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.nik.includes(q)
      );
    }

    result.sort((a, b) => {
      const { field, dir } = sortConfig;
      let va: string | Date = a[field];
      let vb: string | Date = b[field];

      if (field === 'tanggalMasuk') {
        va = new Date(a.tanggalMasuk);
        vb = new Date(b.tanggalMasuk);
      } else {
        va = (va as string).toLowerCase();
        vb = (vb as string).toLowerCase();
      }

      if (va < vb) return dir === 'asc' ? -1 : 1;
      if (va > vb) return dir === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [patients, searchQuery, sortConfig]);

  const totalFiltered = filteredSorted.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / PAGE_SIZE));

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedPatients = useMemo(() => {
    const start = (safeCurrentPage - 1) * PAGE_SIZE;
    return filteredSorted.slice(start, start + PAGE_SIZE);
  }, [filteredSorted, safeCurrentPage]);

  function setSearchQuery(q: string) {
    setSearchQueryState(q);
    setCurrentPageState(1);
  }

  function setCurrentPage(page: number) {
    setCurrentPageState(Math.max(1, Math.min(page, totalPages)));
  }

  function addPatient(patient: Patient) {
    setPatients((prev) => [patient, ...prev]);
    setCurrentPageState(1);
  }

  function deletePatient(id: string) {
    setPatients((prev) => prev.filter((p) => p.id !== id));
  }

  return {
    patients,
    loading,
    searchQuery,
    sortConfig,
    currentPage: safeCurrentPage,
    totalPages,
    paginatedPatients,
    totalFiltered,
    setSearchQuery,
    setSortConfig,
    setCurrentPage,
    addPatient,
    deletePatient,
  };
}
