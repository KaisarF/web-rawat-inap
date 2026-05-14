export interface Patient {
  id: string;
  name: string;
  nik: string;
  diagnosa: string;
  tanggalMasuk: string;
  dokter: string;
  ruangan: string;
}

export type PatientFormData = Omit<Patient, 'id'>;

export type FormErrors = Partial<Record<keyof PatientFormData, string>>;

export type SortField = 'name' | 'tanggalMasuk';
export type SortDir = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  dir: SortDir;
}

export type TabView = 'form' | 'list';
