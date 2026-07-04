import si from "systeminformation";
import pool from "../config/database.js";

let cpuAnomalyActive = false;
let memoryAnomalyActive = false;
let diskAnomalyActive = false;

// Save anomaly into database
async function saveAnomaly(metricType, metricValue, threshold, message) {
  await pool.query(
    `INSERT INTO anomalies
    (metric_type, metric_value, threshold, message)
    VALUES ($1, $2, $3, $4)`,
    [metricType, metricValue, threshold, message]
  );

  console.log(`🚨 ${metricType} anomaly detected!`);
}

async function collectMetrics() {
  try {
    const cpuLoad = await si.currentLoad();
    const memory = await si.mem();
    const disk = await si.fsSize();
    const os = await si.osInfo();
    const time = await si.time();

    // Store values in variables
    const cpuUsage = cpuLoad.currentLoad;
    const memoryUsage = (memory.used / memory.total) * 100;
    const diskUsage = disk[0].use;

    console.log("========== System Metrics ==========");
    console.log("CPU Usage:", cpuUsage.toFixed(2), "%");
    console.log("Memory Usage:", memoryUsage.toFixed(2), "%");
    console.log("Disk Usage:", diskUsage.toFixed(2), "%");
    console.log("Hostname:", os.hostname);
    console.log("Platform:", os.platform);
    console.log("Uptime:", time.uptime, "seconds");
    console.log("====================================");

    // Save metrics
    await pool.query(
      `INSERT INTO metrics
      (cpu_usage, memory_usage, disk_usage, uptime, hostname, platform)
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        cpuUsage,
        memoryUsage,
        diskUsage,
        Math.floor(time.uptime),
        os.hostname,
        os.platform,
      ]
    );

    console.log("✅ Metrics inserted into database");

    // =========================
    // CPU Anomaly Detection
    // Trigger: >90%
    // Reset: <80%
    // =========================
    if (cpuUsage > 90) {
      if (!cpuAnomalyActive) {
        await saveAnomaly(
          "CPU",
          cpuUsage,
          90,
          "CPU usage exceeded 90%"
        );
        cpuAnomalyActive = true;
      }
    } else if (cpuUsage < 80) {
      cpuAnomalyActive = false;
    }

    // =========================
    // Memory Anomaly Detection
    // Trigger: >90%
    // Reset: <85%
    // =========================
    if (memoryUsage > 90) {
      if (!memoryAnomalyActive) {
        await saveAnomaly(
          "MEMORY",
          memoryUsage,
          90,
          "Memory usage exceeded 90%"
        );
        memoryAnomalyActive = true;
      }
    } else if (memoryUsage < 85) {
      memoryAnomalyActive = false;
    }

    // =========================
    // Disk Anomaly Detection
    // Trigger: >95%
    // Reset: <90%
    // =========================
    if (diskUsage > 95) {
      if (!diskAnomalyActive) {
        await saveAnomaly(
          "DISK",
          diskUsage,
          95,
          "Disk usage exceeded 95%"
        );
        diskAnomalyActive = true;
      }
    } else if (diskUsage < 90) {
      diskAnomalyActive = false;
    }

  } catch (error) {
    console.error(error);
  }
}

export default collectMetrics;