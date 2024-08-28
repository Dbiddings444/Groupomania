CREATE TABLE views (
	view_id SERIAL PRIMARY KEY,
	user_id int REFERENCES users(user_id),
	post_id int REFERENCES posts(post_id),
	viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	UNIQUE(user_id, post_id)
);