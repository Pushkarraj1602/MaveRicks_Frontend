import React, { useState, useEffect } from "react";
import Card from "../common/Card";
import { Loader2, Brain, Cpu, ShieldCheck, Sparkles } from "lucide-react";

const STEPS = [
  "Extracting clinical parameters...",
  "Querying FAISS vector index for similar cohorts...",
  "Running Random Forest probability classifier...",
  "Generating patient summary & clinical recommendations..."
];

const PredictionLoadingState = () => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 450);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="flex flex-col h-full bg-[#FCFDFB] border border-[var(--color-border)] justify-between p-6 relative overflow-hidden">
      {/* Background glowing light pulse */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--color-mint)]/50 rounded-full blur-3xl animate-pulse pointer-events-none" />

      <div>
        {/* Header Loading Banner */}
        <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-[var(--color-border)] relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-[var(--color-forest)] text-white flex items-center justify-center shadow-md relative">
            <Loader2 size={24} className="animate-spin text-[var(--color-mint)]" />
          </div>
          <div>
            <h2 className="text-[16px] font-bold text-[var(--color-text-primary)] font-display flex items-center gap-2">
              Analyzing Patient Data
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[var(--color-amber-light)] text-[var(--color-amber)] animate-pulse">
                Processing
              </span>
            </h2>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5 font-medium transition-all duration-300">
              {STEPS[stepIndex]}
            </p>
          </div>
        </div>

        {/* Pulsing Visual Loader Graphic */}
        <div className="bg-[#FAF9F5] rounded-2xl p-6 border border-[var(--color-border)] mb-6 text-center relative z-10 overflow-hidden">
          <div className="flex justify-center items-center gap-6 my-2">
            <div className="w-12 h-12 rounded-xl bg-white border border-[var(--color-border)] flex items-center justify-center text-[var(--color-forest)] shadow-xs animate-bounce" style={{ animationDuration: '1.2s' }}>
              <Brain size={22} />
            </div>
            <div className="h-0.5 w-12 bg-gradient-to-r from-[var(--color-sage-light)] to-[var(--color-forest)] animate-pulse" />
            <div className="w-14 h-14 rounded-2xl bg-[var(--color-forest)] text-white flex items-center justify-center shadow-md animate-pulse">
              <Cpu size={26} className="text-[var(--color-mint)]" />
            </div>
            <div className="h-0.5 w-12 bg-gradient-to-r from-[var(--color-forest)] to-[var(--color-amber)] animate-pulse" />
            <div className="w-12 h-12 rounded-xl bg-white border border-[var(--color-border)] flex items-center justify-center text-[var(--color-amber)] shadow-xs animate-bounce" style={{ animationDuration: '1.5s' }}>
              <ShieldCheck size={22} />
            </div>
          </div>

          <p className="text-xs font-semibold text-[var(--color-forest)] mt-4">
            AI Model Inference in Progress
          </p>

          {/* Animated Progress Bar */}
          <div className="w-full bg-[#EAE8DE] h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[var(--color-sage)] via-[var(--color-forest)] to-[var(--color-amber)] rounded-full animate-pulse transition-all duration-500 w-3/4" />
          </div>
        </div>

        {/* Skeleton Grid UI representing upcoming cards */}
        <div className="grid grid-cols-3 gap-3 mb-6 relative z-10">
          <div className="h-28 bg-[#FAF9F5] rounded-2xl border border-[var(--color-border)] p-4 flex flex-col justify-between animate-pulse">
            <div className="w-16 h-3 bg-slate-200 rounded-md" />
            <div className="w-20 h-8 bg-slate-300 rounded-lg self-center" />
            <div className="w-full h-2 bg-slate-200 rounded-full" />
          </div>

          <div className="h-28 bg-[#FAF9F5] rounded-2xl border border-[var(--color-border)] p-4 flex flex-col justify-between animate-pulse">
            <div className="w-16 h-3 bg-slate-200 rounded-md" />
            <div className="w-24 h-8 bg-slate-300 rounded-full self-center" />
            <div className="w-full h-2 bg-slate-200 rounded-full" />
          </div>

          <div className="h-28 bg-[#FAF9F5] rounded-2xl border border-[var(--color-border)] p-4 flex flex-col justify-between animate-pulse">
            <div className="w-16 h-3 bg-slate-200 rounded-md" />
            <div className="w-20 h-8 bg-slate-300 rounded-lg self-center" />
            <div className="w-full h-2 bg-slate-200 rounded-full" />
          </div>
        </div>

        {/* Skeleton for summary card */}
        <div className="h-24 bg-[#FAF9F5] rounded-2xl border border-[var(--color-border)] p-4 flex flex-col justify-between animate-pulse relative z-10">
          <div className="w-28 h-4 bg-slate-200 rounded-md" />
          <div className="w-full h-3 bg-slate-200 rounded-md" />
          <div className="w-4/5 h-3 bg-slate-200 rounded-md" />
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-[var(--color-text-muted)] font-medium flex items-center justify-center gap-2 relative z-10">
        <Sparkles size={14} className="text-[var(--color-amber)] animate-spin" />
        <span>Calculating insights, please wait a moment...</span>
      </div>
    </Card>
  );
};

export default PredictionLoadingState;
