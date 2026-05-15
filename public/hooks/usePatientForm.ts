import { useState } from "react";
import type { PatientFormData, FormErrors } from "../types";
import { validatePatientFrom } from "./useValidation";

const FORM_INIT:PatientFormData={
    name:'',
    nik:'',
    diagnosa:'',
    tanggalMasuk:'',
    dokter:'',
    ruangan:'',
}

interface UsePatientFormResult {
    formData:PatientFormData;
    errors:FormErrors;
    submitting:boolean;
    setField:<K extends keyof PatientFormData>(
        field:K, 
        value:PatientFormData[K]
    ) => void;
    handleSubmit:() => Promise<PatientFormData | null>;
    resetForm: () => void;
}

export function usePatients():UsePatientFormResult{
    const [formData,setFormData]=useState<PatientFormData>(FORM_INIT);
    const [errors,setErrors]=useState<FormErrors>({});
    const [submitting,setSubmitting]=useState(false);

    function setField<K extends keyof PatientFormData>(field:K,value:PatientFormData[K]){
        setFormData(prev=>({
            ...prev,
            [field]:value,
        }));
        setErrors((prev) => {
            const next = { ...prev };
            delete next[field];
            return next;
        });
    }
    
    async function handleSubmit():Promise<PatientFormData | null>{
        const validationErrors=validatePatientFrom(formData);
        if(Object.keys(validationErrors).length>0){
            setErrors(validationErrors);
            return null;
        }
        setSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSubmitting(false);
        
        const submittedData={
            ...formData,
            name: formData.name.trim(),
            nik: formData.nik.trim(),
            diagnosa: formData.diagnosa.trim(),
        };

        setFormData({...FORM_INIT});
        setErrors({});
        
        return submittedData;
    }

    function resetForm() {
    setFormData({ ...FORM_INIT });
    setErrors({});
    }

    return {
        formData,
        errors,
        submitting,
        setField,
        handleSubmit,
        resetForm,
    };
}