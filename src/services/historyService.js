// Patient History Service using localStorage

const HISTORY_KEY = 'MaveRicks_prediction_history';
const MAX_HISTORY_ITEMS = 50;

export const historyService = {
    // Save a prediction to history
    savePrediction: (predictionData) => {
        try {
            const history = historyService.getHistory();
            const timestamp = new Date().toISOString();

            const historyItem = {
                id: `pred_${Date.now()}`,
                timestamp,
                ...predictionData
            };

            // Add to beginning of array (most recent first)
            history.unshift(historyItem);

            // Limit history size
            if (history.length > MAX_HISTORY_ITEMS) {
                history.splice(MAX_HISTORY_ITEMS);
            }

            localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
            return historyItem;
        } catch (error) {
            console.error('Error saving prediction to history:', error);
            return null;
        }
    },

    // Get all history
    getHistory: () => {
        try {
            const historyJson = localStorage.getItem(HISTORY_KEY);
            return historyJson ? JSON.parse(historyJson) : [];
        } catch (error) {
            console.error('Error loading history:', error);
            return [];
        }
    },

    // Get a single history item by ID
    getHistoryItem: (id) => {
        const history = historyService.getHistory();
        return history.find(item => item.id === id);
    },

    // Delete a history item
    deleteHistoryItem: (id) => {
        try {
            const history = historyService.getHistory();
            const filteredHistory = history.filter(item => item.id !== id);
            localStorage.setItem(HISTORY_KEY, JSON.stringify(filteredHistory));
            return true;
        } catch (error) {
            console.error('Error deleting history item:', error);
            return false;
        }
    },

    // Clear all history
    clearHistory: () => {
        try {
            localStorage.removeItem(HISTORY_KEY);
            return true;
        } catch (error) {
            console.error('Error clearing history:', error);
            return false;
        }
    },

    // Get statistics
    getStatistics: () => {
        const history = historyService.getHistory();
        if (history.length === 0) {
            return {
                totalPredictions: 0,
                highRiskCount: 0,
                lowRiskCount: 0,
                averageRisk: 0,
                modelsUsed: {}
            };
        }

        const highRiskCount = history.filter(item => item.is_high_risk).length;
        const lowRiskCount = history.length - highRiskCount;
        const averageRisk = history.reduce((sum, item) => sum + (item.risk_probability || 0), 0) / history.length;

        const modelsUsed = history.reduce((acc, item) => {
            const model = item.model_used || 'Unknown';
            acc[model] = (acc[model] || 0) + 1;
            return acc;
        }, {});

        return {
            totalPredictions: history.length,
            highRiskCount,
            lowRiskCount,
            averageRisk,
            modelsUsed
        };
    }
};