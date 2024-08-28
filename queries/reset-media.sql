WITH RenumberedMedia AS (
  SELECT media_id, ROW_NUMBER() OVER (ORDER BY media_id) AS new_id
  FROM media
)
UPDATE media
SET media_id = RenumberedMedia.new_id
FROM RenumberedMedia
WHERE media.media_id = RenumberedMedia.media_id;
