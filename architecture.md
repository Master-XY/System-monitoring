# System Architecture

## Overview

The System Monitoring Dashboard follows a three-layer architecture:

```
+-----------------------+
|     React Frontend    |
|-----------------------|
| Metric Cards          |
| Charts (Recharts)     |
| Anomaly Table         |
+----------+------------+
           |
           | REST API (HTTP)
           |
+----------v------------+
|    Express Backend    |
|-----------------------|
| Routes                |
| Controllers           |
| Collector             |
| Anomaly Detection     |
+----------+------------+
           |
           | SQL Queries
           |
+----------v------------+
|      PostgreSQL       |
|-----------------------|
| metrics               |
| anomalies             |
+-----------------------+
           ^
           |
           |
+----------+------------+
| systeminformation API |
+-----------------------+
```

---

# Components

## 1. Metric Collector

The collector is responsible for gathering system statistics every **5 seconds**.

It uses the **systeminformation** package to collect:

- CPU usage
- Memory usage
- Disk usage
- Hostname
- Platform
- System uptime

Collected metrics are inserted into the PostgreSQL database.

---

## 2. Anomaly Detection

Immediately after collecting metrics, the backend checks predefined thresholds.

| Metric | Threshold |
|---------|-----------|
| CPU | 90% |
| Memory | 90% |
| Disk | 95% |

When a threshold is exceeded:

- an anomaly record is inserted into the database
- duplicate alerts are prevented using internal state flags
- the frontend displays the anomaly during the next refresh cycle

---

## 3. PostgreSQL Database

The application stores data in two tables.

### metrics

Stores periodic system measurements.

Columns include:

- cpu_usage
- memory_usage
- disk_usage
- uptime
- hostname
- platform
- created_at

---

### anomalies

Stores detected threshold violations.

Columns include:

- metric_type
- metric_value
- threshold
- message
- created_at

---

## 4. REST API

The Express backend exposes REST endpoints.

### Metrics

```
GET /api/metrics/latest
```

Returns the latest collected metric.

---

```
GET /api/metrics/history
```

Returns historical metrics for chart visualization.

---

### Anomalies

```
GET /api/anomalies
```

Returns the most recent detected anomalies.

---

## 5. Frontend

The React application polls the backend every **5 seconds**.

The dashboard contains:

- Current metric cards
- Historical line chart
- Recent anomaly table

When a new anomaly is detected, the dashboard enters an alert state and highlights the interface.

---

# Data Flow

```
systeminformation
        │
        ▼
Collector
        │
        ▼
PostgreSQL
        │
        ▼
REST API
        │
        ▼
React Dashboard
```

---

# Future Architecture

The current implementation uses periodic polling.

Future improvements may include:

- WebSocket-based real-time communication
- Machine learning anomaly detection
- Prometheus metrics exporter
- Grafana dashboards
- Docker deployment
- Authentication and user management