import React from "react";
import Card from "../common/Card";
import { BarChart3, Users, FileText } from "lucide-react";

const PredictionInitialState = () => {
  return (
    <Card className="flex flex-col items-center justify-center min-h-[600px] bg-gradient-to-br from-[#F7F9F6] to-white border-2 border-dashed border-[#C5D7C7] rounded-[24px] p-10 text-center relative overflow-hidden">
      <div className="max-w-[520px] w-full flex flex-col items-center">
        
        {/* Medical Document Illustration */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* Organic background oval blob */}
          <div className="w-44 h-32 bg-[#E5F0E5] rounded-[50%] blur-[1px] transform -rotate-6" />
          
          {/* Document Card Icon */}
          <div className="absolute bg-white border-2 border-[var(--color-forest)] rounded-xl w-24 h-28 shadow-sm flex flex-col p-3 z-10 transform -rotate-1">
            {/* Folded corner effect top right */}
            <div className="absolute top-0 right-0 border-t-[14px] border-t-transparent border-r-[14px] border-r-[var(--color-forest)] border-b-0 border-l-0" />
            
            {/* Green Cross Icon */}
            <div className="text-[var(--color-forest)] font-extrabold text-xl leading-none mb-2.5">
              +
            </div>

            {/* Document Lines */}
            <div className="space-y-1.5 w-full">
              <div className="w-3/4 h-1.5 bg-[#8EAB98] rounded-full" />
              <div className="w-full h-1 bg-[#BFD0C4] rounded-full" />
              <div className="w-4/5 h-1 bg-[#BFD0C4] rounded-full" />
            </div>
          </div>

          {/* Radiating Accent Lines on top right */}
          <svg 
            className="absolute -top-3 right-8 w-8 h-8 text-[var(--color-forest)] z-20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round"
          >
            <path d="M12 4V2" />
            <path d="M18 7l1.5-1.5" />
            <path d="M20 13h2" />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-[26px] font-bold font-display text-[var(--color-text-primary)] mb-3 leading-tight">
          Prediction Results Will Appear Here
        </h2>

        {/* Subtitle */}
        <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed max-w-[380px] mb-10">
          Fill in the patient information on the left and click the “Predict Readmission Risk” button to see the results.
        </p>

        {/* Divider */}
        <div className="w-full border-t border-[#DFE8DF] mb-8" />

        {/* Bottom Feature Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-[440px]">
          <div className="flex items-center gap-3 text-left">
            <div className="w-11 h-11 rounded-full bg-[#E3EFE3] text-[var(--color-forest)] flex items-center justify-center shrink-0">
              <BarChart3 size={20} />
            </div>
            <span className="text-[13px] font-semibold text-[var(--color-text-primary)] leading-tight">
              Readmission Risk
            </span>
          </div>

          <div className="flex items-center gap-3 text-left">
            <div className="w-11 h-11 rounded-full bg-[#E3EFE3] text-[var(--color-forest)] flex items-center justify-center shrink-0">
              <Users size={20} />
            </div>
            <span className="text-[13px] font-semibold text-[var(--color-text-primary)] leading-tight">
              Similar Cases Analysis
            </span>
          </div>

          <div className="flex items-center gap-3 text-left">
            <div className="w-11 h-11 rounded-full bg-[#E3EFE3] text-[var(--color-forest)] flex items-center justify-center shrink-0">
              <FileText size={20} />
            </div>
            <span className="text-[13px] font-semibold text-[var(--color-text-primary)] leading-tight">
              Patient Summary
            </span>
          </div>
        </div>

      </div>
    </Card>
  );
};

export default PredictionInitialState;
