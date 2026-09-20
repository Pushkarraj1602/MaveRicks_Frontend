import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Fixed Sidebar */}
      <div className="fixed top-0 left-0 h-screen w-[240px] z-50">
        <Sidebar />
      </div>

      {/* Right side: fixed header + scrollable content */}
      <div className="ml-[240px] flex-1 flex flex-col">
        {/* Fixed Header */}
        <div className="sticky top-0 z-40 bg-[var(--color-ivory)] px-8 py-3 border-b border-[var(--color-border)]">
          <Header />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 px-8 py-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
