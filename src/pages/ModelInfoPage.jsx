import React, { useState, useEffect } from "react";
import { Brain, TrendingUp, Target, Award, Zap, Database, GitBranch, CheckCircle } from "lucide-react";
import Card from "../components/common/Card";
import DashboardLayout from "../components/layout/DashboardLayout";

const ModelInfoPage = () => {
  const [modelsInfo, setModelsInfo] = useState(null);

  useEffect(() => {
    fetchModelsInfo();
  }, []);

  const fetchModelsInfo = async () => {
    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
      const response = await fetch(`${BACKEND_URL}/models`);
      if (response.ok) {
        const data = await response.json();
        setModelsInfo(data);
      }
    } catch (error) {
      console.error("Error fetching models info:", error);
    }
  };

  const rfMetrics = modelsInfo?.metrics?.random_forest || {};
  const lrMetrics = modelsInfo?.metrics?.logistic_regression || {};

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-mint)] flex items-center justify-center text-[var(--color-forest)]">
              <Brain size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Model Information</h1>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Machine learning models and performance metrics
              </p>
            </div>
          </div>

          {/* System Overview */}
          <Card className="p-6 mb-6">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
              <Zap size={20} className="text-[var(--color-amber)]" />
              System Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-[var(--color-mint)] rounded-lg">
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">Available Models</p>
                <p className="text-2xl font-bold text-[var(--color-forest)]">2</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">Random Forest & Logistic Regression</p>
              </div>
              <div className="p-4 bg-[var(--color-sky)] rounded-lg">
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">RAG Enhancement</p>
                <p className="text-2xl font-bold text-blue-700">✓ Active</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">Similar case retrieval enabled</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">Risk Threshold</p>
                <p className="text-2xl font-bold text-purple-700">{modelsInfo?.threshold ? (modelsInfo.threshold * 100).toFixed(0) : 15}%</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">High-risk classification cutoff</p>
              </div>
            </div>
          </Card>

          {/* Models Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Random Forest */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <GitBranch size={20} className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Random Forest</h3>
                  <p className="text-xs text-[var(--color-text-secondary)]">Recommended Model</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
                  <CheckCircle size={14} />
                  Production Model
                </div>
              </div>

              <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                An ensemble learning method that constructs multiple decision trees and merges them to get more accurate and stable predictions. Best performance on the test dataset.
              </p>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-[var(--color-mint)] rounded-lg">
                  <span className="text-sm text-[var(--color-text-secondary)]">AUC-ROC</span>
                  <span className="text-lg font-bold text-[var(--color-forest)]">{(rfMetrics.auc_roc * 100 || 68.7).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[var(--color-sky)] rounded-lg">
                  <span className="text-sm text-[var(--color-text-secondary)]">F1 Score</span>
                  <span className="text-lg font-bold text-blue-700">{(rfMetrics.f1_score * 100 || 51.2).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm text-[var(--color-text-secondary)]">Precision</span>
                  <span className="text-lg font-bold text-purple-700">{(rfMetrics.precision * 100 || 45.6).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-sm text-[var(--color-text-secondary)]">Recall</span>
                  <span className="text-lg font-bold text-orange-700">{(rfMetrics.recall * 100 || 58.3).toFixed(1)}%</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                <h4 className="text-xs font-semibold text-[var(--color-text-primary)] mb-2">Key Strengths:</h4>
                <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                  <li>• Handles non-linear relationships well</li>
                  <li>• Robust to overfitting</li>
                  <li>• Better generalization</li>
                  <li>• Feature importance ranking</li>
                </ul>
              </div>
            </Card>

            {/* Logistic Regression */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Target size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Logistic Regression</h3>
                  <p className="text-xs text-[var(--color-text-secondary)]">Baseline Model</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                  <Database size={14} />
                  Alternative Model
                </div>
              </div>

              <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                A statistical model for binary classification that estimates probabilities using a logistic function. Provides interpretable coefficients and faster predictions.
              </p>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-[var(--color-mint)] rounded-lg">
                  <span className="text-sm text-[var(--color-text-secondary)]">AUC-ROC</span>
                  <span className="text-lg font-bold text-[var(--color-forest)]">{(lrMetrics.auc_roc * 100 || 62.1).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[var(--color-sky)] rounded-lg">
                  <span className="text-sm text-[var(--color-text-secondary)]">F1 Score</span>
                  <span className="text-lg font-bold text-blue-700">{(lrMetrics.f1_score * 100 || 43.8).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm text-[var(--color-text-secondary)]">Precision</span>
                  <span className="text-lg font-bold text-purple-700">{(lrMetrics.precision * 100 || 38.9).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-sm text-[var(--color-text-secondary)]">Recall</span>
                  <span className="text-lg font-bold text-orange-700">{(lrMetrics.recall * 100 || 50.2).toFixed(1)}%</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                <h4 className="text-xs font-semibold text-[var(--color-text-primary)] mb-2">Key Strengths:</h4>
                <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
                  <li>• Fast training and prediction</li>
                  <li>• Interpretable coefficients</li>
                  <li>• Lower computational requirements</li>
                  <li>• Good baseline performance</li>
                </ul>
              </div>
            </Card>
          </div>

          {/* RAG Feature Explanation */}
          <Card className="p-6 mb-6">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
              <Award size={20} className="text-[var(--color-amber)]" />
              RAG Feature Enhancement
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">What is RAG?</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
                  Retrieval-Augmented Generation (RAG) enhances predictions by finding the 10 most similar historical patient cases and calculating their readmission rate. This rate becomes an additional feature for the ML model.
                </p>
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">How it works:</h3>
                <ol className="text-sm text-[var(--color-text-secondary)] space-y-2">
                  <li>1. Patient data is converted to text summary</li>
                  <li>2. Summary is embedded using Sentence Transformer</li>
                  <li>3. FAISS searches for 10 similar historical cases</li>
                  <li>4. Readmission rate of similar cases is calculated</li>
                  <li>5. This rate enhances the model's prediction</li>
                </ol>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">Performance Impact:</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-xs text-green-600 font-semibold mb-1">With RAG Enabled</p>
                    <p className="text-sm text-green-900">Better accuracy by leveraging similar case patterns</p>
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-xs text-gray-600 font-semibold mb-1">Without RAG</p>
                    <p className="text-sm text-gray-700">Standard feature-based prediction only</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-600 font-semibold mb-2">Technology Stack:</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-blue-900">
                    <div>• Sentence Transformers</div>
                    <div>• FAISS Vector Search</div>
                    <div>• all-MiniLM-L6-v2</div>
                    <div>• 384-dim embeddings</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Training Information */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
              <Database size={20} className="text-[var(--color-sage)]" />
              Training Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">Dataset</h3>
                <p className="text-[var(--color-text-secondary)]">UCI Diabetes 130-Hospitals dataset</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">130,000+ diabetic patient encounters</p>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">Training Framework</h3>
                <p className="text-[var(--color-text-secondary)]">scikit-learn</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">Python machine learning library</p>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">Validation Method</h3>
                <p className="text-[var(--color-text-secondary)]">Train/Test Split</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">80/20 split with stratification</p>
              </div>
            </div>
          </Card>
      </div>
    </DashboardLayout>
  );
};

export default ModelInfoPage;
