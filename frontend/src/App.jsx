import { useEffect, useState } from "react";
import {
  getLatestMetrics,
  getMetricsHistory,
  getAnomalies,
} from "./services/api";

import MetricCard from "./components/MetricCard";
import MetricsChart from "./components/MetricsChart";
import AnomalyTable from "./components/AnomalyTable";

function App() {
  const [metrics, setMetrics] = useState(null);
  const [history, setHistory] = useState([]);
  const [anomalies, setAnomalies] = useState([]);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        // Latest metrics
        const data = await getLatestMetrics();
        setMetrics(data);

        // Metrics history
        const historyData = await getMetricsHistory();
        setHistory(historyData);

        // Recent anomalies
        const anomaliesData = await getAnomalies();
        setAnomalies(anomaliesData);
      } catch (error) {
        console.error(error);
      }
    }

    // First fetch
    fetchMetrics();

    // Fetch every 5 seconds
    const interval = setInterval(fetchMetrics, 5000);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  if (!metrics) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>System Monitoring Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <MetricCard
          title="CPU Usage"
          value={metrics.cpu_usage.toFixed(2)}
          unit="%"
        />

        <MetricCard
          title="Memory Usage"
          value={metrics.memory_usage.toFixed(2)}
          unit="%"
        />

        <MetricCard
          title="Disk Usage"
          value={metrics.disk_usage.toFixed(2)}
          unit="%"
        />
      </div>

      <hr style={{ margin: "40px 0" }} />

      <MetricsChart data={history} />

      <AnomalyTable anomalies={anomalies} />
    </div>
  );
}

export default App;