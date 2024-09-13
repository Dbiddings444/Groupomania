const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const JWT_SECRET = process.env.JWT_SECRET_KEY;
const pool = new Pool({ database: "usersdb", port: 5432 });

async function encryptPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getUsers: async (req, res) => {
    let client;

    try {
      client = await pool.connect();
      const cmd = "SELECT * FROM users;";
      const result = await client.query(cmd);
      const users = result.rows;

      res.status(200).json({ message: "Users retrieved successfully!", users });
    } catch (err) {
      console.log("DB query error: ", err);
      res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    } finally {
      client.release();
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    let client;

    try {
      client = await pool.connect();
      const cmd = "SELECT * FROM users WHERE email = $1";
      const result = await pool.query(cmd, [email]);
      const theUser = result.rows[0];

      if (theUser && (await bcrypt.compare(password, theUser.password))) {
        const signedToken = jwt.sign(
          { user_id: theUser.user_id, email: theUser.email },
          JWT_SECRET,
          { expiresIn: "30m" }
        );
        return res.send({ token: signedToken, user: theUser });
      } else {
        return res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (err) {
      console.log("DB query error: ", err);
      return   res
        .status(500)
        .json({ error: "Internal server error", message: err.message });
    } finally {
      client.release();
    }
  },

  register: async (req, res) => {
    let client;
    const encrypted = await encryptPassword(req.body.password);
    let now = new Date();

    try {
      client = await pool.connect();
      const cmd1 = "SELECT * FROM users WHERE email = $1";
      const result1 = await pool.query(cmd1, [req.body.email]);
      if (result1.rows[0]) {
        res.status(409).json({ error: "User already exists" });
      } else {
        const cmd2 = `INSERT INTO users(email, password, created_at) VALUES ($1, $2, $3);`;
        const args2 = [req.body.email, encrypted, now];
        const result2 = await client.query(cmd2, args2);

        res.status(201).json({ message: "User registered successfully" });
      }
    } catch (err) {
      console.log("DB query error: ", err);
      res
        .status(500)
        .json({ error: "Internal server error", message: err.message });
    } finally {
      client.release();
    }
  },

  verify: async (req, res) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      try {
        const user = jwt.verify(token, JWT_SECRET);
        res.status(200).json(user);
      } catch (err) {
        console.log("JWT verification error: ", err);
        res.status(401).json({ error: "Invalid token" });
      }
    } else {
      res.status(400).json({ error: "No token provided" });
    }
  },

  delete: async (req, res) => {
    let client;

    try {
      client = await pool.connect();
      const cmd = "DELETE FROM users WHERE email = $1;";
      const args = [req.body.email];
      await client.query(cmd, args);

      res.status(204).json({ message: "User deleted successfully" });
    } catch (err) {
      console.log("DB query error: ", err);
      res
        .status(500)
        .json({ error: "Internal server error", message: err.message });
    } finally {
      client.release();
    }
  },
};
