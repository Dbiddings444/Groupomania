const { Pool } = require('pg');
const pool = new Pool({ database: 'usersdb', port: 5445 });
const fs = require('fs');
const path = require('path');

async function syncPostSequence() {
	const client = await pool.connect();
	try {
		await client.query('BEGIN');
		const { rows: sequenceRows } = await client.query("SELECT last_value FROM posts_post_id_seq");
		const seqValue = sequenceRows[0].last_value;
		const { rows: maxRows } = await client.query('SELECT MAX(post_id) AS max_post_id FROM posts;');
		const maxPostId = maxRows[0].max_post_id;

		if (seqValue <= maxPostId) {
			await client.query("SELECT setval('posts_post_id_seq', $1)", [maxPostId + 1]);
		}

		await client.query('COMMIT');
	} catch (err) {
		console.log('DB query error: ', err);
		await client.query('ROLLBACK');
	} finally {
		client.release();
	}
}

async function syncMediaSequence() {
	const client = await pool.connect();
	try {
		await client.query('BEGIN');
		const { rows: sequenceRows } = await client.query("SELECT last_value FROM media_media_id_seq");
		const seqValue = sequenceRows[0].last_value;
		const { rows: maxRows } = await client.query('SELECT MAX(media_id) AS max_media_id FROM media;');
		const maxPostId = maxRows[0].max_media_id;

		if (seqValue <= maxPostId) {
			await client.query("SELECT setval('media_media_id_seq', $1)", [maxPostId + 1]);
		}
		await client.query('COMMIT');
	} catch (err) {
		await clietn.query('ROLLBACK');
	} finally {
		client.release();
	}
}

module.exports = {
	addPost: async (req, res) => {
		await syncPostSequence();
		let client;
		let now = new Date();
		const post = req.body;

		try {
			client = await pool.connect();
			const cmd = `INSERT INTO posts(user_id, content, created_at) VALUES ($1, $2, $3);`
			const args = [post.user_id, post.content, now];
			const result = await client.query(cmd, args);
			if (result) {
				console.log('Post inserted to database');
			}
			res.send({ msg: 'Post added' });
		} catch (err) {
			console.log('DB query error: ', err);
		} finally {
			client.release();
		}
	},

	addMedia: async (req, res) => {
		await syncMediaSequence();
		let client;
		let now = new Date();
		const media = req.body;

		try {
			client = await pool.connect();
			const cmd = `INSERT INTO media(user_id, content, created_at) VALUES ($1, $2, $3);`
			const args = [media.user_id, media.content, now];
			const result = await client.query(cmd, args);
			if (result) {
				console.log('Media inserted to database');
			}
			res.send({ msg: 'Media saved' });
		} catch (err) {
			console.log('DB query error: ', err);
		} finally {
			client.release();
		}
	},

	getPosts: async (req, res) => {
		let client;
		try {
			client = await pool.connect();
			const cmd = `
				SELECT posts.post_id, posts.content, posts.created_at, users.email
				FROM posts
				JOIN users ON posts.user_id = users.user_id;
			`;
			const result = await client.query(cmd);
			const posts = result.rows;
			res.send(posts);

		} catch (err) {
			console.log('DB query error: ', err);
		} finally {
			client.release();
		}
	},

	getMedia: async (req, res) => {
		let client;

		try {
			client = await pool.connect();
			const cmd = `
				SELECT media.media_id, media.content, media.created_at, users.email
				FROM media
				JOIN users ON media.user_id = users.user_id;
			`
			const result = await client.query(cmd);
			const media = result.rows;
			res.send(media);
		} catch (err) {
			console.log('DB query error: ', err);
		} finally {
			client.release();
		}
	},

	getMediaFiles: (req, res) => {
	  const dir = path.join(__dirname, '../../public/uploads');
	  const files = fs.readdirSync(dir);

	  const mediaFiles = files.filter(file => {
  		return file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png');
  	});

  	res.send(mediaFiles);
	}
}