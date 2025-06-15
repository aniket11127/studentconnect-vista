
-- Table to store enrollment status per user
CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'active',
  CONSTRAINT fk_profiles_user FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE
);

-- RLS to ensure students only access their own enrollment row
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Student can view their own enrollment" ON public.enrollments
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Student can insert their own enrollment" ON public.enrollments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Table for storing contact messages from the site
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  user_id UUID REFERENCES public.profiles(id)
);

-- Public can insert contact messages (for non-logged users)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anyone to send contact message" 
  ON public.contact_messages
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view their own messages" 
  ON public.contact_messages
  FOR SELECT
  USING (auth.uid() = user_id);
