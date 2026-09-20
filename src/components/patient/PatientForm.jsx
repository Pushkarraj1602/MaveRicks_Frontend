import React, { useState } from "react";
import { RotateCcw, Sparkles, Home, User, Stethoscope, TestTube, Scissors, BedDouble, AlertCircle, Users, ClipboardList, Syringe, Calendar } from "lucide-react";
import Card from "../common/Card";
import { FormField, SelectInput, NumberInput } from "./FormField";

const DIAG_CATEGORIES = [
  "Circulatory", "Other", "Respiratory", "Digestive", "Diabetes",
  "Injury", "Genitourinary", "Musculoskeletal", "Neoplasms",
];
const AGE_OPTIONS = [5, 15, 25, 35, 45, 55, 65, 75, 85, 95];
const INSULIN_OPTIONS = ["No", "Down", "Steady", "Up"];

const PatientForm = ({ onSubmit, loading }) => {
  const [form, setForm] = useState({
    patient_name: "",
    age: 65,
    gender: "Male",
    diag_1: "Circulatory",
    time_in_hospital: 4,
    num_lab_procedures: 40,
    num_procedures: 1,
    n_inpatient: 0,
    n_emergency: 0,
    n_outpatient: 0,
    num_medications: 15,
    number_diagnoses: 7,
    insulin: "No",
    model_type: "random_forest", // New: model selection
    use_rag: true, // New: RAG feature toggle
  });

  const update = (key) => (val) => setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const handleReset = () => {
    setForm({
      patient_name: "",
      age: 65, gender: "Male", diag_1: "Circulatory", time_in_hospital: 4,
      num_lab_procedures: 40, num_procedures: 1, n_inpatient: 0, n_emergency: 0,
      n_outpatient: 0, num_medications: 15, number_diagnoses: 7, insulin: "No",
      model_type: "random_forest", use_rag: true,
    });
  };

  return (
    <Card className="p-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Patient Name - Full Width Section */}
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
            <User size={20} className="text-[var(--color-forest)]" />
            Patient Information
          </h3>
          <FormField label="Patient Name" icon={User}>
            <input
              type="text"
              value={form.patient_name}
              onChange={(e) => update("patient_name")(e.target.value)}
              placeholder="Enter patient full name"
              className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)] focus:border-[var(--color-forest)] text-[var(--color-text-primary)] transition-all"
              required
            />
          </FormField>
        </div>

        {/* Demographics Section */}
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
            <Stethoscope size={20} className="text-[var(--color-forest)]" />
            Demographics & Diagnosis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField label="Age" icon={User}>
              <SelectInput value={form.age} onChange={(v) => update("age")(Number(v))} options={AGE_OPTIONS} />
            </FormField>
            
            <FormField label="Gender" icon={User}>
              <SelectInput value={form.gender} onChange={update("gender")} options={["Male", "Female"]} />
            </FormField>

            <FormField label="Primary Diagnosis (diag_1)" icon={Stethoscope}>
              <SelectInput value={form.diag_1} onChange={update("diag_1")} options={DIAG_CATEGORIES} />
            </FormField>

            <FormField label="Length of Stay (days)" icon={Calendar}>
              <NumberInput value={form.time_in_hospital} onChange={update("time_in_hospital")} min={1} max={14} />
            </FormField>
          </div>
        </div>

        {/* Clinical Procedures Section */}
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
            <TestTube size={20} className="text-[var(--color-forest)]" />
            Clinical Procedures
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField label="Number of Lab Procedures" icon={TestTube}>
              <NumberInput value={form.num_lab_procedures} onChange={update("num_lab_procedures")} min={0} max={132} />
            </FormField>

            <FormField label="Number of Procedures" icon={Scissors}>
              <NumberInput value={form.num_procedures} onChange={update("num_procedures")} min={0} max={6} />
            </FormField>
          </div>
        </div>

        {/* Visit History Section */}
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
            <BedDouble size={20} className="text-[var(--color-forest)]" />
            Visit History
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FormField label="Prior Inpatient Visits" icon={BedDouble}>
              <NumberInput value={form.n_inpatient} onChange={update("n_inpatient")} min={0} max={20} />
            </FormField>

            <FormField label="Prior Emergency Visits" icon={AlertCircle}>
              <NumberInput value={form.n_emergency} onChange={update("n_emergency")} min={0} max={20} />
            </FormField>

            <FormField label="Prior Outpatient Visits" icon={Users}>
              <NumberInput value={form.n_outpatient} onChange={update("n_outpatient")} min={0} max={20} />
            </FormField>
          </div>
        </div>

        {/* Medications Section */}
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
            <ClipboardList size={20} className="text-[var(--color-forest)]" />
            Medications & Diagnoses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FormField label="Number of Medications" icon={ClipboardList}>
              <NumberInput value={form.num_medications} onChange={update("num_medications")} min={1} max={80} />
            </FormField>

            <FormField label="Number of Diagnoses" icon={ClipboardList}>
              <NumberInput value={form.number_diagnoses} onChange={update("number_diagnoses")} min={1} max={16} />
            </FormField>

            <FormField label="Insulin" icon={Syringe}>
              <SelectInput value={form.insulin} onChange={update("insulin")} options={INSULIN_OPTIONS} />
            </FormField>
          </div>
        </div>

        {/* Model Configuration */}
        <div className="pt-4 border-t-2 border-[var(--color-border)]">
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
            <Sparkles size={20} className="text-[var(--color-forest)]" />
            Model Configuration
          </h3>
          
          <div className="bg-gradient-to-br from-[var(--color-mint)] to-[var(--color-sage-light)] p-5 rounded-xl border-2 border-[var(--color-forest)]/10">
            <div className="flex items-end gap-4">
              {/* Model Selection - Expanded */}
              <div className="flex-1">
                <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                  ML Model
                </label>
                <select
                  value={form.model_type}
                  onChange={(e) => update("model_type")(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-[var(--color-forest)]/30 rounded-lg text-sm font-semibold text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)] focus:border-[var(--color-forest)] hover:border-[var(--color-forest)]/50 transition-all cursor-pointer shadow-sm appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23526560%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-10"
                  style={{
                    WebkitAppearance: 'none',
                    MozAppearance: 'none'
                  }}
                >
                  <option value="random_forest">Random Forest (Recommended)</option>
                  <option value="logistic_regression">Logistic Regression</option>
                </select>
              </div>
              
              {/* RAG Toggle - Compact */}
              <div className="flex flex-col">
                <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                  RAG
                </label>
                <label 
                  className="flex items-center justify-center bg-white border-2 border-[var(--color-forest)]/30 rounded-lg cursor-pointer hover:border-[var(--color-forest)]/50 transition-all shadow-sm w-16 h-[50px]"
                  onClick={(e) => {
                    e.preventDefault();
                    update("use_rag")(!form.use_rag);
                  }}
                >
                  <input
                    type="checkbox"
                    checked={form.use_rag}
                    onChange={(e) => {
                      e.stopPropagation();
                      update("use_rag")(e.target.checked);
                    }}
                    className="sr-only peer"
                    tabIndex="-1"
                  />
                  <div className="w-10 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[var(--color-forest)] relative"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-2">
          <button 
            type="button" 
            onClick={handleReset}
            className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] font-semibold hover:bg-[var(--color-mint)] hover:border-[var(--color-forest)]/30 transition-all"
          >
            <RotateCcw size={18} />
            Reset Form
          </button>
          
          <button 
            type="submit" 
            disabled={loading}
            className="predict-btn flex-1 !h-auto py-4 !rounded-xl text-base"
          >
            <Sparkles size={20} />
            {loading ? "Analyzing Patient Data..." : "Predict Readmission Risk"}
          </button>
        </div>
      </form>
    </Card>
  );
};

export default PatientForm;
