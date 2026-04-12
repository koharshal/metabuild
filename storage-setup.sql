-- Create a new storage bucket for site assets and project files
INSERT INTO storage.buckets (id, name, public)
VALUES ('cms-assets', 'cms-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Set up access policies for the bucket
-- 1. Allow public read access to all objects in the cms-assets bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'cms-assets' );

-- 2. Allow authenticated users (admins) to upload objects
CREATE POLICY "Admin Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'cms-assets' );

-- 3. Allow authenticated users (admins) to update objects
CREATE POLICY "Admin Update"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'cms-assets' )
WITH CHECK ( bucket_id = 'cms-assets' );

-- 4. Allow authenticated users (admins) to delete objects
CREATE POLICY "Admin Delete"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'cms-assets' );
