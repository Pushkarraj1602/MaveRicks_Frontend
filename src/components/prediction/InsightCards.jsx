import React from "react";
import { FileText, Copy, Lightbulb } from "lucide-react";

export const PatientSummary = ({ summary }) => {
  return (
    <div className="bg-[#F8F5ED] rounded-2xl p-5 border border-[#EEE7D9]">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-[var(--color-amber)]" />
          <span className="text-[14px] font-semibold text-[var(--color-text-primary)]">Patient Summary</span>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#DDE4DF] rounded-lg text-xs font-semibold text-[var(--color-text-secondary)] hover:bg-slate-50 transition-colors">
          <Copy size={14} />
          Copy
        </button>
      </div>
      
      <p className="text-[14px] leading-[1.6] text-[var(--color-text-primary)]">
        {summary}
      </p>
    </div>
  );
};

export const ClinicalInsight = ({ isHighRisk }) => {
  return (
    <div className="bg-[#EAF5EC] border border-[#D5E9D9] rounded-[20px] p-[22px] flex items-start gap-4">
      <div className="w-10 h-10 shrink-0 rounded-full bg-[var(--color-low-risk)] flex items-center justify-center text-white shadow-sm mt-1">
        <Lightbulb size={20} />
      </div>
      <div>
        <h4 className="text-[15px] font-bold text-[var(--color-text-primary)] mb-1">Clinical Insight</h4>
        <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed">
          {isHighRisk 
            ? "This patient shows an elevated risk of readmission. Prioritize enhanced discharge planning, immediate follow-up scheduling, and close medication reconciliation."
            : "This patient has a lower predicted risk of readmission. However, continue with standard discharge planning and follow-up care as per hospital protocol."
          }
        </p>
      </div>
    </div>
  );
};
