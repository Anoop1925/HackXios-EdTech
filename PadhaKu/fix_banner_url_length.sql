-- Fix for bannerImageUrl varchar(255) limit issue
-- Run this SQL in your Supabase SQL Editor

-- Option 1: Increase column length to TEXT (unlimited)
ALTER TABLE courses 
ALTER COLUMN bannerimageurl TYPE TEXT;

-- Option 2: Or if you want to keep varchar, increase to 1000 characters
-- ALTER TABLE courses 
-- ALTER COLUMN bannerimageurl TYPE VARCHAR(1000);

-- Verify the change
SELECT column_name, data_type, character_maximum_length
FROM information_schema.columns
WHERE table_name = 'courses' AND column_name = 'bannerimageurl';
