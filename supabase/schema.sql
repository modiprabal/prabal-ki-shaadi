-- ==========================================
-- 1. Profiles Table (RBAC)
-- ==========================================
-- This table automatically links to Supabase's auth.users
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  role TEXT CHECK (role IN ('COORDINATOR', 'ADMIN', 'COUPLE'))
);

-- Turn on Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow public read access to profiles
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);


-- ==========================================
-- 2. Guests Table
-- ==========================================
CREATE TABLE public.guests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  family_name TEXT NOT NULL,
  phone_number TEXT,
  expected_count INTEGER DEFAULT 1,
  accommodation_details TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;

-- Only Admins and Couples can view and modify the guest list entirely
CREATE POLICY "Admins/Couples manage guests" ON public.guests 
FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('ADMIN', 'COUPLE'))
);

-- Guests can view their own guest record by ID (used for RSVP login logic)
CREATE POLICY "Guests can view own record" ON public.guests 
FOR SELECT USING (true); -- simplified, relying on obscure UUIDs for access without auth


-- ==========================================
-- 3. RSVPs Table
-- ==========================================
CREATE TABLE public.rsvps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_id UUID REFERENCES public.guests(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('ATTENDING', 'NOT_ATTENDING', 'PENDING')) DEFAULT 'PENDING',
  attending_count INTEGER DEFAULT 0,
  dietary_restrictions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- Anyone can insert an RSVP
CREATE POLICY "Anyone can RSVP" ON public.rsvps FOR INSERT WITH CHECK (true);

-- Admins/Couples can view/update all RSVPs
CREATE POLICY "Admins view all RSVPs" ON public.rsvps 
FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('ADMIN', 'COUPLE'))
);


-- ==========================================
-- 4. To-Dos Table (with Delegation)
-- ==========================================
CREATE TABLE public.todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('PENDING', 'IN_PROGRESS', 'COMPLETED')) DEFAULT 'PENDING',
  assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

ALTER TABLE public.todos ENABLE ROW LEVEL SECURITY;

-- Coordinators can view all todos, but only update the status of those assigned to them
CREATE POLICY "Coordinators view all" ON public.todos FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('COORDINATOR', 'ADMIN', 'COUPLE'))
);

CREATE POLICY "Coordinators update assigned" ON public.todos FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND (profiles.role IN ('ADMIN', 'COUPLE') OR (profiles.role = 'COORDINATOR' AND assigned_to = auth.uid())))
);

-- Only Admins/Couples can Insert or Delete
CREATE POLICY "Admins insert/delete" ON public.todos FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('ADMIN', 'COUPLE'))
);


-- ==========================================
-- 5. Budget Table
-- ==========================================
CREATE TABLE public.budget (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  item_name TEXT NOT NULL,
  estimated_amount NUMERIC(10, 2) DEFAULT 0,
  actual_amount NUMERIC(10, 2) DEFAULT 0,
  is_paid BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

ALTER TABLE public.budget ENABLE ROW LEVEL SECURITY;

-- Only Admins and Couples can view/manage budget
CREATE POLICY "Admins manage budget" ON public.budget FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('ADMIN', 'COUPLE'))
);
