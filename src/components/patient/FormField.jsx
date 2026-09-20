import React from "react";
import { User, Calendar, Activity, Syringe, ClipboardList, BedDouble, AlertCircle, Users } from "lucide-react";

export const FormField = ({ label, icon: Icon, children }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-semibold text-[var(--color-text-primary)] min-h-[32px] leading-tight flex items-start">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-amber)] opacity-80 pointer-events-none z-10">
          <Icon size={18} />
        </div>
        {children}
      </div>
    </div>
  );
};

export const SelectInput = ({ value, onChange, options, formatOption }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="input pl-12"
  >
    {options.map((opt) => (
      <option key={opt} value={opt}>
        {formatOption ? formatOption(opt) : opt}
      </option>
    ))}
  </select>
);

export const NumberInput = ({ value, onChange, min, max }) => (
  <div className="relative w-full">
    <input
      type="number"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Math.min(max, Math.max(min, Number(e.target.value))))}
      className="input pl-12 pr-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
    />
    <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col items-center">
      <button 
        type="button" 
        onClick={() => onChange(Math.min(max, value + 1))}
        className="h-5 w-6 flex items-center justify-center hover:bg-slate-100 rounded text-slate-500"
      >
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 5L5 1L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <button 
        type="button" 
        onClick={() => onChange(Math.max(min, value - 1))}
        className="h-5 w-6 flex items-center justify-center hover:bg-slate-100 rounded text-slate-500"
      >
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </div>
  </div>
);
