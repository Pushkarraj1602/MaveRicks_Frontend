import { useState } from "react";
import { predictReadmission } from "../services/predictionApi";

export const usePrediction = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const predict = async (patientData) => {
    try {
      setLoading(true);
      setError(null);

      // Ensure a 2-second (2000ms) loading duration for smooth UX
      const minDelay = new Promise((resolve) => setTimeout(resolve, 2000));
      const [result] = await Promise.all([
        predictReadmission(patientData),
        minDelay,
      ]);

      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
  };

  return {
    data,
    loading,
    error,
    predict,
    reset
  };
};
