# Hospital Readmission Risk Prediction: Requirements Audit

## Executive summary

This repository provides a polished React/FastAPI prototype for estimating 30-day hospital readmission risk. It implements a Random Forest inference flow and a retrieval-style feature based on similar historical cases.

However, it does **not yet meet the complete implementation scope defined for this project**. The most important missing requirements are a valid trained Logistic Regression model, reproducible dataset/training/evaluation code, and a fair with-RAG versus without-RAG model comparison. The frontend production build also currently fails.

This report evaluates only the source code and locally available artifacts. Claims in the UI and README were not treated as proof where the corresponding training artifacts or scripts are absent.

---

## Requirements traceability

| Requirement from use case | Status | Evidence and assessment |
| --- | --- | --- |
| Predict readmission within 30 days | Partially implemented | The application presents a 30-day readmission prediction, but no data-preparation code documents or proves the `<30` target-label transformation. |
| Use the UCI Diabetes 130-US Hospitals dataset | Not reproducible | The repository contains no source dataset, download script, data dictionary, preprocessing pipeline, or dataset version/checksum. |
| Use structured clinical/demographic encounter data | Partially implemented | The patient form and API collect a subset of relevant encounter attributes: demographics, diagnosis category, stay duration, procedures, medications, prior visits, and insulin status. |
| Generate synthetic patient summaries for retrieval | Implemented | `make_summary()` creates a structured synthetic patient-case summary in `backend/api.py`. |
| Retrieve similar historical encounters | Implemented, subject to artifact availability | The API embeds the summary with SentenceTransformer and retrieves ten neighbours from a FAISS index. The index is downloaded at startup rather than stored locally. |
| Use similar-case readmission rate as an engineered feature | Implemented | The mean outcome of retrieved neighbours is assigned to `similar_case_readmit_rate` before prediction. |
| Train and compare Logistic Regression | Not fulfilled | `lr_model.pkl` is not present. When selected, the API trains Logistic Regression on random dummy features and random labels, making results invalid. |
| Train and compare Random Forest | Partially implemented | Random Forest inference is implemented, but the trained artifact is fetched from Hugging Face. There is no local training or evaluation process to reproduce it. |
| Same train/test split for both models | Not implemented / unverifiable | No split-generation, random seed, cross-validation, test-set prediction, or experiment-tracking code exists. |
| Compare every model with and without RAG | Not fulfilled | The UI toggle changes the inference feature value to `0.0`; it does not select models separately trained and evaluated without the RAG feature. |
| Report AUC-ROC, F1, Precision, and Recall | Displayed but not proven | The UI displays four metrics, but fallback values in the API are labelled as approximate. No persisted evaluation result establishes their source, split, threshold, or RAG condition. |
| Identify best model and deployment suitability | Partially implemented | The interface calls Random Forest the best model, but that claim must be supported by a fair evaluation against a valid Logistic Regression baseline. |

---

## What currently works

### Patient-facing workflow

- React interface for entering encounter attributes and generating a risk score.
- FastAPI `POST /predict` endpoint.
- Risk probability, high/low-risk classification, synthetic patient summary, and similar-case readmission rate.
- Patient prediction history stored in browser local storage.
- PDF report-generation endpoint.

### Retrieval augmentation flow

1. The API creates a synthetic summary from the submitted encounter data.
2. A local SentenceTransformer model embeds that summary.
3. FAISS retrieves the ten closest indexed historical cases.
4. The mean historical readmission outcome becomes `similar_case_readmit_rate`.
5. The feature is passed to the selected model.

This is a valid **retrieval-augmented feature-engineering pattern**, provided that the index contains only training-set cases during evaluation and production governance is in place.

---

## Major findings and how to correct them

### 1. Logistic Regression predictions are invalid

**Finding:** If `backend/artifacts/lr_model.pkl` does not exist, the API fits Logistic Regression using random features and random labels. This is explicitly placeholder code and must never be used for clinical or demo conclusions.

**Correction:**

1. Train Logistic Regression using the real processed training set.
2. Use the exact feature set, encoding, scaling, and RAG condition associated with the model.
3. Save the complete preprocessing pipeline and model with `joblib` or `pickle`.
4. Load the saved artifact at startup; fail clearly if it is missing.
5. Remove dummy-model fallback logic entirely.

**Acceptance check:** Choosing Logistic Regression produces a prediction from a persisted real model and has a documented test-set evaluation record.

### 2. RAG/no-RAG comparison is not methodologically valid

**Finding:** The current `use_rag` switch only inserts `0.0` in the RAG feature at prediction time. A model trained with the RAG feature should not be used as the no-RAG baseline.

**Correction:** Train separate experiments for each model family:

| Model | No-RAG experiment | With-RAG experiment |
| --- | --- | --- |
| Logistic Regression | Train on tabular features only | Train on tabular features plus retrieved readmission rate |
| Random Forest | Train on tabular features only | Train on tabular features plus retrieved readmission rate |

For each experiment, keep preprocessing, random seed, training partition, validation procedure, and test partition consistent. Report metric differences as `with RAG - without RAG`.

**Acceptance check:** There are four trained/evaluated experiments, not one model with an inference-time zero substitution.

### 3. No reproducible data, preprocessing, or evaluation pipeline

**Finding:** There are no scripts/notebooks that download the UCI data, clean it, create labels, split data, train models, or calculate metrics. The repository cannot substantiate reported model performance.

**Correction:** Add a reproducible pipeline such as:

```text
backend/
  data/
    download_data.py
    prepare_data.py
  training/
    split_data.py
    build_retrieval_index.py
    train_tabular_models.py
    evaluate_models.py
  artifacts/
    manifest.json
    metrics.json
```

The pipeline should document:

- Dataset source, licensing, retrieval date, row count, and checksum.
- Target definition: `readmitted == "<30"` is positive; all other labels are negative.
- Missing-value handling, feature transformations, diagnosis-category mapping, and excluded fields.
- Patient-level leakage prevention. Encounters from the same patient should not appear across training and test sets where patient identifiers are available.
- A fixed, stratified split and seed.
- Retrieval-index rule: construct the FAISS index only from training cases when generating validation/test RAG features.
- Classification threshold selection based on validation data, not the test set.

**Acceptance check:** A new machine can reproduce model artifacts and `metrics.json` from documented commands.

### 4. Reported metrics are not auditable

**Finding:** The API falls back to hard-coded values described as approximate. The UI displays these as model performance, while one view labels them as training performance and another calls them test-dataset performance.

**Correction:**

1. Generate metrics programmatically from held-out test predictions.
2. Save them in version-controlled JSON/CSV, for example:

```json
{
  "split": "stratified_holdout_v1",
  "seed": 42,
  "threshold_source": "validation_set",
  "models": {
    "random_forest_with_rag": {
      "auc_roc": 0.0,
      "f1": 0.0,
      "precision": 0.0,
      "recall": 0.0
    }
  }
}
```

3. Make the API return the metrics that correspond exactly to the selected model and RAG condition.
4. In the UI, label results as “held-out test metrics” only if they genuinely are held-out test metrics.

**Acceptance check:** Every displayed metric can be traced to a named experiment, artifact version, split, threshold, and evaluation script output.

### 5. Artifact availability and startup reliability are weak

**Finding:** The Random Forest model and FAISS index are downloaded at API startup. A local clone will not start successfully without network access and access to the external Hugging Face repository. The local `artifacts` directory does not contain `rf_model.pkl`, `faiss_index.bin`, `lr_model.pkl`, or `model_metrics.pkl`.

**Correction:**

- Add an `artifacts/manifest.json` listing required files, SHA-256 hashes, model versions, feature schema version, and training experiment ID.
- Provide an explicit `download_artifacts.py` command rather than downloading silently at server startup.
- Validate all required artifacts before serving requests, with clear error messages.
- Pin dependencies in `requirements.txt`.
- Do not rely on unverified pickle files from remote sources in production.

**Acceptance check:** Startup validates compatible artifacts deterministically and errors before accepting requests if required files are missing.

### 6. Frontend production build fails

**Finding:** `npm run build` fails with:

```text
TypeError: manualChunks is not a function
```

The current Vite/Rolldown configuration does not accept the `manualChunks` object in `vite.config.js`.

**Correction:** Remove the custom `manualChunks` configuration or convert it to a function compatible with the installed Vite/Rolldown release. Then run:

```powershell
npm.cmd run build
npm.cmd run lint
```

**Acceptance check:** `npm run build` exits successfully and the generated app can call the API.

---

## Recommended implementation sequence

1. Fix the frontend build configuration.
2. Add data download, target creation, preprocessing, and fixed split scripts.
3. Train real no-RAG Logistic Regression and Random Forest baselines.
4. Build training-only FAISS retrieval and train corresponding RAG variants.
5. Produce a single reproducible experiment-results table covering all four variants.
6. Replace hard-coded metrics and dummy fallback paths with versioned artifacts.
7. Update API/UI model options and metrics to map exactly to selected experiment variants.
8. Add automated tests for API schemas, feature order, artifact compatibility, and build success.
9. Add clinical-safety documentation before any real deployment discussion.

---

## Final acceptance checklist

- [ ] Dataset provenance and preprocessing are documented and reproducible.
- [ ] Positive target is verifiably `readmitted <30`.
- [ ] A fixed, leakage-safe train/validation/test split is used by every experiment.
- [ ] FAISS index is built only from training encounters for validation/test evaluation.
- [ ] Real Logistic Regression and Random Forest artifacts exist.
- [ ] Both models are trained/evaluated with and without RAG.
- [ ] AUC-ROC, F1, Precision, and Recall are calculated on the held-out test set.
- [ ] Metrics indicate model version, RAG condition, threshold, split, and seed.
- [ ] API and UI expose both valid model choices and correct corresponding metrics.
- [ ] No dummy training or approximate hard-coded metrics remain.
- [ ] `npm run build` and backend startup checks pass.
- [ ] The product is labelled as decision support, with appropriate validation, privacy, bias, monitoring, and human-oversight controls before clinical deployment.

---

## Current conclusion

The project is a strong **interface and proof-of-concept for Random Forest plus retrieval-derived features**, but it should not currently be presented as a completed comparative study or as clinically deployable prediction software. Completing the remediation steps above will align it with the intended Logistic Regression and Random Forest hospital readmission risk prediction scope.
