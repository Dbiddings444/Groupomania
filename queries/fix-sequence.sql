DO $$
DECLARE
	current_sequence_value bigint;
	max_post_id bigint;
BEGIN
	SELECT currval('posts_post_id_seq') INTO current_sequence_value;
	SELECT MAX(post_id) INTO max_post_id FROM posts;

	IF current_sequence_value <= max_post_id THEN
		PERFORM setval('posts_post_id_seq', max_post_id + 1);
	END IF;
END $$;