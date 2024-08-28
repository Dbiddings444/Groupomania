BEGIN;
DELETE FROM users WHERE email = 'u3@test.com';

WITH Renumbered AS (
  SELECT user_id, ROW_NUMBER() 
  OVER (ORDER BY user_id)
  AS new_id
  FROM users
)
UPDATE users
SET user_id = Renumbered.new_id
FROM Renumbered
WHERE users.user_id = Renumbered.id;

COMMIT;