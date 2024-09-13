const { Pool } = require("pg");
const pool = new Pool({ database: "usersdb", port: 5432 });
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

module.exports = {
  getViews: async (req, res) => {
    let client;

    try {
      client = await pool.connect();
      const cmd = "SELECT * FROM views;";
      const result = await client.query(cmd);
      let views = result.rows;

      res.status(200).json({ message: "Views retrieved successfully!", views });
    } catch (err) {
      console.log("DB query error: ", err);
      res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    } finally {
      client.release();
    }
  },

  addView: async (req, res) => {
    let client;
    try {
      client = await pool.connect();
      const cmd = `
				INSERT INTO views (user_id, post_id) VALUES ($1, $2)
				ON CONFLICT (user_id, post_id) DO NOTHING;
			`;
      const args = [req.body.uid, req.body.pid]
			const result = await client.query(cmd, args);
      const posts = result.rows;
res.send(posts);

    } catch (err) {
      console.log("DB query error: ", err);
      res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    } finally {
      client.release();
    }
  },
};
