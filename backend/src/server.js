import app from "./app.js";
import pool from "./config/database.js";
import collectMetrics from "./collector/collector.js";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Test database connection
    const result = await pool.query("SELECT NOW();");
    console.log("✅ Database connected successfully!");
    console.log("Database Time:", result.rows[0].now);

    // Collect metrics once
    await collectMetrics();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Database connection failed!");
    console.error(error.message);
  }
}

startServer();