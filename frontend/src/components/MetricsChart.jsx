import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";

function MetricsChart({ data }) {
  const formattedData = [...data]
    .reverse()
    .map((item) => ({
      ...item,
      time: new Date(item.created_at).toLocaleTimeString(),
    }));

  return (
    <div className="chart-container">
      <h2 className="chart-title">📊 System Usage History</h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

          <XAxis
            dataKey="time"
            tick={{ fontSize: 12, fill: "#94a3b8" }}
          />

          <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
          />

          <Legend />

          {/* Threshold line */}
          <ReferenceLine
            y={90}
            stroke="#ef4444"
            strokeDasharray="4 4"
            label={{ value: "Threshold 90%", fill: "#ef4444", fontSize: 12 }}
          />

          <Line
            type="monotone"
            dataKey="cpu_usage"
            name="CPU"
            stroke="#38bdf8"
            strokeWidth={2}
            dot={false}
          />

          <Line
            type="monotone"
            dataKey="memory_usage"
            name="Memory"
            stroke="#fbbf24"
            strokeWidth={2}
            dot={false}
          />

          <Line
            type="monotone"
            dataKey="disk_usage"
            name="Disk"
            stroke="#ef4444"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MetricsChart;