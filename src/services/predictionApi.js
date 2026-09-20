const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export const predictReadmission = async (patientData) => {
  const response = await fetch(`${BACKEND_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patientData),
  });

  if (!response.ok) {
    throw new Error("Prediction failed. Please ensure the backend is running.");
  }

  return response.json();
};
