SELECT pg_get_serial_sequence('posts', 'post_id');
ALTER SEQUENCE posts_post_id_seq RESTART WITH 1;
