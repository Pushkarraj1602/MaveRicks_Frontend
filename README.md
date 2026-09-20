# MaveRicks - Hospital Readmission Risk Prediction System

MaveRicks is a full-stack, AI-powered clinical decision support application designed to evaluate patient readmission risks, assist healthcare professionals with data-driven insights, and optimize discharge planning. The system combines a modern React frontend with a powerful FastAPI machine learning backend.

---

## 🎯 Project Overview

This repository contains both the **frontend** (React/Vite) and **backend** (FastAPI/Python) components of the MaveRicks hospital readmission prediction system.

### **Frontend Features**

- **Interactive Patient Assessment Form**:
  - Input clinical parameters including age, gender, primary diagnosis, hospital stay duration, medication counts, lab procedures, prior inpatient/emergency visits, and insulin usage.
  - Quick form reset and default sample pre-fills.

- **AI-Powered Prediction Engine Integration**:
  - Connects to FastAPI machine learning backend utilizing Random Forest classification and FAISS vector similarity search.
  - Interactive 2-second loading animation step-by-step indicator showing AI inference progress.

- **Visual Risk Dashboard & Indicators**:
  - **Readmission Risk Probability**: Displays exact percentage score with color-coded risk meter.
  - **Risk Categorization**: Clear High Risk / Low Risk badges based on clinical thresholds.
  - **Similar Case Cohort Analysis**: Displays readmission rate across 10 similar historical patient cases.

- **Clinical Summaries & Recommendations**:
  - Auto-generated patient summary with copy-to-clipboard functionality.
  - Dynamic clinical guidance tailored to patient risk level.

- **User & Doctor Settings**:
  - Profile customization (Name, Email, Phone, Role, Department, Hospital).
  - Notification preference toggles (Email alerts, High-risk alerts, Weekly reports, System updates).
  - Appearance preferences & Security actions.

- **Modern & Responsive UI/UX**:
  - Fixed sidebar with quick navigation and MaveRicks branding.
  - Fixed compact top navigation header.
  - Built with TailwindCSS v4 and Lucide icons for a clean healthcare aesthetic.

### **Backend Features**

- ⚡ **Real-time API Predictions**: RESTful API endpoint (`/predict`) providing instant risk scoring.
- 🔍 **RAG Similarity Search**: Uses FAISS & Sentence Transformers to find top-10 similar historic patient cases.
- 🤖 **Machine Learning Pipeline**: 
  - Random Forest Classifier for readmission prediction
  - Sentence Transformers for patient text embedding
  - FAISS vector search for similar case retrieval
- ☁️ **Automated HuggingFace Model Downloads**: Heavy model files are automatically fetched from Hugging Face Hub at startup.
- 🛡️ **CORS Enabled**: Configured to work seamlessly with local frontend dev servers.
- 🩺 **Health Check Endpoint**: `/health` endpoint to monitor model loading status.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Linting**: [Oxlint](https://oxc-project.github.io/)

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **ML Model**: Random Forest Classifier (scikit-learn)
- **Vector Search**: [FAISS](https://github.com/facebookresearch/faiss) (Facebook AI Similarity Search)
- **Text Embeddings**: [Sentence Transformers](https://www.sbert.net/)
- **Model Hosting**: [HuggingFace Hub](https://huggingface.co/)
- **Server**: [Uvicorn](https://www.uvicorn.org/)

---

## 📁 Project Structure

```text
MaveRicks/
├── backend/                      # Backend API and ML models
│   ├── api.py                    # FastAPI REST API implementation
│   ├── app.py                    # Streamlit standalone dashboard (optional)
│   ├── requirements.txt          # Python dependencies
│   └── artifacts/                # ML model artifacts
│       ├── column_order.pkl      # Feature ordering
│       ├── default_values.pkl    # Default feature values
│       ├── train_outcomes.pkl    # Training labels for similarity
│       └── sentence_transformer_model/  # Text embedding model
│
├── src/                          # Frontend source code
│   ├── main.jsx                  # React app entry point
│   ├── App.jsx                   # Application routes setup
│   ├── index.css                 # TailwindCSS & global styles
│   ├── assets/                   # Images & branding
│   ├── components/
│   │   ├── common/               # Reusable UI components
│   │   ├── layout/               # Layout components (Sidebar, Header)
│   │   ├── patient/              # Patient form components
│   │   └── prediction/           # Prediction result components
│   ├── hooks/
│   │   ├── usePrediction.js      # Prediction state management
│   │   └── useTheme.js           # Theme management
│   ├── pages/
│   │   ├── PredictionPage.jsx    # Main prediction dashboard
│   │   └── SettingsPage.jsx      # Settings & profile page
│   └── services/
│       └── predictionApi.js      # API service layer
│
├── public/                       # Static assets
├── .env                          # Environment variables (create from .env.example)
├── .env.example                  # Example environment configuration
├── .gitignore                    # Git ignore rules (frontend + backend)
├── index.html                    # HTML entry point
├── package.json                  # Frontend dependencies
├── vite.config.js                # Vite configuration
└── README.md                     # Complete project documentation
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory (or copy from `.env.example`):

```env
VITE_BACKEND_URL=http://localhost:8000
```

This tells the frontend where to find the backend API server.

---

## 💻 Getting Started

### Prerequisites

- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher
- **Python**: `v3.8` or higher
- **pip**: Python package manager

---

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd MaveRicks
```

### Step 2: Setup Backend

#### 2.1 Navigate to Backend Directory
```bash
cd backend
```

#### 2.2 Create Python Virtual Environment

**Windows (PowerShell):**
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

#### 2.3 Install Python Dependencies
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

#### 2.4 Start the Backend Server
```bash
uvicorn api:app --reload --port 8000
```

**Expected Output:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000
✅ All artifacts loaded successfully
```

The backend will:
- Download ML models from HuggingFace Hub on first run
- Start the API server at `http://localhost:8000`
- API documentation available at `http://localhost:8000/docs`

---

### Step 3: Setup Frontend

#### 3.1 Open a New Terminal and Navigate to Root Directory
```bash
cd ..  # Return to project root
```

#### 3.2 Install Frontend Dependencies
```bash
npm install
```

#### 3.3 Create Environment File
```bash
# Copy the example file
cp .env.example .env

# Or create manually with:
# VITE_BACKEND_URL=http://localhost:8000
```

#### 3.4 Start the Frontend Development Server
```bash
npm run dev
```

**Expected Output:**
```
VITE v8.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

The frontend will be available at `http://localhost:5173`

---

## 🎮 Running the Application

Once both servers are running:

1. **Open your browser** to `http://localhost:5173`
2. **Fill in the patient assessment form** with clinical data
3. **Click "Predict Readmission Risk"**
4. **View the results**:
   - Risk probability percentage
   - High/Low risk classification
   - Similar case analysis
   - Clinical recommendations
   - Patient summary

---

## 📝 Quick Start Commands

**Backend (Terminal 1):**
```bash
cd backend
.\venv\Scripts\Activate.ps1  # Windows
# source venv/bin/activate    # macOS/Linux
uvicorn api:app --reload --port 8000
```

**Frontend (Terminal 2):**
```bash
npm run dev
```

**Access Points:**
- Frontend UI: `http://localhost:5173`
- Backend API: `http://localhost:8000`
- API Docs: `http://localhost:8000/docs`
- Health Check: `http://localhost:8000/health`

---

## 🔗 API Endpoints

### POST `/predict`
Generates readmission risk prediction for a patient.

**Request Body:**
```json
{
  "age": 65,
  "gender": "Male",
  "diag_1": "Circulatory",
  "time_in_hospital": 4,
  "num_lab_procedures": 40,
  "num_procedures": 1,
  "n_inpatient": 1,
  "n_emergency": 0,
  "n_outpatient": 0,
  "num_medications": 15,
  "number_diagnoses": 7,
  "insulin": "No"
}
```

**Response:**
```json
{
  "risk_probability": 0.245,
  "is_high_risk": true,
  "similar_case_readmit_rate": 0.300,
  "summary": "65 year old male patient, 1 prior inpatient visits..."
}
```

**Supported Values:**
- `gender`: "Male" or "Female"
- `diag_1`: "Circulatory", "Respiratory", "Digestive", "Diabetes", "Injury", "Genitourinary", "Musculoskeletal", "Neoplasms", "Other"
- `insulin`: "No", "Down", "Steady", "Up"

### GET `/health`
Health check endpoint to verify backend status.

**Response:**
```json
{
  "status": "ok",
  "models_loaded": true
}
```

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     User Browser                            │
│                 http://localhost:5173                       │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ React Frontend (Vite)
                     │ Components + API Service
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              HTTP POST /predict                              │
│              JSON: Patient Data                              │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│           FastAPI Backend (Port 8000)                       │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 1. Receive Patient Data                              │  │
│  └──────────────┬───────────────────────────────────────┘  │
│                 ▼                                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 2. Generate Patient Summary Text                     │  │
│  └──────────────┬───────────────────────────────────────┘  │
│                 ▼                                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 3. Sentence Transformer Embedding                    │  │
│  │    (Convert text to 384-dim vector)                  │  │
│  └──────────────┬───────────────────────────────────────┘  │
│                 ▼                                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 4. FAISS Similarity Search                           │  │
│  │    (Find 10 most similar historical cases)           │  │
│  └──────────────┬───────────────────────────────────────┘  │
│                 ▼                                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 5. Calculate Similar Case Readmit Rate               │  │
│  └──────────────┬───────────────────────────────────────┘  │
│                 ▼                                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 6. Build Feature Vector (One-hot encoding)           │  │
│  └──────────────┬───────────────────────────────────────┘  │
│                 ▼                                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 7. Random Forest Prediction                          │  │
│  │    (Risk probability + High/Low classification)      │  │
│  └──────────────┬───────────────────────────────────────┘  │
│                 ▼                                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 8. Return JSON Response                              │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              Frontend Displays Results                       │
│  - Risk Probability (%)                                      │
│  - High/Low Risk Badge                                       │
│  - Similar Case Rate                                         │
│  - Patient Summary                                           │
│  - Clinical Recommendations                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧪 Testing the System

### Test Backend Independently
```bash
# Visit the interactive API documentation
http://localhost:8000/docs

# Or use curl
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "age": 65,
    "gender": "Male",
    "diag_1": "Circulatory",
    "time_in_hospital": 4,
    "num_lab_procedures": 40,
    "num_procedures": 1,
    "n_inpatient": 1,
    "n_emergency": 0,
    "n_outpatient": 0,
    "num_medications": 15,
    "number_diagnoses": 7,
    "insulin": "No"
  }'
```

### Test Frontend with Backend
1. Ensure backend is running at `http://localhost:8000`
2. Open frontend at `http://localhost:5173`
3. Fill in the patient form
4. Click "Predict Readmission Risk"
5. Verify results appear correctly

---

## 🛠️ Production Build

### Build Frontend
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Run Backend in Production
```bash
cd backend
uvicorn api:app --host 0.0.0.0 --port 8000
```

---

## 🐛 Troubleshooting

### Backend Issues

**Problem:** `command not found: uvicorn`
- **Solution:** Activate virtual environment: `.\venv\Scripts\Activate.ps1` (Windows) or `source venv/bin/activate` (macOS/Linux)

**Problem:** Port 8000 already in use
- **Solution:** 
  ```bash
  uvicorn api:app --reload --port 8001
  ```
  Then update `.env`: `VITE_BACKEND_URL=http://localhost:8001`

**Problem:** Models not downloading from HuggingFace
- **Solution:** Check internet connection and ensure `huggingface-hub` is installed

### Frontend Issues

**Problem:** "Prediction failed. Please ensure the backend is running."
- **Solution:** 
  1. Check backend is running: `http://localhost:8000/health`
  2. Verify `.env` has correct `VITE_BACKEND_URL`
  3. Restart frontend dev server after changing `.env`

**Problem:** CORS error in browser console
- **Solution:** Verify frontend is on port 5173 or 5174, or update `allow_origins` in `backend/api.py`

**Problem:** "Cannot find module" errors
- **Solution:** Run `npm install`

---

## 📦 Dependencies

### Frontend
See `package.json` for complete list. Key dependencies:
- React 19
- React Router DOM 7
- Lucide React (icons)
- TailwindCSS v4

### Backend
See `backend/requirements.txt` for complete list. Key dependencies:
- FastAPI
- Uvicorn
- scikit-learn
- sentence-transformers
- faiss-cpu
- huggingface-hub

---

## 📄 License

[Your License Here]

---

## 👥 Contributors

[Your Team Information Here]

---

## 🙏 Acknowledgments

- **HuggingFace** for model hosting
- **Sentence Transformers** for text embeddings
- **FAISS** for efficient similarity search
- **React** and **FastAPI** communities

---

## 📧 Support

For issues, questions, or contributions, please [open an issue](your-repo-url/issues) on GitHub.
