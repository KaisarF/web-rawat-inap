import { FormField } from '../components/FormField';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePatients } from '../hooks/usePatientForm';
import { DOCTORS, ROOMS, DIAGNOSES } from '../data/constants';
import type { Patient } from '../types';
import { CheckCircle, UserPlus, RotateCcw } from 'lucide-react';

interface PatientFormProps {
  onSuccess: (patient: Patient) => void;
  onViewList: () => void;
  successMessage: string | null;
}

function generateId(total: number): string {
  return 'P' + String(total + 1).padStart(3, '0') + '_' + Date.now().toString(36).slice(-4).toUpperCase();
}

export function PatientForm({ onSuccess, onViewList, successMessage }: PatientFormProps) {
  const { formData, errors, submitting, setField, handleSubmit, resetForm } = usePatients();

  async function onSubmit() {
    const data = await handleSubmit();
    if (data) {
      const newPatient: Patient = {
        id: generateId(Math.floor(Math.random() * 100)),
        ...data,
      };
      onSuccess(newPatient);
    }
  }

  return (
    <div className="space-y-4">

      {/* Success Toast */}
      {successMessage && (
        <div
          role="status"
          className="flex items-center gap-3 rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-700"
        >
          <CheckCircle className="size-5 shrink-0" />
          <span>{successMessage}</span>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto"
            onClick={onViewList}
          >
            Lihat Daftar
          </Button>
        </div>
      )}

      {/* Form Card */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">

        {/* Section Title */}
        <div className="mb-5 flex items-center gap-2 text-sm font-medium text-gray-700">
          <UserPlus className="size-4" />
          Data Pasien Baru
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* Nama */}
          <FormField label="Nama Lengkap" required error={errors.name}>
            <Input
              value={formData.name}
              placeholder="Contoh: Budi Santoso"
              onChange={(e) => setField('name', e.target.value)}
              disabled={submitting}
              aria-label="Nama lengkap pasien"
              className={errors.name ? 'border-red-400 focus-visible:ring-red-300' : ''}
            />
          </FormField>

          {/* NIK */}
          <FormField label="NIK (16 digit)" required error={errors.nik}>
            <Input
              value={formData.nik}
              placeholder="Contoh: 3578012312870001"
              maxLength={16}
              inputMode="numeric"
              onChange={(e) => setField('nik', e.target.value.replace(/\D/g, ''))}
              disabled={submitting}
              aria-label="NIK pasien 16 digit"
              className={errors.nik ? 'border-red-400 focus-visible:ring-red-300' : ''}
            />
          </FormField>

          {/* Diagnosa — full width */}
          <FormField label="Diagnosa Masuk" required error={errors.diagnosa} fullWidth>
            <Input
              value={formData.diagnosa}
              placeholder="Contoh: Demam Berdarah Dengue"
              list="diagnosa-list"
              onChange={(e) => setField('diagnosa', e.target.value)}
              disabled={submitting}
              aria-label="Diagnosa masuk pasien"
              className={errors.diagnosa ? 'border-red-400 focus-visible:ring-red-300' : ''}
            />
            <datalist id="diagnosa-list">
              {DIAGNOSES.map((d) => <option key={d} value={d} />)}
            </datalist>
          </FormField>

          {/* Tanggal Masuk */}
          <FormField label="Tanggal Masuk" required error={errors.tanggalMasuk}>
            <Input
              type="date"
              value={formData.tanggalMasuk}
              onChange={(e) => setField('tanggalMasuk', e.target.value)}
              disabled={submitting}
              aria-label="Tanggal masuk rawat inap"
              className={errors.tanggalMasuk ? 'border-red-400 focus-visible:ring-red-300' : ''}
            />
          </FormField>

          {/* Dokter */}
          <FormField label="Dokter Penanggung Jawab" required error={errors.dokter}>
            <Select
              value={formData.dokter}
              onValueChange={(val) => setField('dokter', val)}
              disabled={submitting}
            >
              <SelectTrigger
                aria-label="Pilih dokter penanggung jawab"
                className={errors.dokter ? 'border-red-400 focus:ring-red-300' : ''}
              >
                <SelectValue placeholder="-- Pilih dokter --" />
              </SelectTrigger>
              <SelectContent>
                {DOCTORS.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          {/* Ruangan */}
          <FormField label="Ruangan" required error={errors.ruangan}>
            <Select
              value={formData.ruangan}
              onValueChange={(val) => setField('ruangan', val)}
              disabled={submitting}
            >
              <SelectTrigger
                aria-label="Pilih ruangan rawat inap"
                className={errors.ruangan ? 'border-red-400 focus:ring-red-300' : ''}
              >
                <SelectValue placeholder="-- Pilih ruangan --" />
              </SelectTrigger>
              <SelectContent>
                {ROOMS.map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-2 border-t pt-4">
          <Button
            variant="outline"
            onClick={resetForm}
            disabled={submitting}
          >
            <RotateCcw className="size-4" />
            Reset
          </Button>
          <Button
            onClick={onSubmit}
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Menyimpan...
              </>
            ) : (
              <>
                <CheckCircle className="size-4" />
                Daftarkan Pasien
              </>
            )}
          </Button>
        </div>

      </div>
    </div>
  );
}