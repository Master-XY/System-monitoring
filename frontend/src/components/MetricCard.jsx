function MetricCard({ title, value, unit }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        width: "220px",
        textAlign: "center",
      }}
    >
      <h2>{title}</h2>
      <h1>
        {value} {unit}
      </h1>
    </div>
  );
}

export default MetricCard;