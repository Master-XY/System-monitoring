import si from "systeminformation";
import pool from "../config/database.js";

async function collectMetrics() {
  try {
    const cpuLoad = await si.currentLoad();
    const memory = await si.mem();
    const disk = await si.fsSize();
    const os = await si.osInfo();
    const time = await si.time();

    console.log("========== System Metrics ==========");
    console.log("CPU Usage:", cpuLoad.currentLoad.toFixed(2), "%");
    console.log(
      "Memory Usage:",
      ((memory.used / memory.total) * 100).toFixed(2),
      "%"
    );
    console.log("Disk Usage:", disk[0].use.toFixed(2), "%");
    console.log("Hostname:", os.hostname);
    console.log("Platform:", os.platform);
    console.log("Uptime:", time.uptime, "seconds");
    console.log("====================================");

    await pool.query(
  `INSERT INTO metrics
  (cpu_usage, memory_usage, disk_usage, uptime, hostname, platform)
  VALUES ($1, $2, $3, $4, $5, $6)`,
  [
    cpuLoad.currentLoad,
    (memory.used / memory.total) * 100,
    disk[0].use,
    time.uptime,
    os.hostname,
    os.platform,
  ]
);

console.log("✅ Metrics inserted into database");

  } catch (error) {
    console.error(error);
  }
}

export default collectMetrics;