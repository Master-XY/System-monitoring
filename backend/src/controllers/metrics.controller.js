import pool from "../config/database.js";

export const getLatestMetrics = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM metrics
      ORDER BY created_at DESC
      LIMIT 1
    `);

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch metrics",
    });
  }
};

export const getMetricsHistory = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM metrics
      ORDER BY created_at DESC
      LIMIT 50
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch metrics history",
    });
  }
};