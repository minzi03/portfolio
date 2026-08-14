import type { ProjectMetric, ADR } from "@/data/types";

export const mdsImpact: ProjectMetric[] = [
  {
    id: "dbt-models",
    label: "dbt Models",
    value: "9",
    type: "coverage",
    context: "3 staging views + 2 SCD2 snapshots + 3 dimension tables + 1 incremental fact",
  },
  {
    id: "dbt-tests",
    label: "dbt Tests",
    value: "28",
    type: "quality",
    context: "20 not_null + 4 unique + 4 relationships across staging, dimensions, and facts",
  },
  {
    id: "python-tests",
    label: "Unit Tests",
    value: "13",
    type: "quality",
    context: "4 data generator tests + 9 consumer tests (batch logic, Parquet output, graceful shutdown)",
  },
  {
    id: "airflow-tasks",
    label: "Airflow Tasks",
    value: "10",
    type: "coverage",
    context: "Main ELT DAG: list → shortcircuit → download → load → mark → cleanup → dbt run → snapshot → dbt run → dbt test",
  },
  {
    id: "docker-services",
    label: "Docker Services",
    value: "9",
    type: "scale",
    context: "Zookeeper, Kafka, PostgreSQL (source), Kafka Connect, MinIO, Airflow (postgres + init + scheduler + webserver)",
  },
  {
    id: "dag-count",
    label: "DAGs",
    value: "3",
    type: "coverage",
    context: "Main ELT (5min), standalone ingestion (5min), SCD2 snapshots (daily)",
  },
  {
    id: "pipeline-latency",
    label: "Pipeline Latency",
    value: "5min",
    type: "performance",
    context: "End-to-end: PostgreSQL change → Debezium → Kafka → Consumer → MinIO → Airflow → Snowflake → dbt marts",
  },
  {
    id: "cdc-topics",
    label: "CDC Topics",
    value: "3",
    type: "coverage",
    context: "banking_server.public.customers, .accounts, .transactions via Debezium pgoutput logical replication",
  },
  {
    id: "ci-cd",
    label: "CI/CD Workflows",
    value: "2",
    type: "quality",
    context: "CI: ruff lint + pytest + dbt compile | CD: dbt run + dbt test on main branch",
  },
  {
    id: "scd2-snapshots",
    label: "SCD2 Snapshots",
    value: "2",
    type: "coverage",
    context: "customers_snapshot (name, email) + accounts_snapshot (customer_id, type, balance, currency) with invalidate_hard_deletes",
  },
];

export const mdsProblem: string =
  "A banking domain requires near real-time data warehousing: transactional changes in a PostgreSQL OLTP system (customers, accounts, transactions) must be captured, transformed, and made analytics-ready in Snowflake. The pipeline must handle INSERT/UPDATE/DELETE via CDC, maintain historical changes (SCD Type 2), provide idempotent ingestion with no duplicate loads, and be fully automated via CI/CD — all self-contained and reproducible via Docker.";

export const mdsConstraints: string[] = [
  "CDC must capture INSERT/UPDATE/DELETE without impacting OLTP performance — solved via PostgreSQL WAL logical replication (pgoutput) with dedicated replication slot (banking_slot) and filtered publication for 3 tracked tables only",
  "Idempotent ingestion required — no duplicate loads on retries — solved via Airflow Variables tracking processed MinIO object keys per table + Snowflake COPY INTO with FORCE=TRUE and PURGE=TRUE",
  "SCD Type 2 historical tracking for customers and accounts — solved via dbt snapshots with check_cols strategy, invalidate_hard_deletes=True, generating dbt_valid_from/dbt_valid_to/is_current columns",
  "Pipeline must be fully self-contained and reproducible — solved via single docker-compose.yml orchestrating 9 services on a shared Docker network (banking-mds-net), including two separate PostgreSQL instances (source on 5432, Airflow metadata on 5433)",
  "Analytics consumers need a clean star schema — solved via dbt materializations: staging views (CDC dedup via ROW_NUMBER) → dimension tables (materialized: table) → fact table (incremental with cdc_ts watermark)",
];

export const mdsADRs: ADR[] = [
  {
    id: "ADR-001",
    title: "Micro-batch over true streaming",
    context:
      "Snowflake COPY INTO is optimized for bulk file ingestion, not row-by-row streaming. The pipeline needs to balance latency with cost and reliability.",
    decision:
      "Use a Python consumer that buffers 50 records or 30s of data, then writes Parquet to MinIO as micro-batches.",
    rationale:
      "Reduces Snowflake compute costs and simplifies error handling. Parquet files in MinIO serve as a persistent, replayable data lake layer. Micro-batching aligns with Snowflake's COPY INTO strengths.",
    tradeoffs: [
      "Not event-level real-time (5-minute end-to-end latency acceptable for analytics use case)",
      "Batch boundary adds latency vs. true streaming (acceptable for banking analytics)",
      "Single-threaded consumer limits throughput (adequate for portfolio-scale data volumes)",
    ],
  },
  {
    id: "ADR-002",
    title: "MinIO as data lake instead of direct Snowflake ingestion",
    context:
      "CDC events need durable storage before loading to Snowflake. Direct ingestion couples pipeline availability to Snowflake uptime.",
    decision:
      "Persist CDC events as Parquet files in MinIO (S3-compatible object store) before loading to Snowflake.",
    rationale:
      "Decouples ingestion from warehouse availability; provides a durable, replayable data lake; enables future use of Spark/Flink without Snowflake dependency.",
    tradeoffs: [
      "Adds one extra hop and storage layer",
      "Requires MinIO lifecycle management to prevent unbounded storage growth",
    ],
  },
  {
    id: "ADR-003",
    title: "Idempotent ingestion via Airflow Variables",
    context:
      "Pipeline retries must not produce duplicate loads in Snowflake. Need a simple, Airflow-native state tracking mechanism.",
    decision:
      "Track processed MinIO object keys in Airflow Variables (JSON-serialized sets) per table.",
    rationale:
      "Simple, Airflow-native solution; avoids external state stores; enables safe retries without duplicate loads.",
    tradeoffs: [
      "Variable storage grows unbounded over time (could be addressed with periodic cleanup)",
      "Airflow Variables are not optimized for high-frequency updates",
    ],
  },
  {
    id: "ADR-004",
    title: "SCD Type 2 via dbt snapshots (check strategy)",
    context:
      "Business requires historical tracking of customer and account changes with effective date ranges.",
    decision:
      "Use dbt's built-in snapshot functionality with check_cols strategy rather than custom SQL for SCD Type 2.",
    rationale:
      "Declarative, version-controlled, and automatically generates dbt_valid_from/dbt_valid_to/dbt_loaded_at columns. invalidate_hard_deletes=True handles deleted source records.",
    tradeoffs: [
      "Check strategy compares column values (not timestamps), so it misses in-place updates where values don't change",
      "Snapshot system columns are visible in the analytics schema",
    ],
  },
  {
    id: "ADR-005",
    title: "Separate PostgreSQL instances for source and metadata",
    context:
      "Airflow requires its own metadata database. Sharing the source PostgreSQL would pollute the banking database.",
    decision:
      "Use two separate postgres:15 containers on different ports (5432 for banking source, 5433 for Airflow metadata).",
    rationale:
      "Prevents Airflow metadata (DAG runs, task instances, variables) from polluting the banking source database; allows independent backup/restore.",
    tradeoffs: ["Slightly higher resource usage with two PostgreSQL containers"],
  },
  {
    id: "ADR-006",
    title: "Programmatic Debezium connector registration",
    context:
      "Debezium connector configuration must be repeatable and integrated with environment variables.",
    decision:
      "Use a Python script (generate_and_post_connector.py) to register the Debezium connector via REST API (POST/PUT to Kafka Connect at port 8083) instead of static JSON config files.",
    rationale:
      "Enables idempotent registration (create or update); integrates with .env configuration; can be run as a one-time setup step.",
    tradeoffs: ["Requires the Kafka Connect REST API to be available"],
  },
  {
    id: "ADR-007",
    title: "ShortCircuitOperator for empty batch optimization",
    context:
      "Many 5-minute DAG runs may find no new files in MinIO. Loading Snowflake and running dbt on empty cycles wastes compute.",
    decision:
      "Use Airflow's ShortCircuitOperator to skip the entire download/load/mark pipeline when no new files exist.",
    rationale:
      "Avoids unnecessary Snowflake connections and MinIO downloads on empty cycles; reduces cost and DAG runtime.",
    tradeoffs: [],
  },
  {
    id: "ADR-008",
    title: "dbt snapshot target schema = ANALYTICS",
    context:
      "Snapshots need a target schema. Using a separate snapshots schema adds complexity for dimension models that consume snapshots.",
    decision:
      "Write snapshots to ANALYTICS schema (same as marts) rather than a separate snapshots schema.",
    rationale:
      "Simplifies querying (all analytics tables in one schema); snapshots are consumed directly by dimension models without cross-schema references.",
    tradeoffs: [
      "Snapshot system columns (dbt_valid_from, dbt_valid_to, etc.) are visible in the analytics schema",
    ],
  },
];

export const mdsLimitations: string[] = [
  "Micro-batch, not true streaming: 5-minute end-to-end latency; not suitable for sub-second analytics requirements",
  "Single-threaded Python consumer limits throughput scalability — no partition-level Kafka parallelism",
  "No data quality framework beyond schema tests — no Great Expectations, Soda, or dbt tests on data content values (e.g., balance ranges, transaction amounts)",
  "Snowflake dependency with no fallback — pipeline requires Snowflake availability for the full ELT chain",
  "Airflow Variables for state tracking grow unbounded over time — no TTL or archival mechanism for processed keys",
  "No schema evolution handling — CDC schema changes (ALTER TABLE) would require connector reconfiguration",
  "No monitoring or alerting stack — no Prometheus, Grafana, or Slack notifications on pipeline failures",
  "No backfill mechanism — catchup=False means historical reprocessing requires manual intervention",
  "dbt compile only in CI — no dbt run in CI, only compile for validation; full run happens only in CD",
];

export const mdsImprovements: string[] = [
  "Replace micro-batch Python consumer with Spark Structured Streaming for true real-time processing and horizontal scalability",
  "Add Great Expectations or Soda for data quality checks beyond schema validation (value ranges, referential integrity across layers)",
  "Deploy Airflow on Kubernetes for production-grade orchestration with auto-scaling and high availability",
  "Add BI dashboards (Power BI / Apache Superset) connected directly to Snowflake marts for interactive analytics",
  "Implement Airflow Variables cleanup (TTL or archival) to prevent unbounded state growth of processed keys",
  "Add monitoring stack (Prometheus + Grafana) for pipeline metrics, latency tracking, and failure alerting",
  "Implement schema evolution handling in Debezium connector for safe source DDL changes",
  "Add dbt tests on data content (not just schema) — e.g., balance >= 0, transaction amounts within expected ranges",
  "Enable catchup=True with backfill DAG for historical reprocessing capability",
  "Add Kafka consumer group with multiple consumer instances for partition-level parallelism",
];
