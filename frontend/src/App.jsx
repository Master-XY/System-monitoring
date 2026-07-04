import { useEffect, useState } from "react";
import {
  getLatestMetrics,
  getMetricsHistory,
  getAnomalies,
} from "./services/api";

import "./styles/dashboard.css";

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

    fetchMetrics();

    const interval = setInterval(fetchMetrics, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!metrics) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">
        🖥️ System Monitoring Dashboard
      </h1>

      <div className="cards">
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

      <div className="section">
        <MetricsChart data={history} />
      </div>

      <div className="section">
        <AnomalyTable anomalies={anomalies} />
      </div>
    </div>
  );
}

export default App;