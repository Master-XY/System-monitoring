# Intelligent Windows System Monitoring and Anomaly Detection Dashboard

## Overview

This project is a Windows-based system monitoring application that continuously collects system performance metrics such as CPU usage, memory usage, disk usage, and system uptime.

The collected metrics are stored in a PostgreSQL database and visualized through a React dashboard using charts. The system also detects simple anomalies using threshold-based rules and records them for analysis.

## Tech Stack

- Frontend: React + Chart.js
- Backend: Node.js + Express.js
- Database: PostgreSQL
- Logging: Winston
- Metric Collection: systeminformation