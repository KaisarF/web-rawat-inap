import { PatientFormData,FormErrors } from "../types";

export function validatePatientFrom(data:PatientFormData):FormErrors{
    const errors:FormErrors={};

    if(!data.name.trim()){
        errors.name="Nama tidak boleh kosong";
    }else if(data.name.trim().length<3){
        errors.name="Nama harus terdiri dari minimal 3 karakter";
    }


    if(!data.nik.trim()){
        errors.nik="NIK tidak boleh kosong";
    }else if(!/^\d{16}$/.test(data.nik.trim())){
        errors.nik="NIK harus terdiri dari 16 karakter";
    }

    if(!data.diagnosa){
        errors.diagnosa="Diagnosa tidak boleh kosong";
    }
    if(!data.tanggalMasuk){
        errors.tanggalMasuk="Tanggal masuk tidak boleh kosong";
    }else{
        const inputDate=new Date(data.tanggalMasuk);
        const today=new Date();
        today.setHours(23, 59, 59, 999); 
        if(inputDate>today){
            errors.tanggalMasuk="Tanggal masuk tidak boleh di masa depan";
        }
    }
    if(!data.dokter){
        errors.dokter="Dokter tidak boleh kosong";
    }
    if(!data.ruangan){
        errors.ruangan="Ruangan tidak boleh kosong";
    }
    return errors;
}