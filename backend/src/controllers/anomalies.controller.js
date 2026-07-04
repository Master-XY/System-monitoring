import pool from "../config/database.js";

export const getAnomalies = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM anomalies
      ORDER BY created_at DESC
      LIMIT 10
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch anomalies",
    });
  }
};