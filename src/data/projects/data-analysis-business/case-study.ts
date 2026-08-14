import type { ProjectMetric, ADR } from "@/data/types";

export const dabImpact: ProjectMetric[] = [
  {
    id: "models-compared",
    label: "Models Compared",
    value: "8",
    type: "coverage",
    context: "LR, LR-CF-DP, FFT, ARIMA, RNN, GRU, LSTM, LightGBM — spanning statistical, ML, and deep learning",
  },
  {
    id: "configurations",
    label: "Configurations Tested",
    value: "72",
    type: "scale",
    context: "8 models × 3 companies × 3 train/test splits (7:3, 8:2, 9:1)",
  },
  {
    id: "best-mape",
    label: "Best MAPE",
    value: "<3.5%",
    type: "quality",
    context: "LSTM consistently achieves MAPE below 3.5% across all three stocks",
  },
  {
    id: "data-points",
    label: "Data Points",
    value: "3,762",
    type: "scale",
    context: "AMV (1,313) + DHT (1,312) + DP3 (1,137) from Investing.com, Mar 2019 – May 2024",
  },
  {
    id: "forecast-horizons",
    label: "Forecast Horizons",
    value: "3",
    type: "coverage",
    context: "30-day, 60-day, and 90-day ahead predictions for each model × company combination",
  },
  {
    id: "notebooks",
    label: "Jupyter Notebooks",
    value: "42",
    type: "scale",
    context: "32 model notebooks + 6 lab notebooks + 4 class example notebooks",
  },
  {
    id: "report-figures",
    label: "Report Figures",
    value: "113",
    type: "quality",
    context: "PNG figures in IEEE OJIES format LaTeX report (957 lines, 87 bibliography references)",
  },
  {
    id: "deep-learning",
    label: "DL Architectures",
    value: "3",
    type: "coverage",
    context: "3-layer stacked LSTM, single-layer GRU, 4-layer SimpleRNN with dropout",
  },
  {
    id: "ml-models",
    label: "ML Models",
    value: "2",
    type: "coverage",
    context: "LightGBM (hybrid LSTM+LGBM two-stage) + ARIMA (auto-selected via pmdarima)",
  },
  {
    id: "stat-models",
    label: "Statistical Models",
    value: "3",
    type: "coverage",
    context: "Linear Regression, LR with Calendar Fourier + DeterministicProcess, FFT frequency decomposition",
  },
];

export const dabProblem: string =
  "Predict the daily closing stock price of three Vietnamese pharmaceutical companies (AMV, DHT, DP3) listed on HOSE exchange 30, 60, and 90 days into the future, comparing 8 different forecasting models spanning statistical methods, traditional machine learning, and deep learning. The Vietnamese pharmaceutical sector represents a market with moderate liquidity, notable volatility, and limited prior academic study using deep learning methods.";

export const dabConstraints: string[] = [
  "Temporal train-test splitting required — random shuffling would leak future information into training, producing artificially high accuracy that does not generalize to real deployment",
  "Eight models across three categories must be compared fairly — same data preprocessing pipeline (MinMaxScaler, dropna, temporal sort), same evaluation metrics (RMSE, MAPE, MSLE), same forecast horizons (30/60/90 days)",
  "Univariate price-only input for most models — simplifies the pipeline and focuses on the core forecasting problem, though LightGBM hybrid uses 4 features (OHLC)",
  "Different lookback windows per architecture — LSTM/RNN use time_step=30 (6 weeks), GRU uses time_step=100 (5 months) to compensate for simpler gating mechanism",
  "IEEE OJIES format academic report required — full methodology, results tables, related works, bibliography with 87 references",
  "Three Vietnamese pharmaceutical stocks with different price ranges — AMV (2,700–24,589 VND), DHT (9,384–40,400 VND), DP3 (57,600–157,500 VND) — testing model robustness across scales",
];

export const dabADRs: ADR[] = [
  {
    id: "DAB-ADR-001",
    title: "Temporal train-test split over random split",
    context:
      "Stock price data is a time series with autocorrelation. Random splitting would leak future information into training.",
    decision:
      "Use chronological splitting (7:3, 8:2, 9:1) instead of random shuffling. Data sorted in ascending chronological order before splitting.",
    rationale:
      "Results are more realistic and reflect genuine out-of-sample performance. Three ratios provide insight into how model performance degrades as the test set shrinks.",
    tradeoffs: [
      "Results are sensitive to the specific market regime captured in the test period",
    ],
  },
  {
    id: "DAB-ADR-002",
    title: "MinMaxScaler(0,1) for neural network normalization",
    context:
      "LSTM, GRU, and RNN are sensitive to input scale. DP3 prices reach 157,500 VND while AMV starts at 2,700 VND.",
    decision:
      "Normalize all inputs to [0,1] range using MinMaxScaler(feature_range=(0,1)) for neural network models.",
    rationale:
      "Ensures stable gradient flow during training and prevents large price values from dominating the loss function.",
    tradeoffs: [
      "Predictions must be inverse-transformed to original scale for evaluation",
    ],
  },
  {
    id: "DAB-ADR-003",
    title: "time_step=30 for LSTM/RNN, time_step=100 for GRU",
    context:
      "Different architectures have different memory capacities. GRU with a single layer needs more historical context.",
    decision:
      "Use time_step=30 (~6 weeks) for LSTM and RNN (3 stacked layers), time_step=100 (~5 months) for GRU (single layer).",
    rationale:
      "LSTM and RNN with stacked layers capture long-range dependencies through hierarchical feature extraction. GRU with a single layer needs a larger window to capture equivalent temporal context.",
    tradeoffs: [
      "GRU notebooks cannot be directly compared to LSTM/RNN on window size",
    ],
  },
  {
    id: "DAB-ADR-004",
    title: "3-layer stacked LSTM architecture",
    context:
      "Need an architecture that captures both short-term and long-term patterns in stock price sequences.",
    decision:
      "Use 3 LSTM layers with 50 units each, all with return_sequences=True, + Dense(1) output. Optimizer: Adam, Loss: MSE, Epochs: 100, Batch size: 64.",
    rationale:
      "Stacking allows hierarchical feature extraction — lower layers capture short-term patterns, higher layers capture longer-term abstractions. 50 units per layer balances capacity with overfitting risk on ~1,300 samples.",
    tradeoffs: [
      "More parameters than single-layer GRU, but consistently produces the best results",
    ],
  },
  {
    id: "DAB-ADR-005",
    title: "Hybrid LSTM+LightGBM two-stage approach",
    context:
      "Explore whether combining LSTM's sequence modeling with LightGBM's ensemble decision-making can improve predictions.",
    decision:
      "Train LSTM first to produce predictions on the training set, then use LSTM predictions as an additional input feature for LightGBM (4 OHLC features + LSTM predictions).",
    rationale:
      "Combines LSTM's sequence modeling strength with LightGBM's ensemble decision-making. Hypothesis: LightGBM can correct LSTM's systematic biases.",
    tradeoffs: [
      "Adds complexity and training time; results show mixed improvement — better on DP3 but worse on AMV vs. standalone LSTM",
    ],
  },
  {
    id: "DAB-ADR-006",
    title: "pmdarima.auto_arima for automated order selection",
    context:
      "Manual (p,d,q) tuning for ARIMA is time-consuming and introduces human bias.",
    decision:
      "Use pmdarima.auto_arima() with max_p=5, max_q=5, m=12, d=1, D=1, seasonal=True, stepwise=True.",
    rationale:
      "Removes human bias and ensures optimal parameters for each dataset. Search space covers common seasonal ARIMA configurations.",
    tradeoffs: [
      "ARIMA still underperforms neural models, suggesting the limitation is fundamental to the linear ARIMA framework",
    ],
  },
  {
    id: "DAB-ADR-007",
    title: "Univariate price-only input for most models",
    context:
      "Stock data includes OHLCV (5 features), but using only closing price simplifies the pipeline.",
    decision:
      "Most models use only the closing price as input. LightGBM hybrid is the exception, using 4 features (Open, High, Low, Price).",
    rationale:
      "Simplifies the modeling pipeline, reduces dimensionality, and focuses on the core forecasting problem. Enables direct comparison across model architectures.",
    tradeoffs: [
      "Models cannot leverage intraday information (open, high, low) or volume signals",
    ],
  },
];

export const dabLimitations: string[] = [
  "No external features — models use only historical price data; real-world prediction benefits from fundamentals, macro indicators, sentiment, and sector-specific factors",
  "No cross-validation — single temporal split per configuration; walk-forward validation would provide more robust performance estimates",
  "Limited hyperparameter tuning — LSTM uses fixed hyperparameters across all stocks; per-stock Bayesian optimization could improve results",
  "No confidence intervals — point forecasts only; quantile regression or Monte Carlo dropout critical for financial decision-making",
  "Data ends May 2024 — does not capture 2024-2025 market dynamics",
  "Single stock per company — no portfolio-level analysis or correlation modeling between the three pharmaceutical stocks",
  "No transaction cost modeling — predictions assume frictionless trading",
  "RNN failure on 9:1 split — SimpleRNN produces negative price predictions on AMV 9:1, indicating architectural instability with certain data proportions",
  "LightGBM hybrid does not consistently outperform LSTM — two-stage approach adds complexity without guaranteed improvement",
  "Volume data is underutilized — parsed but not used as model input in most notebooks",
];

export const dabImprovements: string[] = [
  "Add technical indicators as features (RSI, MACD, Bollinger Bands, moving averages) and volume-weighted metrics",
  "Implement Transformer-based models (Temporal Fusion Transformer, Informer, Autoformer) for longer-horizon forecasting",
  "Build ensemble methods combining LSTM + GRU + LightGBM predictions for more robust forecasts",
  "Add walk-forward validation with rolling window evaluation to simulate real deployment",
  "Use Bayesian optimization (Optuna) for per-stock hyperparameter tuning of LSTM architecture",
  "Add macroeconomic features (VN-Index, USD/VND exchange rate, interest rate decisions, COVID-19 case counts)",
  "Implement probabilistic forecasting with Monte Carlo simulations or quantile regression for prediction intervals",
  "Deploy from notebooks to a production-ready Python package with automated retraining pipeline",
  "Add anomaly detection for outlier stock movements (flash crashes, news-driven spikes)",
  "Extend to portfolio-level analysis with cross-stock correlation and sector index modeling",
];
