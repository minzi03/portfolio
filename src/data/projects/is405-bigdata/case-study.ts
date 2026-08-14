import type { ProjectMetric, ADR } from "@/data/types";

export const is405Impact: ProjectMetric[] = [
  {
    id: "heart-dataset",
    label: "Heart Disease Dataset",
    value: "320K",
    type: "scale",
    context: "319,795 rows × 18 columns — custom normal-equation linear regression from scratch in PySpark RDD",
  },
  {
    id: "knn-dataset",
    label: "KNN Bank Dataset",
    value: "42K",
    type: "scale",
    context: "42,639 rows × 16 columns — MapReduce KNN classifier with 86.39% accuracy",
  },
  {
    id: "kmeans-dataset",
    label: "K-Means Dataset",
    value: "8,950",
    type: "scale",
    context: "Credit card data, 18 features — custom K-Means from scratch, Silhouette 0.380 vs SparkML 0.270",
  },
  {
    id: "frameworks",
    label: "Frameworks",
    value: "5",
    type: "coverage",
    context: "Hadoop MapReduce (Java), PySpark RDD, Spark SQL, Spark MLLib, Apache Doris OLAP",
  },
  {
    id: "algorithms",
    label: "ML Algorithms",
    value: "6",
    type: "coverage",
    context: "Linear Regression, Decision Tree, Naive Bayes, K-Means, KNN, TF-IDF",
  },
  {
    id: "dt-accuracy",
    label: "Decision Tree",
    value: "90%",
    type: "quality",
    context: "LIBSVM dataset, 70/30 split, pipeline with StringIndexer + VectorIndexer",
  },
  {
    id: "knn-accuracy",
    label: "KNN Accuracy",
    value: "86.4%",
    type: "quality",
    context: "MapReduce implementation on bank data, k=5, 4 partitions, 3,667s runtime",
  },
  {
    id: "custom-lr-r2",
    label: "Custom LR R²",
    value: "0.113",
    type: "quality",
    context: "Normal equation (X^T·X)⁻¹·X^T·y implemented from scratch in PySpark RDD on 320K rows",
  },
  {
    id: "mapreduce-jobs",
    label: "MapReduce Jobs",
    value: "7",
    type: "coverage",
    context: "WordCount, PairCount, PriceThreshold, AvgPrice, MinMax, KNN mapPhase, KNN reducer",
  },
  {
    id: "doris-queries",
    label: "Doris SQL",
    value: "5",
    type: "coverage",
    context: "Apache Doris OLAP seminar: stream load, AGGREGATE KEY model, real-time analytics on eBay data",
  },
];

export const is405Problem: string =
  "Comprehensive IS405 Big Data coursework portfolio addressing distributed computing across the full big data stack: Hadoop MapReduce (Java) for text processing and co-occurrence counting, PySpark RDD for statistical computations, Spark MLLib for ML classification/clustering, custom from-scratch normal-equation linear regression on 320K heart disease records, MapReduce KNN classifier on bank data, and Apache Doris OLAP for real-time analytics.";

export const is405Constraints: string[] = [
  "Multi-framework requirement — Hadoop MapReduce (Java) for batch processing, PySpark RDD for distributed ML, Spark MLLib for standard algorithms, Apache Doris for OLAP",
  "From-scratch implementations required — normal equation linear regression and K-Means clustering built using low-level PySpark RDD operations (map, reduce, collect) instead of library calls",
  "Large-scale datasets — 320K rows (heart disease), 43K rows (bank), 9K rows (credit card) — meaningful for demonstrating distributed computing benefits",
  "Class imbalance in bank data — 90.7% negative / 9.3% positive for term_deposit target, requiring careful evaluation beyond accuracy",
  "MapReduce KNN parallelism — must distribute distance computation across partitions with broadcast variables for test data",
  "Symmetric pair key for co-occurrence — custom WritableComparable with AB=BA equality for transaction pair counting",
];

export const is405ADRs: ADR[] = [
  {
    id: "IS-ADR-001",
    title: "Normal equation over gradient descent for custom LR",
    context:
      "Final project requires implementing linear regression from scratch in PySpark RDD on 320K rows × 14 features.",
    decision:
      "Use normal equation beta = (X^T · X)⁻¹ · X^T · y with numpy linalg.inv and dot product, computed via RDD map/reduce.",
    rationale:
      "Exact solution in one pass; simpler to implement from scratch in RDD; 14×14 matrix inversion is trivial. Normal equation is deterministic and avoids learning rate tuning.",
    tradeoffs: [
      "O(n³) matrix inversion complexity; not scalable for high-dimensional data",
      "Gradient descent would be more scalable but harder to implement correctly in RDD",
    ],
  },
  {
    id: "IS-ADR-002",
    title: "Custom label encoding via broadcast UDF",
    context:
      "Heart disease dataset has 14 categorical columns that need integer encoding before vectorization.",
    decision:
      "Build mapping dict from unique values to integers, broadcast to all executors, apply via PySpark UDF.",
    rationale:
      "Explicit control over encoding mappings; more transparent than StringIndexer; portable across Spark versions.",
    tradeoffs: [
      "More code than StringIndexer; requires manual mapping management",
    ],
  },
  {
    id: "IS-ADR-003",
    title: "Min-Max clipping over row removal for outliers",
    context:
      "Bank dataset has 13-15% outlier rates on balance, pdays, and previous columns.",
    decision:
      "Use IQR-based clipping (capping at Q1-1.5*IQR and Q3+1.5*IQR) instead of removing outlier rows.",
    rationale:
      "Preserves row count and data distribution shape; avoids losing 15% of data at extremes.",
    tradeoffs: [
      "Can distort true distribution at tails; removal would lose valid edge cases",
    ],
  },
  {
    id: "IS-ADR-004",
    title: "Combiner usage in MapReduce jobs",
    context:
      "MapReduce jobs need local pre-aggregation to reduce network I/O, but not all operations are safe.",
    decision:
      "Use Combiner for WordCount and PairCount (addition is commutative/associative); comment out Combiner for Min/Max calculation.",
    rationale:
      "Min/Max Combiner would give local min/max per reducer, not global — incorrect semantics. Addition is safe for Combiner.",
    tradeoffs: [
      "Not using Combiner in Min/Max increases network traffic but ensures correctness",
    ],
  },
  {
    id: "IS-ADR-005",
    title: "Regression treated as classification for educational purposes",
    context:
      "Heart disease (binary target) modeled via linear regression with threshold=0.5 instead of logistic regression.",
    decision:
      "Use normal equation linear regression with 0.5 threshold for classification, despite being suboptimal for binary targets.",
    rationale:
      "Educational purpose — demonstrates normal equation implementation. Logistic regression would require sigmoid + iterative optimization, which is harder to implement from scratch.",
    tradeoffs: [
      "R² of 0.11 is low; logistic regression would yield better calibration",
    ],
  },
  {
    id: "IS-ADR-006",
    title: "Custom K-Means vs SparkML comparison",
    context:
      "Need to demonstrate understanding of clustering algorithm internals, not just library usage.",
    decision:
      "Implement K-Means from scratch using PySpark DataFrames (euclidean_distance, assign_cluster, update_centroids, is_converged), then compare with SparkML.",
    rationale:
      "Custom Silhouette (0.380) outperforms SparkML (0.270), suggesting different centroid initialization or iteration strategy matters.",
    tradeoffs: [
      "Custom implementation is slower but more transparent; SparkML is optimized but black-box",
    ],
  },
  {
    id: "IS-ADR-007",
    title: "Symmetric pair key for MapReduce co-occurrence",
    context:
      "Transaction pair counting requires treating (A,B) and (B,A) as the same pair.",
    decision:
      "Custom Couple WritableComparable with compareTo treating AB=BA as equal, hashCode using min/max for consistent hashing.",
    rationale:
      "Elegant solution to non-trivial MapReduce design problem; ensures symmetric pairs are grouped correctly.",
    tradeoffs: [
        "Custom WritableComparable adds complexity but is necessary for correct semantics",
    ],
  },
];

export const is405Limitations: string[] = [
  "Low R-squared (0.11) — linear regression fundamentally unsuitable for binary classification; logistic regression or gradient-boosted trees would dramatically improve",
  "Class imbalance in bank data (90.7%/9.3%) — KNN suffers from poor minority class detection (16% recall for term_deposit=1)",
  "No hyperparameter tuning — KNN uses fixed k=5, K-Means uses fixed K=3 without elbow method or grid search",
  "Feature dropping without documented justification — PhysicalHealth, MentalHealth, SleepTime dropped without statistical tests",
  "No cross-validation — single train/test split used throughout; no k-fold CV for robust estimation",
  "No feature scaling in final project — normal equation affected by unscaled features",
  "MapReduce KNN runtime — 3,667 seconds (1 hour) for 43K rows is impractical",
  "Limited Doris exploration — only 5 SQL queries; no performance benchmarks vs other OLAP engines",
  "No model persistence — models not saved/loaded; no production deployment path",
  "No confusion matrix or per-class metrics for heart disease final project",
];

export const is405Improvements: string[] = [
  "Use logistic regression or gradient-boosted trees (XGBoost/LightGBM) for binary classification",
  "Implement SMOTE or class weights for imbalanced bank dataset",
  "Add k-fold cross-validation and hyperparameter search (elbow method, grid search)",
  "Document feature selection rationale with statistical tests (chi-square, mutual information)",
  "Implement feature standardization (z-score) before normal equation computation",
  "Add confusion matrix, ROC-AUC, and precision-recall curves for complete evaluation",
  "Benchmark MapReduce KNN against in-memory PySpark KNN for performance comparison",
  "Compare Doris performance against PostgreSQL, ClickHouse, and StarRocks",
  "Add model serialization (save/load) for production readiness",
  "Extend heart disease model with feature interaction terms and polynomial features",
];
