import React, { useState } from "react";
import { Lock, Mail, Eye, EyeOff, Heart, Activity, Shield, AlertCircle, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Test credentials
  const TEST_USER_ID = "admin";
  const TEST_PASSWORD = "admin123";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (formData.userId === TEST_USER_ID && formData.password === TEST_PASSWORD) {
        localStorage.setItem("isAuthenticated", "true");
        navigate("/predict");
      } else {
        setError("Invalid credentials. Please try again.");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding & Info */}
      <div className="hidden lg:flex lg:w-[40%] bg-gradient-to-br from-[var(--color-forest)] via-[var(--color-deep-green)] to-[#0A1612] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-[var(--color-sage)]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-[var(--color-mint)]/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col justify-between p-8 text-white w-full max-w-md mx-auto">
          {/* Logo & Title */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="text-[var(--color-mint)]">
                <Leaf size={32} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">MaveRicks</h1>
                <p className="text-sm text-white/70">Insights for Health</p>
              </div>
            </div>

            <div className="space-y-6 mt-12">
              <h2 className="text-3xl font-display font-bold leading-tight">
                Predict Readmissions.<br />
                Improve Outcomes.
              </h2>
              <p className="text-base text-white/80 max-w-sm">
                AI-powered hospital readmission risk prediction system helping healthcare professionals make better clinical decisions.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <Activity size={20} />
              </div>
              <div>
                <h3 className="font-semibold">Real-time Predictions</h3>
                <p className="text-sm text-white/70">Instant risk assessment using advanced ML models</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <Shield size={20} />
              </div>
              <div>
                <h3 className="font-semibold">Secure & Compliant</h3>
                <p className="text-sm text-white/70">HIPAA-compliant data handling and privacy</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <Heart size={20} />
              </div>
              <div>
                <h3 className="font-semibold">Patient-Centered Care</h3>
                <p className="text-sm text-white/70">Data-driven insights for better patient outcomes</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-sm text-white/50">
            © 2026 MaveRicks. Smarter Decisions, Healthier Lives.
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[var(--color-ivory)]">
        <div className="w-full max-w-lg">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="text-[var(--color-forest)]">
              <Leaf size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[var(--color-forest)]">MaveRicks</h1>
              <p className="text-sm text-[var(--color-text-secondary)]">Insights for Health</p>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-[var(--color-border)] p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">Welcome Back</h2>
              <p className="text-[var(--color-text-secondary)]">Please sign in to access your dashboard</p>
            </div>

            {/* Test Credentials Info */}
            <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
              <div className="flex items-start gap-2">
                <AlertCircle size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-blue-900 mb-1">Test Credentials</p>
                  <p className="text-blue-700">User ID: <span className="font-mono bg-blue-100 px-2 py-0.5 rounded">admin</span></p>
                  <p className="text-blue-700">Password: <span className="font-mono bg-blue-100 px-2 py-0.5 rounded">admin123</span></p>
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-center gap-2 text-red-700">
                <AlertCircle size={18} />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* User ID Field */}
              <div>
                <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                  User ID
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-sage)]">
                    <Mail size={20} />
                  </div>
                  <input
                    type="text"
                    value={formData.userId}
                    onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)] focus:border-[var(--color-forest)] transition-all text-[var(--color-text-primary)]"
                    placeholder="Enter your user ID"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-sage)]">
                    <Lock size={20} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-12 pr-12 py-3.5 border-2 border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)] focus:border-[var(--color-forest)] transition-all text-[var(--color-text-primary)]"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-sage)] hover:text-[var(--color-forest)] transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-2 border-[var(--color-border)] text-[var(--color-forest)] focus:ring-2 focus:ring-[var(--color-forest)]"
                  />
                  <span className="text-sm text-[var(--color-text-secondary)]">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm font-semibold text-[var(--color-forest)] hover:text-[var(--color-deep-green)] transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[var(--color-forest)] text-white font-semibold rounded-xl hover:bg-[var(--color-deep-green)] focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)] focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 text-center text-sm text-[var(--color-text-secondary)]">
              Need help?{" "}
              <button className="font-semibold text-[var(--color-forest)] hover:underline">
                Contact Support
              </button>
            </div>
          </div>

          {/* Bottom Notice */}
          <p className="mt-6 text-center text-xs text-[var(--color-text-muted)]">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
