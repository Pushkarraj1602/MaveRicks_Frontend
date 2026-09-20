import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import PatientForm from "../components/patient/PatientForm";
import PredictionResults from "../components/prediction/PredictionResults";
import PredictionInitialState from "../components/prediction/PredictionInitialState";
import PredictionLoadingState from "../components/prediction/PredictionLoadingState";
import { usePrediction } from "../hooks/usePrediction";
import { historyService } from "../services/historyService";
import heroImg from "../assets/hero-stethoscope.png";

const PredictionPage = () => {
  const { data, loading, error, predict } = usePrediction();
  const [formData, setFormData] = React.useState(null);

  const handlePredict = async (patientFormData) => {
    setFormData(patientFormData); // Save form data
    await predict(patientFormData);
  };

  // Save to history when prediction is made
  React.useEffect(() => {
    if (data && !loading && formData) {
      // Merge form data (including patient_name) with prediction result
      const historyData = {
        ...data,
        patient_name: formData.patient_name,
      };
      historyService.savePrediction(historyData);
    }
  }, [data, loading, formData]);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Hero Banner Area */}
        <div className="relative w-full h-[160px] rounded-[24px] overflow-hidden mb-8 shadow-sm border border-[var(--color-border)]">
        <img 
          src={heroImg} 
          alt="Healthcare hero" 
          className="w-full h-full object-cover object-center"
        />
        {/* Left fade overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ivory)] via-[#F7F5EF88] to-transparent w-[55%]" />
        
        {/* Left Text */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 max-w-[45%]">
          <p className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <span className="inline-block w-4 h-4 rounded-full border-2 border-[var(--color-sage)] flex items-center justify-center text-[8px]">◎</span>
            READMISSION RISK PREDICTION
          </p>
          <h2 className="text-[36px] font-display font-semibold text-[var(--color-text-primary)] leading-[1.05] mb-1.5 tracking-tight">
            Understand Today.<br/>Prevent Tomorrow.
          </h2>
          <p className="text-[13px] text-[var(--color-text-secondary)] font-medium">
            Use AI to predict the risk of patient readmission and support better clinical decisions.
          </p>
        </div>

        {/* Right Quote Card */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 bg-[#F7F5EF]/95 backdrop-blur-sm rounded-2xl px-5 py-4 max-w-[200px] shadow-sm border border-[var(--color-border)]">
          <span className="text-[var(--color-amber)] text-3xl font-bold leading-none block mb-1">"</span>
          <p className="text-[12px] text-[var(--color-text-primary)] leading-[1.5] font-medium">
            Data-driven care leads to more time for what truly matters - the patient.
          </p>
          <div className="w-6 h-[3px] bg-[var(--color-forest)] rounded-full mt-2.5"></div>
        </div>
      </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 font-medium">
             {error}
          </div>
        )}

        {/* Main Grid - Better spacing */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
          <PatientForm onSubmit={handlePredict} loading={loading} />
          
          <div className="xl:sticky xl:top-6">
            {loading ? (
              <PredictionLoadingState />
            ) : data ? (
              <PredictionResults data={data} patientName={formData?.patient_name} />
            ) : (
              <PredictionInitialState />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PredictionPage;
