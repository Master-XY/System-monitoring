import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function MetricsChart({ data }) {
  return (
    <div
      style={{
        marginTop: "40px",
        width: "100%",
        height: "400px",
      }}
    >
      <h2>CPU Usage History</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={[...data].reverse()}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="id"
          />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="cpu_usage"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MetricsChart;