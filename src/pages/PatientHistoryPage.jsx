import React, { useState, useEffect } from "react";
import { History, TrendingUp, AlertTriangle, CheckCircle, Trash2, Download, Calendar, User, Search } from "lucide-react";
import Card from "../components/common/Card";
import DashboardLayout from "../components/layout/DashboardLayout";
import { historyService } from "../services/historyService";

const PatientHistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    // Filter history based on search query
    if (searchQuery.trim() === "") {
      setFilteredHistory(history);
    } else {
      const filtered = history.filter(item => 
        item.patient_name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredHistory(filtered);
    }
  }, [searchQuery, history]);

  const loadHistory = () => {
    const historyData = historyService.getHistory();
    const stats = historyService.getStatistics();
    setHistory(historyData);
    setFilteredHistory(historyData);
    setStatistics(stats);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this prediction from history?")) {
      historyService.deleteHistoryItem(id);
      loadHistory();
      if (selectedItem?.id === id) {
        setSelectedItem(null);
      }
    }
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all prediction history? This cannot be undone.")) {
      historyService.clearHistory();
      loadHistory();
      setSelectedItem(null);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-mint)] flex items-center justify-center text-[var(--color-forest)]">
              <History size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Patient History</h1>
              <p className="text-sm text-[var(--color-text-secondary)]">View and manage past predictions</p>
            </div>
          </div>
          {history.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-semibold"
            >
              <Trash2 size={16} />
              Clear All History
            </button>
          )}
        </div>

        {/* Statistics Cards */}
        {statistics && statistics.totalPredictions > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--color-text-secondary)]">Total Predictions</p>
                  <p className="text-2xl font-bold text-[var(--color-forest)]">{statistics.totalPredictions}</p>
                </div>
                <TrendingUp className="text-[var(--color-forest)]" size={32} />
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--color-text-secondary)]">High Risk</p>
                  <p className="text-2xl font-bold text-red-600">{statistics.highRiskCount}</p>
                </div>
                <AlertTriangle className="text-red-600" size={32} />
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--color-text-secondary)]">Low Risk</p>
                  <p className="text-2xl font-bold text-green-600">{statistics.lowRiskCount}</p>
                </div>
                <CheckCircle className="text-green-600" size={32} />
              </div>
            </Card>

            <Card className="p-4">
              <div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">Average Risk</p>
                <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                  {(statistics.averageRisk * 100).toFixed(1)}%
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* History List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* List View */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                Prediction History ({filteredHistory.length})
              </h2>
            </div>
            
            {/* Search Box */}
            <div className="mb-4 relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-sage)]">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search by patient name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border-2 border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-forest)] focus:border-[var(--color-forest)] transition-all text-sm"
              />
            </div>
            
            {filteredHistory.length === 0 ? (
              <div className="text-center py-12">
                {searchQuery ? (
                  <>
                    <Search size={48} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-[var(--color-text-secondary)]">No patients found</p>
                    <p className="text-sm text-[var(--color-text-muted)] mt-1">
                      Try a different search term
                    </p>
                  </>
                ) : (
                  <>
                    <History size={48} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-[var(--color-text-secondary)]">No predictions yet</p>
                    <p className="text-sm text-[var(--color-text-muted)] mt-1">
                      Predictions will appear here after you analyze patients
                    </p>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {filteredHistory.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedItem?.id === item.id
                        ? 'border-[var(--color-forest)] bg-[var(--color-mint)]'
                        : 'border-[var(--color-border)] hover:border-[var(--color-sage)]'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${item.is_high_risk ? 'bg-red-500' : 'bg-green-500'}`} />
                        <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                          {item.is_high_risk ? 'High Risk' : 'Low Risk'}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id);
                        }}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    {item.patient_name && (
                      <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-primary)] mb-1">
                        <User size={14} />
                        {item.patient_name}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)] mb-1">
                      <Calendar size={12} />
                      {formatDate(item.timestamp)}
                    </div>
                    
                    <div className="text-sm text-[var(--color-text-primary)] mb-2">
                      Risk: <span className="font-semibold">{(item.risk_probability * 100).toFixed(1)}%</span>
                    </div>
                    
                    <div className="text-xs text-[var(--color-text-muted)]">
                      Model: {item.model_used || 'Random Forest'} | 
                      RAG: {item.rag_enabled ? 'Yes' : 'No'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Detail View */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
              Prediction Details
            </h2>
            
            {!selectedItem ? (
              <div className="text-center py-12">
                <User size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-[var(--color-text-secondary)]">Select a prediction to view details</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Risk Badge */}
                <div className={`p-4 rounded-lg ${selectedItem.is_high_risk ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-semibold ${selectedItem.is_high_risk ? 'text-red-900' : 'text-green-900'}`}>
                      {selectedItem.is_high_risk ? '⚠ High Risk Patient' : '✓ Low Risk Patient'}
                    </span>
                    <span className={`text-2xl font-bold ${selectedItem.is_high_risk ? 'text-red-600' : 'text-green-600'}`}>
                      {(selectedItem.risk_probability * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Timestamp */}
                <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  <Calendar size={16} />
                  <span>{formatDate(selectedItem.timestamp)}</span>
                </div>

                {/* Patient Name */}
                {selectedItem.patient_name && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-blue-600" />
                      <div>
                        <p className="text-xs text-blue-600">Patient Name</p>
                        <p className="text-sm font-semibold text-blue-900">{selectedItem.patient_name}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Patient Summary */}
                <div className="p-4 bg-[var(--color-mint)] rounded-lg">
                  <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">Patient Summary</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {selectedItem.summary}
                  </p>
                </div>

                {/* Model Info */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-600 mb-1">Model Used</p>
                    <p className="text-sm font-semibold text-blue-900">{selectedItem.model_used || 'Random Forest'}</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-xs text-purple-600 mb-1">RAG Feature</p>
                    <p className="text-sm font-semibold text-purple-900">{selectedItem.rag_enabled ? 'Enabled' : 'Disabled'}</p>
                  </div>
                </div>

                {/* Similar Case Rate */}
                {selectedItem.similar_case_readmit_rate !== undefined && (
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="text-xs text-orange-600 mb-1">Similar Case Readmit Rate</p>
                    <p className="text-sm font-semibold text-orange-900">
                      {(selectedItem.similar_case_readmit_rate * 100).toFixed(1)}%
                    </p>
                  </div>
                )}

                {/* Model Metrics */}
                {selectedItem.model_metrics && (
                  <div className="p-4 bg-white border border-[var(--color-border)] rounded-lg">
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Model Metrics</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-[var(--color-text-secondary)]">AUC-ROC:</span>
                        <span className="ml-2 font-semibold">{(selectedItem.model_metrics.auc_roc * 100).toFixed(1)}%</span>
                      </div>
                      <div>
                        <span className="text-[var(--color-text-secondary)]">F1 Score:</span>
                        <span className="ml-2 font-semibold">{(selectedItem.model_metrics.f1_score * 100).toFixed(1)}%</span>
                      </div>
                      <div>
                        <span className="text-[var(--color-text-secondary)]">Precision:</span>
                        <span className="ml-2 font-semibold">{(selectedItem.model_metrics.precision * 100).toFixed(1)}%</span>
                      </div>
                      <div>
                        <span className="text-[var(--color-text-secondary)]">Recall:</span>
                        <span className="ml-2 font-semibold">{(selectedItem.model_metrics.recall * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientHistoryPage;
