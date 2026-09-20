import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/common/Card";
import { UserRound, Mail, Phone, Building2, Shield, Bell, Palette, Globe, Save, ArrowLeft, Camera, Key, LogOut } from "lucide-react";

const SettingsPage = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "Dr. Pushkar raj",
    email: "testmail@gmail.com",
    phone: "+91 98765 43210",
    role: "Hospital Physician",
    department: "Internal Medicine",
    hospital: "City General Hospital",
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    highRiskAlerts: true,
    weeklyReport: false,
    systemUpdates: true,
  });

  const [theme, setTheme] = useState("light");
  const [saved, setSaved] = useState(false);

  const update = (key) => (e) => setProfile((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout activePage="settings">
      {/* Back + Title */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate("/")}
          className="w-10 h-10 rounded-xl bg-white border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-mint)] transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Settings</h1>
          <p className="text-sm text-[var(--color-text-muted)]">Manage your account, preferences, and notifications</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
        {/* Left Column */}
        <div className="space-y-6">

          {/* Profile Information */}
          <Card>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--color-border)]">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-mint)] flex items-center justify-center text-[var(--color-forest)]">
                <UserRound size={22} />
              </div>
              <div>
                <h2 className="text-[16px] font-semibold text-[var(--color-text-primary)]">Profile Information</h2>
                <p className="text-sm text-[var(--color-text-muted)]">Update your personal details</p>
              </div>
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-5 mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-[var(--color-forest)] flex items-center justify-center text-white text-2xl font-bold">
                  DS
                </div>
                <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[var(--color-amber)] text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                  <Camera size={14} />
                </button>
              </div>
              <div>
                <p className="font-semibold text-[var(--color-text-primary)]">{profile.name}</p>
                <p className="text-sm text-[var(--color-text-muted)]">{profile.role}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label className="text-[13px] font-semibold text-[var(--color-text-primary)] block mb-1.5">Full Name</label>
                <div className="relative">
                  <UserRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-amber)]" />
                  <input className="input pl-10" value={profile.name} onChange={update("name")} />
                </div>
              </div>

              <div>
                <label className="text-[13px] font-semibold text-[var(--color-text-primary)] block mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-amber)]" />
                  <input className="input pl-10" type="email" value={profile.email} onChange={update("email")} />
                </div>
              </div>

              <div>
                <label className="text-[13px] font-semibold text-[var(--color-text-primary)] block mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-amber)]" />
                  <input className="input pl-10" value={profile.phone} onChange={update("phone")} />
                </div>
              </div>

              <div>
                <label className="text-[13px] font-semibold text-[var(--color-text-primary)] block mb-1.5">Role</label>
                <div className="relative">
                  <Shield size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-amber)]" />
                  <input className="input pl-10" value={profile.role} onChange={update("role")} />
                </div>
              </div>

              <div>
                <label className="text-[13px] font-semibold text-[var(--color-text-primary)] block mb-1.5">Department</label>
                <div className="relative">
                  <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-amber)]" />
                  <input className="input pl-10" value={profile.department} onChange={update("department")} />
                </div>
              </div>

              <div>
                <label className="text-[13px] font-semibold text-[var(--color-text-primary)] block mb-1.5">Hospital</label>
                <div className="relative">
                  <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-amber)]" />
                  <input className="input pl-10" value={profile.hospital} onChange={update("hospital")} />
                </div>
              </div>
            </div>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--color-border)]">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-amber-light)] flex items-center justify-center text-[var(--color-amber)]">
                <Bell size={22} />
              </div>
              <div>
                <h2 className="text-[16px] font-semibold text-[var(--color-text-primary)]">Notification Preferences</h2>
                <p className="text-sm text-[var(--color-text-muted)]">Choose how you want to be notified</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { key: "emailAlerts", label: "Email Alerts", desc: "Receive prediction results via email" },
                { key: "highRiskAlerts", label: "High-Risk Patient Alerts", desc: "Get notified immediately when a patient is flagged high-risk" },
                { key: "weeklyReport", label: "Weekly Summary Report", desc: "Receive a weekly digest of all predictions" },
                { key: "systemUpdates", label: "System Updates", desc: "Get notified about new features and model updates" },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between py-3 border-b border-[var(--color-border)] last:border-0">
                  <div>
                    <p className="text-[14px] font-semibold text-[var(--color-text-primary)]">{label}</p>
                    <p className="text-[12px] text-[var(--color-text-muted)]">{desc}</p>
                  </div>
                  <button
                    onClick={() => setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))}
                    className={`w-12 h-7 rounded-full transition-colors relative ${notifications[key] ? "bg-[var(--color-forest)]" : "bg-[var(--color-border)]"}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow-md absolute top-1 transition-all ${notifications[key] ? "left-6" : "left-1"}`} />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">

          {/* Appearance */}
          <Card>
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[var(--color-border)]">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-sage-light)] flex items-center justify-center text-[var(--color-sage)]">
                <Palette size={22} />
              </div>
              <h2 className="text-[16px] font-semibold text-[var(--color-text-primary)]">Appearance</h2>
            </div>
            <div className="flex gap-3">
              {["light", "dark"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`flex-1 py-3 rounded-xl text-sm font-semibold border transition-all ${theme === t
                    ? "bg-[var(--color-forest)] text-white border-[var(--color-forest)]"
                    : "bg-white text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-sage)]"
                  }`}
                >
                  {t === "light" ? "☀️ Light" : "🌙 Dark"}
                </button>
              ))}
            </div>
          </Card>

          {/* Language */}
          <Card>
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[var(--color-border)]">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-mint)] flex items-center justify-center text-[var(--color-forest)]">
                <Globe size={22} />
              </div>
              <h2 className="text-[16px] font-semibold text-[var(--color-text-primary)]">Language</h2>
            </div>
            <select className="input">
              <option>English</option>
              <option>Hindi</option>
              <option>Spanish</option>
            </select>
          </Card>

          {/* Security */}
          <Card>
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[var(--color-border)]">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-high-risk-bg)] flex items-center justify-center text-[var(--color-high-risk)]">
                <Key size={22} />
              </div>
              <h2 className="text-[16px] font-semibold text-[var(--color-text-primary)]">Security</h2>
            </div>
            <button className="w-full py-3 rounded-xl text-sm font-semibold bg-white text-[var(--color-text-primary)] border border-[var(--color-border)] hover:border-[var(--color-sage)] transition-colors flex items-center justify-center gap-2 mb-3">
              <Key size={16} />
              Change Password
            </button>
            <button className="w-full py-3 rounded-xl text-sm font-semibold bg-[var(--color-high-risk-bg)] text-[var(--color-high-risk)] border border-transparent hover:border-[var(--color-high-risk)] transition-colors flex items-center justify-center gap-2">
              <LogOut size={16} />
              Sign Out
            </button>
          </Card>
        </div>
      </div>

      {/* Save Bar (Scrolls naturally with page content) */}
      <div className="mt-8 mb-6 bg-white border border-[var(--color-border)] rounded-2xl p-4 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-xs text-[var(--color-text-secondary)] font-medium pl-2">
          <div className="w-2 h-2 rounded-full bg-[var(--color-forest)]" />
          <span>Save your profile and preference changes</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2.5 rounded-xl border border-[var(--color-border)] text-[var(--color-text-primary)] font-semibold hover:bg-[var(--color-mint)] transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="predict-btn !w-auto px-6 !py-2.5 text-sm"
          >
            <Save size={16} />
            {saved ? "Saved ✓" : "Save Changes"}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
