import type { Patient } from '../types';

export const ROOMS: string[] = [
  'Mawar 101',
  'Mawar 102',
  'Melati 201',
  'Melati 202',
  'Anggrek 301',
  'Anggrek 302',
  'VIP Dahlia 1',
  'VIP Dahlia 2',
];

export const DOCTORS: string[] = [
  'Dr. Andi Wijaya, Sp.PD',
  'Dr. Sari Kusuma, Sp.A',
  'Dr. Budi Santoso, Sp.JP',
  'Dr. Ratna Dewi, Sp.OG',
  'Dr. Hendra Putra, Sp.N',
];

export const DIAGNOSES: string[] = [
  'Demam Berdarah Dengue',
  'Pneumonia',
  'Appendisitis Akut',
  'Hipertensi Stage 2',
  'Diabetes Mellitus Tipe 2',
  'Fraktur Femur',
  'Stroke Iskemik',
  'Gagal Jantung Kongestif',
];

export const MOCK_PATIENTS: Patient[] = [
  { id: 'P001', name: 'Budi Hartono',       nik: '3578011203870001', diagnosa: 'Demam Berdarah Dengue',    tanggalMasuk: '2024-01-15', dokter: 'Dr. Andi Wijaya, Sp.PD',  ruangan: 'Mawar 101'    },
  { id: 'P002', name: 'Siti Rahayu',        nik: '3578025506910002', diagnosa: 'Pneumonia',               tanggalMasuk: '2024-01-16', dokter: 'Dr. Sari Kusuma, Sp.A',   ruangan: 'Melati 201'   },
  { id: 'P003', name: 'Ahmad Fauzi',        nik: '3578031207880003', diagnosa: 'Appendisitis Akut',       tanggalMasuk: '2024-01-17', dokter: 'Dr. Budi Santoso, Sp.JP', ruangan: 'Anggrek 301'  },
  { id: 'P004', name: 'Dewi Lestari',       nik: '3578042208950004', diagnosa: 'Hipertensi Stage 2',      tanggalMasuk: '2024-01-18', dokter: 'Dr. Ratna Dewi, Sp.OG',   ruangan: 'VIP Dahlia 1' },
  { id: 'P005', name: 'Rizky Pratama',      nik: '3578050905920005', diagnosa: 'Diabetes Mellitus Tipe 2',tanggalMasuk: '2024-01-19', dokter: 'Dr. Hendra Putra, Sp.N',  ruangan: 'Melati 202'   },
  { id: 'P006', name: 'Endah Sulistyowati', nik: '3578061104960006', diagnosa: 'Fraktur Femur',           tanggalMasuk: '2024-01-20', dokter: 'Dr. Andi Wijaya, Sp.PD',  ruangan: 'Mawar 102'    },
  { id: 'P007', name: 'Hendra Kurniawan',   nik: '3578070803900007', diagnosa: 'Stroke Iskemik',          tanggalMasuk: '2024-01-21', dokter: 'Dr. Hendra Putra, Sp.N',  ruangan: 'Anggrek 302'  },
  { id: 'P008', name: 'Nur Aini',           nik: '3578082506930008', diagnosa: 'Gagal Jantung Kongestif', tanggalMasuk: '2024-01-22', dokter: 'Dr. Budi Santoso, Sp.JP', ruangan: 'VIP Dahlia 2' },
  { id: 'P009', name: 'Wahyu Setiawan',     nik: '3578091709890009', diagnosa: 'Demam Berdarah Dengue',   tanggalMasuk: '2024-01-23', dokter: 'Dr. Sari Kusuma, Sp.A',   ruangan: 'Mawar 101'    },
  { id: 'P010', name: 'Fitri Handayani',    nik: '3578101012980010', diagnosa: 'Pneumonia',               tanggalMasuk: '2024-01-24', dokter: 'Dr. Ratna Dewi, Sp.OG',   ruangan: 'Melati 201'   },
  { id: 'P011', name: 'Agus Salim',         nik: '3578110607850011', diagnosa: 'Hipertensi Stage 2',      tanggalMasuk: '2024-01-25', dokter: 'Dr. Andi Wijaya, Sp.PD',  ruangan: 'Mawar 102'    },
  { id: 'P012', name: 'Maya Indah',         nik: '3578122908970012', diagnosa: 'Appendisitis Akut',       tanggalMasuk: '2024-01-26', dokter: 'Dr. Budi Santoso, Sp.JP', ruangan: 'Anggrek 301'  },
];

export const PAGE_SIZE = 5;

export const LOAD_DELAY_MS = 500;
