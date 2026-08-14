import type { ProjectMetric, ADR } from "@/data/types";

export const ie224Impact: ProjectMetric[] = [
  {
    id: "dataset-scale",
    label: "Messages Analyzed",
    value: "10M",
    type: "scale",
    context: "10,000,000 messages across email, mobile_push, web_push channels (Apr 2021 – Apr 2023)",
  },
  {
    id: "campaigns",
    label: "Campaigns",
    value: "1,907",
    type: "coverage",
    context: "Bulk, trigger, and transactional campaigns with 205 unique email providers",
  },
  {
    id: "open-rate",
    label: "Open Rate",
    value: "16.14%",
    type: "business",
    context: "Email outperforms push: email 19.29%, mobile_push 11.84%, web_push 1.50%",
  },
  {
    id: "purchase-rate",
    label: "Purchase Rate",
    value: "0.12%",
    type: "business",
    context: "Transactional messages 16x higher purchase rate (0.65%) than bulk (0.04%)",
  },
  {
    id: "channels",
    label: "Channels",
    value: "3",
    type: "coverage",
    context: "Email, mobile_push, web_push — email dominates with 3.98% click rate",
  },
  {
    id: "platforms",
    label: "Platforms",
    value: "4",
    type: "coverage",
    context: "Desktop, phablet, smartphone, tablet — phablet leads with 80.17% click rate",
  },
  {
    id: "ml-accuracy",
    label: "Best ML Accuracy",
    value: "85.7%",
    type: "quality",
    context: "Random Forest classifier for purchase prediction, consistent with CV",
  },
  {
    id: "customers-segmented",
    label: "Customers Segmented",
    value: "7,586",
    type: "scale",
    context: "Potential customers identified (opened + clicked, no purchase) for re-engagement",
  },
  {
    id: "kl-divergence",
    label: "KL Divergence",
    value: "0.127",
    type: "quality",
    context: "Low divergence between Champions and Potential — similar behavioral patterns",
  },
  {
    id: "conversion-funnel",
    label: "Funnel Steps",
    value: "4",
    type: "coverage",
    context: "Sent → Opened (16.14%) → Clicked (14.55%) → Purchased (5.54%)",
  },
];

export const ie224Problem: string =
  "Analyze and evaluate trends in multichannel direct messaging in e-commerce during 2021-2023 using the Kaggle E-commerce Multichannel Direct Messaging dataset. Key questions: How effective are different communication channels? What are engagement patterns across customer segments? How do campaign types compare? Can we predict purchase behavior from message interactions? How should we segment customers into Champions, Potential, and Loss groups?";

export const ie224Constraints: string[] = [
  "10M+ row dataset requires careful memory management — category column 100% empty, platform 92.6% missing, email_provider 42.3% missing",
  "Severe class imbalance — purchase rate only 0.12% (99.88% non-purchasers) makes prediction extremely challenging",
  "Three communication channels with different engagement semantics — email (high intent), mobile_push (interruptive), web_push (browser-dependent)",
  "Temporal data spanning 2 years (Apr 2021 – Apr 2023) — seasonal patterns, holiday effects, and campaign fatigue must be considered",
  "Multi-level campaign hierarchy — campaigns → messages → customer interactions → purchases",
];

export const ie224ADRs: ADR[] = [
  {
    id: "IE-ADR-001",
    title: "Pandas for 10M+ row dataset",
    context:
      "Dataset exceeds 10 million rows with 2.4GB+ memory footprint. Need efficient data processing without distributed computing.",
    decision:
      "Use Pandas with memory optimization (boolean encoding, datetime conversion) and chunked processing where needed.",
    rationale:
      "Pandas provides rich API for grouping, merging, and aggregation. Memory optimization reduces footprint significantly.",
    tradeoffs: [
      "Requires careful memory management; not suitable for datasets exceeding available RAM",
    ],
  },
  {
    id: "IE-ADR-002",
    title: "Undersampling over oversampling for class imbalance",
    context:
      "Purchase rate is only 0.12% — extreme class imbalance makes standard classifiers biased toward majority class.",
    decision:
      "Use RandomUnderSampler to reduce majority class rather than SMOTE oversampling.",
    rationale:
      "Reduces data size but preserves minority class patterns without generating synthetic samples that may not represent real behavior.",
    tradeoffs: [
      "Loses majority class information; may miss edge cases in non-purchaser behavior",
    ],
  },
  {
    id: "IE-ADR-003",
    title: "Logistic Regression as interpretable baseline",
    context:
      "Business stakeholders need interpretable models to understand which factors drive purchases.",
    decision:
      "Use Logistic Regression with L1/L2 regularization as baseline before complex models.",
    rationale:
      "Provides coefficient interpretation for feature importance; fast training; establishes performance floor.",
    tradeoffs: [
      "Limited to linear relationships; R² of 0.096 for duration prediction shows linear models struggle",
    ],
  },
  {
    id: "IE-ADR-004",
    title: "IQR method for outlier detection",
    context:
      "Duration feature (time from open to click) has extreme outliers up to 600,000+ seconds.",
    decision:
      "Use IQR method (1.5 × IQR) to filter outliers from duration feature.",
    rationale:
      "Removes extreme values while preserving 95% of data; simple and interpretable.",
    tradeoffs: [
      "May remove legitimate long-tail behavior (e.g., users who return hours later)",
    ],
  },
  {
    id: "IE-ADR-005",
    title: "Behavioral segmentation over RFM",
    context:
      "Standard RFM (Recency, Frequency, Monetary) segmentation doesn't capture the message interaction journey.",
    decision:
      "Segment customers based on message interaction behavior: Champions (opened+clicked+purchased), Potential (opened+clicked), Loss (no engagement).",
    rationale:
      "Directly maps to the communication funnel; actionable for re-engagement campaigns; validates with KL Divergence (0.127 = similar distributions).",
    tradeoffs: [
      "Simpler than RFM but doesn't capture monetary value directly",
    ],
  },
  {
    id: "IE-ADR-006",
    title: "KL Divergence for segment validation",
    context:
      "Need to validate that Champions and Potential segments are meaningfully different in behavioral patterns.",
    decision:
      "Calculate KL Divergence between Champions and Potential duration distributions.",
    rationale:
      "Low KL Divergence (0.127) confirms behavioral similarity — Potential customers are close to converting, making re-engagement campaigns high-ROI.",
    tradeoffs: [
      "KL Divergence is sensitive to binning; results may vary with different histogram configurations",
    ],
  },
  {
    id: "IE-ADR-007",
    title: "Random Forest for feature importance",
    context:
      "Need to identify which features most strongly predict purchase behavior beyond simple coefficients.",
    decision:
      "Use Random Forest classifier for feature importance ranking and purchase prediction.",
    rationale:
      "Captures non-linear interactions; 85.7% accuracy with consistent CV; feature importance reveals actionable insights.",
    tradeoffs: [
      "Less interpretable than Logistic Regression; requires additional SHAP/LIME analysis for explanations",
    ],
  },
];

export const ie224Limitations: string[] = [
  "Linear Regression performs poorly — R² = 0.096 (only 9.6% variance explained) for duration prediction",
  "Extreme class imbalance — 0.12% purchase rate makes F1-Score low (0.149) despite 82% accuracy",
  "Significant missing data — category column 100% empty, platform 92.6% missing, email_provider 42.3% missing",
  "Overfitting risk — CV accuracy (56.79%) much lower than test accuracy (82.18%) for Logistic Regression",
  "No temporal validation — train/test split doesn't respect time ordering, may leak future information",
  "Limited feature engineering — no interaction terms, polynomial features, or lag features",
  "No gradient boosting models — XGBoost/LightGBM could improve performance on tabular data",
  "Demo dataset — messages-demo.csv is a subset; full 10M+ dataset analysis may yield different results",
];

export const ie224Improvements: string[] = [
  "Add gradient boosting models (XGBoost, LightGBM) for better tabular data performance",
  "Implement time-based train/test split to respect temporal ordering and prevent data leakage",
  "Add interaction features (duration × campaign_type, channel × platform) for richer signal",
  "Use target encoding for high-cardinality categorical variables (email_provider with 205 values)",
  "Implement early stopping in gradient boosting to prevent overfitting",
  "Add holiday effect features as binary indicators rather than separate dataset",
  "Expand hyperparameter tuning with Bayesian optimization (Optuna) instead of GridSearchCV",
  "Build ensemble methods combining Logistic Regression + Random Forest + Gradient Boosting",
  "Implement SHAP values for model interpretability beyond feature importance rankings",
  "Add A/B test analysis leveraging existing flags in campaigns dataset",
];
