import "./AnomalyTable.css";

function AnomalyTable({ anomalies }) {
  return (
    <div className="anomaly-container">
      <h2 className="anomaly-title">🚨 Recent Anomalies</h2>

      <table className="anomaly-table">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
            <th>Threshold</th>
            <th>Message</th>
            <th>Detected At</th>
          </tr>
        </thead>

        <tbody>
          {anomalies.map((item) => {
            const type = item.metric_type;

            return (
              <tr key={item.id}>
                <td>
                  <span className={`badge ${type.toLowerCase()}`}>
                    {type}
                  </span>
                </td>

                <td>{item.metric_value.toFixed(2)}%</td>

                <td>{item.threshold}%</td>

                <td>{item.message}</td>

                <td>
                  {new Date(item.created_at).toLocaleTimeString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AnomalyTable;