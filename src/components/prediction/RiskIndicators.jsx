import React from "react";
import { ShieldCheck, Crosshair } from "lucide-react";

export const RiskScore = ({ probability }) => {
  const percentage = Math.round(probability * 100);
  
  return (
    <div className="flex flex-col h-full bg-white p-5 rounded-2xl border border-[var(--color-border)] shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <ShieldCheck size={18} className="text-[var(--color-forest)]" />
        <span className="text-[13px] font-semibold text-[var(--color-text-secondary)]">Readmission Risk</span>
      </div>
      
      <div className="flex flex-col items-center justify-center flex-1 my-2">
        <span className="text-[48px] font-bold text-[var(--color-text-primary)] leading-none">{percentage}%</span>
        <span className="text-sm text-[var(--color-text-muted)] mt-1">({probability.toFixed(2)} probability)</span>
      </div>

      <div className="mt-4">
        <div className="w-full h-2 bg-[var(--color-sage-light)] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[var(--color-forest)] rounded-full transition-all duration-1000" 
            style={{ width: `${Math.min(percentage, 100)}%` }} 
          />
        </div>
        <p className="text-xs text-[var(--color-text-muted)] mt-2">Lower risk of readmission</p>
      </div>
    </div>
  );
};

export const RiskBadge = ({ isHighRisk }) => {
  const badgeColor = isHighRisk ? "var(--color-high-risk)" : "var(--color-low-risk)";
  const badgeBg = isHighRisk ? "var(--color-high-risk-bg)" : "var(--color-low-risk-bg)";
  const label = isHighRisk ? "High Risk" : "Low Risk";

  return (
    <div className="flex flex-col h-full bg-white p-5 rounded-2xl border border-[var(--color-border)] shadow-sm">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Crosshair size={18} className="text-[var(--color-amber)]" />
        <span className="text-[13px] font-semibold text-[var(--color-text-secondary)]">Risk Category</span>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center">
        <div 
          className="px-6 py-3 rounded-full text-lg font-bold border"
          style={{ backgroundColor: badgeBg, color: badgeColor, borderColor: `${badgeColor}30` }}
        >
          {label}
        </div>
      </div>
      
      <p className="text-xs text-center text-[var(--color-text-muted)] mt-4">Based on 15% threshold</p>
    </div>
  );
};

export const SimilarCaseCard = ({ rate, ragEnabled = true }) => {
  const percentage = Math.round(rate * 100);

  return (
    <div className="flex flex-col h-full bg-[#FFFDF8] p-5 rounded-2xl border border-[#EEE7D9] shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-[var(--color-amber-light)] flex items-center justify-center text-[var(--color-amber)]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        </div>
        <span className="text-[13px] font-semibold text-[var(--color-text-secondary)] leading-tight">Similar Case<br/>Readmission Rate</span>
      </div>
      
      <div className="flex flex-col items-center justify-center flex-1 my-2">
        <span className="text-[48px] font-bold text-[var(--color-text-primary)] leading-none">{percentage}%</span>
        <span className="text-sm text-[var(--color-text-muted)] mt-1">({rate.toFixed(1)})</span>
      </div>

      {ragEnabled && (
        <p className="text-xs text-center text-[var(--color-text-muted)] mt-4">Among 10 similar patients</p>
      )}
    </div>
  );
};
