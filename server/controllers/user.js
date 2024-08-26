const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secret cat';
const pool = new Pool({ database: 'usersdb', port: 5445 });

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
			const cmd = 'SELECT * FROM users;'
			const result = await client.query(cmd);

		} catch (err) {
			console.log('DB query error: ', err);
		} finally {
			client.release();
		}
	},

	login: async (req, res) => {
		const { email, password } = req.body;
		let client;

		try {
			client = await pool.connect();
			const cmd = 'SELECT * FROM users WHERE email = $1';
			const result = await pool.query(cmd, [email]);
			const theUser = result.rows[0];

			if (theUser && await bcrypt.compare(password, theUser.password)) {
				const token = jwt.sign(
					{ user_id: theUser.user_id, email: theUser.email }, 
					JWT_SECRET, 
					{ expiresIn: '5m' }
				);
				res.send({ token: token, user: theUser });
			} else {
				res.send({ error: 'Invalid credentials' });
			}

		} catch (err) {
			res.send({ error: 'Internal server error' })
			console.log('DB query error: ', err);
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
			const cmd1 = 'SELECT * FROM users WHERE email = $1';
			const result1 = await pool.query(cmd1, [req.body.email]);
			if (result1.rows[0]) {
				res.send({ error: 'That user already exists' });
			} else {
				const cmd2 = `INSERT INTO users(email, password, created_at) VALUES ($1, $2, $3);`
				const args2 = [req.body.email, encrypted, now];
				const result2 = await client.query(cmd1, args1);	
				res.send({ msg: 'success' });
			}
		} catch (err) {
			res.send({ msg: 'fail' });
			console.log('DB query error: ', err);
		} finally {
			client.release();
		}
	},

	verify: async (req, res) => {
		const authHeader = req.headers.authorization;

		if (authHeader) {
			const token = authHeader.split(' ')[1];

			try {
				const user = jwt.verify(token, JWT_SECRET);
				res.send(user);
			} catch (err) {
				res.send({ error: 'Invalid token' });
			}
		} else {
			res.send({ error: 'No token provided' });
		}
	},

	delete: async (req, res) => {
		let client;
		
		try {
			client = await pool.connect();
			const cmd = 'DELETE FROM users WHERE email = $1;'
			const args = [req.body.email]
			const result = await client.query(cmd, args);

		} catch (err) {
			console.log('DB query error: ', err);
		} finally {
			client.release();
		}
	}
}