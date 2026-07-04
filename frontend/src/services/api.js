import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getLatestMetrics = async () => {
  const response = await api.get("/metrics/latest");
  return response.data;
};

export const getMetricsHistory = async () => {
  const response = await api.get("/metrics/history");
  return response.data;
};

export const getAnomalies = async () => {
  const response = await api.get("/anomalies");
  return response.data;
};

export default api;