import type { ProjectEvidence } from "@/data/types";

/**
 * Project evidence — screenshots, diagrams, dashboards.
 *
 * Place actual evidence files under /public/evidence/projects/<project-id>/
 * and reference them here with the path relative to /public.
 *
 * Supported types:
 * - architecture: system architecture diagrams
 * - pipeline: data pipeline flow visualizations
 * - data-model: schema/model diagrams
 * - dashboard: BI dashboard screenshots
 * - code: code editor screenshots
 * - terminal: terminal/CLI output screenshots
 * - diagram: general diagrams
 */

export const projectEvidence: Record<string, ProjectEvidence[]> = {
  /* ─── Banking Data Platform — flagship, 6 evidence ─── */
  "banking-data-platform": [
    {
      id: "banking-arch",
      title: "Medallion Lakehouse Architecture",
      description: "End-to-end system architecture: batch + CDC dual ingestion, Bronze/Silver/Gold layers, OpenMetadata governance, and analytics serving via Trino + Superset.",
      asset: "/evidence/projects/banking-data-platform/architecture.png",
      type: "architecture",
      aspectRatio: "16:9",
    },
    {
      id: "banking-airflow",
      title: "16 Airflow DAGs",
      description: "Orchestration layer with 16 DAGs managing batch ingestion, CDC processing, data quality checks, and analytics refresh schedules.",
      asset: "/evidence/projects/banking-data-platform/airflow-dags.png",
      type: "diagram",
      aspectRatio: "16:9",
    },
    {
      id: "banking-kafka",
      title: "Kafka CDC Event Stream",
      description: "Debezium CDC connector capturing PostgreSQL WAL changes and streaming through Kafka topics to Spark Structured Streaming.",
      asset: "/evidence/projects/banking-data-platform/kafka-event.png",
      type: "pipeline",
      aspectRatio: "16:9",
    },
    {
      id: "banking-silver-gold",
      title: "Silver → Gold Transformation",
      description: "Medallion layer progression — Silver (validated, deduplicated) to Gold (business-ready dimensional models with 8 dimensions, 5 facts).",
      asset: "/evidence/projects/banking-data-platform/silver-gold.png",
      type: "diagram",
      aspectRatio: "16:9",
    },
    {
      id: "banking-lineage",
      title: "OpenMetadata Column-Level Lineage",
      description: "22 lineage edges across 53 cataloged tables with column-level tracking, PII classification, and data owner assignments.",
      asset: "/evidence/projects/banking-data-platform/openmetadata-lineage.png",
      type: "diagram",
      aspectRatio: "16:9",
    },
    {
      id: "banking-dashboard",
      title: "Streamlit Analytics Dashboard",
      description: "Customer 360, RFM segmentation, and churn analysis dashboard — interactive analytics served via Trino + Streamlit.",
      asset: "/evidence/projects/banking-data-platform/dashboard.png",
      type: "dashboard",
      aspectRatio: "16:9",
    },
  ],

  /* ─── Modern Datastack Pipeline ─── */
  "modern-data-stack": [
    {
      id: "mds-pipeline",
      title: "CDC ELT Pipeline Architecture",
      description: "PostgreSQL WAL → Debezium (pgoutput) → Kafka → Python micro-batch consumer → MinIO Parquet lake → Airflow → Snowflake COPY INTO → dbt SCD2 snapshots.",
      asset: "/evidence/projects/modern-data-stack/pipeline.png",
      type: "architecture",
      aspectRatio: "16:9",
    },
  ],

  /* ─── Azure E-Commerce Data Platform — 5 evidence ─── */
  "azure-ecommerce": [
    {
      id: "azure-arch",
      title: "Azure E-Commerce Architecture",
      description: "Full-stack Azure Lakehouse: 4 heterogeneous sources (MySQL, MongoDB, HTTP API, CSV) → ADF → Databricks Medallion → Synapse → Power BI.",
      asset: "/evidence/projects/azure-ecommerce/architecture.png",
      type: "architecture",
      aspectRatio: "16:9",
    },
    {
      id: "azure-bronze",
      title: "Bronze Layer — Raw Ingestion",
      description: "ADLS Gen2 Bronze layer with raw data from 4 sources. ADF dynamic Lookup→ForEach patterns handle heterogeneous schemas.",
      asset: "/evidence/projects/azure-ecommerce/bronze-layer.png",
      type: "diagram",
      aspectRatio: "16:9",
    },
    {
      id: "azure-gold",
      title: "Gold Layer — Business-Ready Models",
      description: "Star Schema output: 8 dimensions, 5 fact tables with Z-Order optimization, Delta Lake ACID transactions.",
      asset: "/evidence/projects/azure-ecommerce/gold-layer.png",
      type: "data-model",
      aspectRatio: "16:9",
    },
    {
      id: "azure-sales",
      title: "Power BI — Sales Dashboard",
      description: "$13.55M revenue, 97K orders analyzed across multi-channel e-commerce data with real-time Delta Lake backing.",
      asset: "/evidence/projects/azure-ecommerce/dashboard-sales.png",
      type: "dashboard",
      aspectRatio: "16:9",
    },
    {
      id: "azure-customers",
      title: "Power BI — Customer Insights",
      description: "Customer segmentation and behavioral analytics powered by Synapse Serverless SQL with 19 analytical views.",
      asset: "/evidence/projects/azure-ecommerce/dashboard-customers.png",
      type: "dashboard",
      aspectRatio: "16:9",
    },
  ],

  /* ─── Movie Data Warehouse — 3 evidence ─── */
  "movie-data-warehouse": [
    {
      id: "movie-ssas",
      title: "SSAS MOLAP Cube Architecture",
      description: "SSAS cube with 7 measures, time hierarchy, and 24 MDX analytical queries for OLAP analytics on 1.16M TMDB movies.",
      asset: "/evidence/projects/movie-data-warehouse/ssas-architecture.png",
      type: "architecture",
      aspectRatio: "16:9",
    },
    {
      id: "movie-star",
      title: "Star Schema Data Model",
      description: "8 dimensions, 1 fact table, 8 FK constraints — full dimensional model built with SSIS ETL from Python preprocessing.",
      asset: "/evidence/projects/movie-data-warehouse/ssms-architecture.png",
      type: "data-model",
      aspectRatio: "4:3",
    },
    {
      id: "movie-powerbi",
      title: "Power BI + SSRS Reports",
      description: "3 SSRS reports + Power BI + Excel dashboards. ML extension: SVR achieving 94.14% accuracy (R²=0.92) on revenue prediction.",
      asset: "/evidence/projects/movie-data-warehouse/powerbi-report.png",
      type: "dashboard",
      aspectRatio: "16:9",
    },
  ],

  /* ─── NYC Taxi Data Platform — 4 evidence ─── */
  "nexlab-data-platform": [
    {
      id: "nexlab-arch",
      title: "System Architecture",
      description: "Medallion Lakehouse with Apache Spark, Iceberg, MinIO, Trino, Airflow, and Streamlit — processing 78M+ NYC TLC taxi trip records.",
      asset: "/evidence/projects/nexlab-data-platform/architecture.png",
      type: "architecture",
      aspectRatio: "16:9",
    },
    {
      id: "nexlab-medallion",
      title: "Medallion Layer Progression",
      description: "Bronze (raw) → Silver (validated, deduplicated) → Gold (business-ready) with 18 data quality checks at each boundary.",
      asset: "/evidence/projects/nexlab-data-platform/medallion-layers.png",
      type: "diagram",
      aspectRatio: "16:9",
    },
    {
      id: "nexlab-schema",
      title: "Star Schema Data Model",
      description: "Dimensional model for OLAP analytics — trip facts, payment types, pickup/dropoff zones, and time dimensions.",
      asset: "/evidence/projects/nexlab-data-platform/star-schema.png",
      type: "data-model",
      aspectRatio: "4:3",
    },
    {
      id: "nexlab-dashboard",
      title: "Bilingual EN/VI Dashboard",
      description: "Interactive Streamlit dashboard with bilingual support (English/Vietnamese) for trip analytics and revenue reporting.",
      asset: "/evidence/projects/nexlab-data-platform/dashboard.png",
      type: "dashboard",
      aspectRatio: "16:9",
    },
  ],

  /* ─── CellphoneS Analytics — 2 evidence ─── */
  "cellphones-analytics": [
    {
      id: "cellphones-overview",
      title: "Executive Overview Dashboard",
      description: "Power BI executive dashboard with 35+ DAX measures — sales performance, channel analysis, and inventory metrics across 5 CSV sources.",
      asset: "/evidence/projects/cellphones-analytics/executive-overview.png",
      type: "dashboard",
      aspectRatio: "16:9",
    },
    {
      id: "cellphones-inventory",
      title: "Inventory Alerts Dashboard",
      description: "Real-time inventory status, DRR (Daily Run Rate), and dual-source reconciliation with 68 structured quality checks.",
      asset: "/evidence/projects/cellphones-analytics/inventory-alerts.png",
      type: "dashboard",
      aspectRatio: "16:9",
    },
  ],

  /* ─── Stock Price Forecasting — 2 evidence ─── */
  "data-analysis-business": [
    {
      id: "dab-forecast-amv",
      title: "LSTM Forecast — AMV Stock",
      description: "8-model comparison across Vietnamese pharmaceutical stocks. LSTM dominates with MAPE < 3.5%. 72 configurations tested.",
      asset: "/evidence/projects/data-analysis-business/forecast-amv.png",
      type: "diagram",
      aspectRatio: "16:9",
    },
    {
      id: "dab-forecast-dht",
      title: "LSTM Forecast — DHT Stock",
      description: "30/60/90-day forecasts with hybrid LSTM+LightGBM two-stage architecture. 42 Jupyter notebooks, 113 report figures.",
      asset: "/evidence/projects/data-analysis-business/forecast-dht.png",
      type: "diagram",
      aspectRatio: "16:9",
    },
  ],

  /* ─── E-Commerce Messaging Analysis — 2 evidence ─── */
  "da-ie224": [
    {
      id: "ie224-engagement",
      title: "Channel Engagement Analysis",
      description: "10M multichannel messages analyzed — email 19.29% open rate, 3.98% click rate. Transactional 16x higher purchase rate than bulk.",
      asset: "/evidence/projects/da-ie224/line-chart.png",
      type: "diagram",
      aspectRatio: "16:9",
    },
    {
      id: "ie224-segmentation",
      title: "Customer Segmentation",
      description: "Champions/Potential/Loss segments with KL Divergence validation. ML: Random Forest 85.7%, Logistic Regression 82.18%.",
      asset: "/evidence/projects/da-ie224/pie-charts.png",
      type: "diagram",
      aspectRatio: "16:9",
    },
  ],

  /* ─── IS405 Big Data — 2 evidence ─── */
  "is405-bigdata": [
    {
      id: "is405-spark-output",
      title: "PySpark RDD Processing",
      description: "Hadoop MapReduce → PySpark RDD → Spark MLLib — 6 ML algorithms on 320K heart disease records with custom normal-equation regression.",
      asset: "/evidence/projects/is405-bigdata/spark-output.png",
      type: "terminal",
      aspectRatio: "16:9",
    },
    {
      id: "is405-analysis",
      title: "Spark ML Analysis Output",
      description: "Custom K-Means with Silhouette comparison (0.380 vs SparkML 0.270). MapReduce KNN classifier achieving 86.4% accuracy.",
      asset: "/evidence/projects/is405-bigdata/spark-analysis.png",
      type: "terminal",
      aspectRatio: "16:9",
    },
  ],

  /* ─── Katalyst — no screenshots available (enterprise) ─── */
  "katalyst-internship": [],
};

export function getProjectEvidence(projectId: string): ProjectEvidence[] {
  return projectEvidence[projectId] ?? [];
}
