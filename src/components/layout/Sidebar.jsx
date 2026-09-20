import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Leaf, Activity, FileText, BarChart3, Settings, BookOpen, LogOut } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <aside className="w-[240px] bg-[var(--color-forest)] text-white p-6 flex flex-col h-full overflow-y-auto">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10 cursor-pointer" onClick={() => navigate("/predict")}>
        <div className="text-[var(--color-mint)]">
          <Leaf size={28} />
        </div>
        <div>
          <h1 className="text-xl font-bold font-display leading-none mb-1">MaveRicks</h1>
          <p className="text-[10px] text-white/70 uppercase tracking-widest">Insights for Health</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1">
        <button
          onClick={() => navigate("/predict")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold mb-1 transition-colors w-full text-left ${
            isActive("/predict")
              ? "bg-[var(--color-sage-light)] text-[var(--color-forest)]"
              : "text-white/70 hover:text-white hover:bg-white/5"
          }`}
        >
          <Activity size={20} />
          <span>Predict</span>
        </button>
        <button
          onClick={() => navigate("/history")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium mb-1 transition-colors w-full text-left ${
            isActive("/history")
              ? "bg-[var(--color-sage-light)] text-[var(--color-forest)]"
              : "text-white/70 hover:text-white hover:bg-white/5"
          }`}
        >
          <FileText size={20} />
          <span>Patient History</span>
        </button>
        <button
          onClick={() => navigate("/model-info")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors w-full text-left ${
            isActive("/model-info")
              ? "bg-[var(--color-sage-light)] text-[var(--color-forest)]"
              : "text-white/70 hover:text-white hover:bg-white/5"
          }`}
        >
          <BarChart3 size={20} />
          <span>Model Info</span>
        </button>
        <button className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-colors w-full text-left">
          <BookOpen size={20} />
          <span>Resources</span>
        </button>
      </nav>

      <div className="mt-auto pt-6 border-t border-white/10 space-y-2">
        <button
          onClick={() => navigate("/settings")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors w-full text-left ${
            isActive("/settings")
              ? "bg-[var(--color-sage-light)] text-[var(--color-forest)]"
              : "text-white/70 hover:text-white hover:bg-white/5"
          }`}
        >
          <Settings size={20} />
          <span>Settings</span>
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors w-full text-left text-white/70 hover:text-white hover:bg-red-500/20"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      {/* Footer Branding */}
      <div className="mt-8">
        <p className="font-display font-medium text-lg leading-tight mb-2">Smarter<br />Decisions<br />Healthier Lives</p>
        <div className="w-6 h-0.5 bg-[var(--color-sage)]"></div>
      </div>
    </aside>
  );
};

export default Sidebar;
