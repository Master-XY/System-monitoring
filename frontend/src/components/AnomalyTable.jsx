function AnomalyTable({ anomalies }) {
  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Recent Anomalies</h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          borderCollapse: "collapse",
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
            <th>Threshold</th>
            <th>Message</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {anomalies.map((item) => (
            <tr key={item.id}>
              <td>{item.metric_type}</td>
              <td>{item.metric_value.toFixed(2)}%</td>
              <td>{item.threshold}%</td>
              <td>{item.message}</td>
              <td>{new Date(item.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AnomalyTable;