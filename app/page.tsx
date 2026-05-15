
'use client';

import { useState, useEffect } from 'react';
import { PatientForm } from '@/public/Pages/PatientForm';
import { PatientList } from '@/public/Pages/PatientList';
import { usePatients } from '@/public/hooks/usePatiens';
import type { Patient, TabView } from '@/public/types';
import { UserPlus, List, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabView>('form');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const {
    patients, loading,
    searchQuery, sortConfig, currentPage, totalPages,
    paginatedPatients, totalFiltered,
    setSearchQuery, setSortConfig, setCurrentPage,
    addPatient, deletePatient,
  } = usePatients();

  function handlePatientAdded(patient: Patient) {
    addPatient(patient);
    setSuccessMsg(`Pasien ${patient.name} berhasil didaftarkan sebagai pasien rawat inap.`);
    setTimeout(() => setSuccessMsg(null), 4000);
  }

  function switchToList() {
    setActiveTab('list');
    setSuccessMsg(null);
  }

  function switchToForm() {
    setActiveTab('form');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-6 space-y-4">

        {/* Header */}
        <header className="flex items-center justify-between rounded-xl border bg-white px-5 py-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-600" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-semibold text-gray-800">Modul Rawat Inap</h1>
              <p className="text-xs text-muted-foreground">Manajemen Pasien Masuk</p>
            </div>
          </div>

          <div
            className="flex items-center gap-1.5 text-xs text-muted-foreground"
            aria-live="polite"
            aria-label={`${patients.length} pasien aktif`}
          >
            <Users className="size-4" aria-hidden="true" />
            <span>{patients.length} pasien aktif</span>
          </div>
        </header>

        {/* Tab Bar */}
        <nav
          role="tablist"
          aria-label="Navigasi modul rawat inap"
          className="flex gap-1 rounded-lg border bg-gray-100 p-1"
        >
          <button
            role="tab"
            aria-selected={activeTab === 'form'}
            onClick={switchToForm}
            className={cn(
              'flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all',
              activeTab === 'form'
                ? 'bg-white text-gray-900 shadow-sm ring-0.5 ring-gray-200'
                : 'text-muted-foreground hover:bg-white/60 hover:text-gray-700'
            )}
          >
            <UserPlus className="size-4" aria-hidden="true" />
            Pasien Masuk
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'list'}
            onClick={switchToList}
            className={cn(
              'flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all',
              activeTab === 'list'
                ? 'bg-white text-gray-900 shadow-sm ring-0.5 ring-gray-200'
                : 'text-muted-foreground hover:bg-white/60 hover:text-gray-700'
            )}
          >
            <List className="size-4" aria-hidden="true" />
            Daftar Pasien
            <span
              className="rounded-full bg-blue-600 px-2 py-0.5 text-[11px] font-medium text-white"
              aria-label={`${patients.length} pasien`}
            >
              {patients.length}
            </span>
          </button>
        </nav>

        {/* Main Content */}
        <main>
          {activeTab === 'form' && (
            <PatientForm
              onSuccess={handlePatientAdded}
              onViewList={switchToList}
              successMessage={successMsg}
            />
          )}
          {activeTab === 'list' && (
            <PatientList
              patients={patients}
              loading={loading}
              searchQuery={searchQuery}
              sortConfig={sortConfig}
              currentPage={currentPage}
              totalPages={totalPages}
              paginatedPatients={paginatedPatients}
              totalFiltered={totalFiltered}
              onSearchChange={setSearchQuery}
              onSortChange={setSortConfig}
              onPageChange={setCurrentPage}
              onDelete={deletePatient}
              onAddNew={switchToForm}
            />
          )}
        </main>

      </div>
    </div>
  );
}