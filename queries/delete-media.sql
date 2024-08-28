BEGIN;
DELETE FROM media WHERE media_id = '6';

WITH Renumbered AS (
  SELECT media_id, ROW_NUMBER() 
  OVER (ORDER BY media_id)
  AS new_id
  FROM media
)
UPDATE media
SET media_id = Renumbered.new_id
FROM Renumbered
WHERE media.media_id = Renumbered.new_id;

COMMIT;