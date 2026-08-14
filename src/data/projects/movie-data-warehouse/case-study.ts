import type { ProjectMetric, ADR } from "@/data/types";

export const movieImpact: ProjectMetric[] = [
  {
    id: "raw-rows",
    label: "Raw Dataset",
    value: "1.16M",
    type: "scale",
    context: "1,160,498 movies × 24 columns from Kaggle TMDB v11 dataset (204.7 MB CSV)",
  },
  {
    id: "warehouse-rows",
    label: "Warehouse Rows",
    value: "782K",
    type: "scale",
    context: "782,516 movies after preprocessing (filtered to 1980+), 21 columns, 115.7 MB",
  },
  {
    id: "star-schema",
    label: "Star Schema",
    value: "8D + 1F",
    type: "coverage",
    context: "8 dimension tables (Date, Movie, Genre, Company, Country, Language, Runtime, Adult) + 1 fact table",
  },
  {
    id: "olap-cube",
    label: "OLAP Cube",
    value: "MOLAP",
    type: "coverage",
    context: "SSAS multidimensional cube with 7 measures, 8 dimensions, time hierarchy (Year→Quarter→Month→Day)",
  },
  {
    id: "mdx-queries",
    label: "MDX Queries",
    value: "24",
    type: "quality",
    context: "TOPCOUNT, DRILLDOWNLEVEL, CROSSJOIN, GENERATE, calculated members with IIF, FILTER, set algebra",
  },
  {
    id: "ssrs-reports",
    label: "SSRS Reports",
    value: "3",
    type: "coverage",
    context: "Paginated reports connected to SSAS cube via OLEDB-MD data source",
  },
  {
    id: "ml-accuracy",
    label: "ML Accuracy",
    value: "94.14%",
    type: "quality",
    context: "SVR model predicting movie revenue from 57 engineered features, MAPE 5.86, R² 0.92",
  },
  {
    id: "ml-models",
    label: "ML Models",
    value: "10",
    type: "coverage",
    context: "Linear Regression, Ridge, k-NN, Decision Tree, SVR, Random Forest, Gradient Boosting, AdaBoost, XGBoost, LightGBM",
  },
  {
    id: "fk-constraints",
    label: "FK Constraints",
    value: "8",
    type: "quality",
    context: "Referential integrity enforced via ALTER TABLE ... ADD CONSTRAINT on all dimension foreign keys",
  },
  {
    id: "bi-tools",
    label: "BI Tools",
    value: "3",
    type: "coverage",
    context: "SSRS (3 reports) + Power BI (71.5 MB dashboard) + Excel (107 MB PivotTable workbook)",
  },
];

export const movieProblem: string =
  "The global film industry generates massive volumes of data — titles, budgets, revenues, ratings, production metadata — but raw data alone cannot drive decisions. This project builds a complete end-to-end Data Warehouse and OLAP solution using the TMDB (The Movie Database) Movies dataset, enabling multidimensional analysis of movie performance across genres, countries, languages, studios, and time. An additional machine learning extension predicts movie box-office revenue from pre-release features. Academic context: final project for Data Warehousing & OLAP course (IS217.O21.HTCL), requiring SSIS ETL, SSAS OLAP cubes, SSRS/Power BI/Excel reporting, and data mining.";

export const movieConstraints: string[] = [
  "Microsoft BI stack required — SSIS for ETL, SSMS for warehouse, SSAS for OLAP cube, SSRS for reporting, plus Power BI and Excel for ad-hoc analysis",
  "Star Schema with 8 dimensions + 1 fact — flat dimensional model optimized for SSAS cube compatibility and efficient MDX queries",
  "Python preprocessing before SSIS — Pandas handles complex data cleaning (null imputation, median zero-replacement, list splitting, feature binning) that is cumbersome in SSIS expressions",
  "MOLAP storage for SSAS cube — pre-aggregated multidimensional storage for fast query performance on 782K fact rows",
  "Referential integrity via 8 FK constraints — all dimension foreign keys enforced via ALTER TABLE after fact table population",
  "Data mining component — predict movie revenue from pre-release features using 10 ML models with GridSearchCV hyperparameter tuning",
];

export const azureADRs: ADR[] = [];

export const movieADRs: ADR[] = [
  {
    id: "MOV-ADR-001",
    title: "Star Schema over Snowflake Schema",
    context:
      "Need a dimensional model optimized for analytical query performance and SSAS cube compatibility.",
    decision:
      "Use a flat star schema with 8 single-level dimensions (no normalization within dimensions).",
    rationale:
      "Simpler joins, better SSAS cube compatibility, standard for OLAP workloads. All dimensions are single-table, enabling intuitive navigation for analysts.",
    tradeoffs: [
      "Some data redundancy in dimension text columns, but acceptable for read-heavy analytical workloads",
    ],
  },
  {
    id: "MOV-ADR-002",
    title: "Python preprocessing before SSIS ETL",
    context:
      "Raw CSV has 1.16M rows with 89% missing homepage, 35%+ zero budgets, comma-delimited multi-value columns, and inconsistent date formats.",
    decision:
      "Use Python/Pandas for initial data cleaning (null imputation, median zero-replacement, list splitting, feature binning), then SSIS for warehouse loading.",
    rationale:
      "Python provides richer data manipulation capabilities (datetime parsing, median imputation, list splitting, feature engineering) that are cumbersome in SSIS expressions. SSIS excels at database loading and constraint management.",
    tradeoffs: [
      "Two-step process instead of a single ETL tool, but each tool is used for its strengths",
    ],
  },
  {
    id: "MOV-ADR-003",
    title: "MOLAP storage for SSAS cube",
    context:
      "OLAP cube needs fast query performance for multidimensional analysis with pre-aggregated measures.",
    decision:
      "Use MOLAP (Multidimensional OLAP) storage mode for the SSAS cube.",
    rationale:
      "Best query performance for pre-aggregated multidimensional analysis; appropriate for the dataset size (~782K fact rows). Data is physically stored in SSAS server's multidimensional format.",
    tradeoffs: [
      "Requires processing time to build the cube; data is not real-time",
    ],
  },
  {
    id: "MOV-ADR-004",
    title: "Surrogate keys with IDENTITY columns",
    context:
      "Dimension tables need stable primary keys independent of source system identifiers.",
    decision:
      "Auto-generated integer surrogate keys (IDENTITY) for all dimensions except Dim_Movie (which uses the TMDB float ID).",
    rationale:
      "Standard DW practice; immune to source system key changes. Dim_Movie uses TMDB ID for direct traceability to the source dataset.",
    tradeoffs: [
      "Dim_Movie using the natural TMDB ID (float) creates a foreign key with float type, which is suboptimal for join performance",
    ],
  },
  {
    id: "MOV-ADR-005",
    title: "Budget zero-replacement with median",
    context:
      "35%+ of movies have budget=0 in the raw data (missing, not truly zero). Dropping would lose too many records.",
    decision:
      "Replace zero-budget values with the median of non-zero budgets rather than dropping rows.",
    rationale:
      "Median is robust to outliers; preserves record count for analysis. Acknowledged as a known limitation in the data mining notebook.",
    tradeoffs: [
      "Introduces artificial clustering at the median value",
    ],
  },
  {
    id: "MOV-ADR-006",
    title: "Extensive feature engineering for ML (57 features)",
    context:
      "Movie revenue prediction requires domain-specific features beyond generic encoding.",
    decision:
      "Engineer 57 features from 22 raw columns: log transforms, one-hot encoding, genre ranking by average revenue, top-25 studio indicators, English-language flags, release season dummies.",
    rationale:
      "Domain knowledge from EDA guided feature creation. Log transforms address heavy-tailed distributions. Genre/studio rankings capture industry dynamics.",
    tradeoffs: [
      "High dimensionality may contribute to multicollinearity (noted in the project)",
    ],
  },
  {
    id: "MOV-ADR-007",
    title: "Truncate-and-reload pattern",
    context:
      "Academic project with static dataset; no incremental data arrival.",
    decision:
      "TRUNCATE all tables before each full load (SCD Type 1 implicit).",
    rationale:
      "Simplicity for an academic project; the dataset is small enough for full reload. Avoids complex SCD Type 2 logic.",
    tradeoffs: [
      "No historical tracking; not suitable for production incremental loads",
    ],
  },
];

export const movieLimitations: string[] = [
  "No incremental load support — full truncate-and-reload only; no CDC or watermarking",
  "Dim_Movie uses float PK (TMDB ID) instead of int — degrades join performance and index efficiency",
  "No scheduling/automation — SSIS package runs manually; no SQL Agent job or orchestration",
  "Single-threaded ETL — no parallel data flow tasks for dimension loading",
  "Hardcoded file paths — SSIS connection strings contain absolute local paths",
  "No data lineage or metadata management — no documentation of transformations beyond comments",
  "ML average error of ~$30M per prediction — significant for lower-budget films",
  "Multicollinearity — many features correlated (budget/revenue, num_studios/numTopStudios), noted but not fully addressed",
  "No unit tests — no validation scripts for schema correctness or row count assertions",
  "Missing SCD handling — no support for slowly changing dimensions beyond Type 1",
];

export const movieImprovements: string[] = [
  "Add incremental ETL with watermarks or CDC instead of truncate-and-reload",
  "Convert Dim_Movie PK from float to int for better join performance",
  "Parameterize SSIS connection strings (environment variables or SSIS package parameters)",
  "Add data quality validation tasks (row count checks, null assertions) in SSIS pipeline",
  "Implement SQL Agent scheduling for automated ETL runs",
  "Address multicollinearity with VIF analysis or PCA for the ML model",
  "Add more ML models (Neural Networks, CatBoost) and hyperparameter tuning with Optuna",
  "Implement pipeline monitoring and logging for production observability",
  "Add SCD Type 2 for movie status changes (Released → Rumored → Postponed)",
  "Deploy SSAS cube processing to SQL Agent for automated refresh",
];
