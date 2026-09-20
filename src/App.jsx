import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PredictionPage from "./pages/PredictionPage";
import SettingsPage from "./pages/SettingsPage";
import PatientHistoryPage from "./pages/PatientHistoryPage";
import ModelInfoPage from "./pages/ModelInfoPage";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/predict" replace />} />
        <Route path="/predict" element={<ProtectedRoute><PredictionPage /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><PatientHistoryPage /></ProtectedRoute>} />
        <Route path="/model-info" element={<ProtectedRoute><ModelInfoPage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;