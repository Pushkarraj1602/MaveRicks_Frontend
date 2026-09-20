import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRound, ChevronDown, LogOut, Settings, User } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center mb-0">
      <div>
         <h1 className="text-xl font-bold font-display text-[var(--color-text-primary)] tracking-tight">
           READMISSION RISK PREDICTION
         </h1>
      </div>
      
      <div className="flex items-center gap-5">
        <div className="hidden md:flex flex-col items-center">
            <span className="font-script text-xl text-[var(--color-forest)]">Patients First, Always</span>
            <div className="w-20 h-px bg-[var(--color-border)] mt-0.5"></div>
        </div>

        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2.5 bg-white px-3 py-1.5 rounded-full border border-[var(--color-border)] shadow-xs hover:shadow-sm hover:border-[var(--color-sage)] transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[var(--color-forest)] flex items-center justify-center text-[var(--color-mint)]">
              <UserRound size={16} />
            </div>
            <div className="flex flex-col mr-1 text-left">
              <span className="text-xs font-semibold text-[var(--color-text-primary)] leading-tight">Dr.Raj</span>
              <span className="text-[10px] text-[var(--color-text-muted)] leading-tight">Hospital Physician</span>
            </div>
            <ChevronDown size={14} className="text-[var(--color-text-muted)]" />
          </button>

          {showDropdown && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowDropdown(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border-2 border-[var(--color-border)] overflow-hidden z-50">
                <div className="p-3 border-b border-[var(--color-border)] bg-[var(--color-mint)]">
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">Dr.Raj</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">admin</p>
                </div>
                <div className="py-2">
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      navigate("/settings");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--color-mint)] transition-colors text-left"
                  >
                    <Settings size={16} className="text-[var(--color-sage)]" />
                    <span className="text-sm text-[var(--color-text-primary)]">Settings</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors text-left"
                  >
                    <LogOut size={16} className="text-red-600" />
                    <span className="text-sm text-red-600 font-semibold">Logout</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
