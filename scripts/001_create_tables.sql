-- Create users profile table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  height_cm DECIMAL(5, 2),
  weight_kg DECIMAL(5, 2),
  phone TEXT,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  medical_conditions TEXT[],
  allergies TEXT[],
  medications TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create health records table for daily/periodic tracking
CREATE TABLE IF NOT EXISTS public.health_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  record_date DATE NOT NULL DEFAULT CURRENT_DATE,
  blood_pressure_systolic INTEGER,
  blood_pressure_diastolic INTEGER,
  heart_rate INTEGER,
  blood_sugar DECIMAL(5, 2),
  temperature DECIMAL(4, 2),
  weight_kg DECIMAL(5, 2),
  oxygen_saturation INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create medical reports table for uploaded documents
CREATE TABLE IF NOT EXISTS public.medical_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  report_type TEXT NOT NULL,
  report_date DATE NOT NULL,
  file_url TEXT,
  file_name TEXT,
  ai_analysis JSONB,
  findings TEXT[],
  risk_factors TEXT[],
  recommendations TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create risk assessments table for AI-generated predictions
CREATE TABLE IF NOT EXISTS public.risk_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assessment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  overall_risk_score INTEGER CHECK (overall_risk_score >= 0 AND overall_risk_score <= 100),
  cardiovascular_risk INTEGER CHECK (cardiovascular_risk >= 0 AND cardiovascular_risk <= 100),
  diabetes_risk INTEGER CHECK (diabetes_risk >= 0 AND diabetes_risk <= 100),
  respiratory_risk INTEGER CHECK (respiratory_risk >= 0 AND respiratory_risk <= 100),
  cancer_risk INTEGER CHECK (cancer_risk >= 0 AND cancer_risk <= 100),
  risk_factors JSONB,
  recommendations TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create chat messages table for AI chatbot conversations
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.risk_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- RLS Policies for health_records
CREATE POLICY "Users can view their own health records" 
  ON public.health_records FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own health records" 
  ON public.health_records FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own health records" 
  ON public.health_records FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own health records" 
  ON public.health_records FOR DELETE 
  USING (auth.uid() = user_id);

-- RLS Policies for medical_reports
CREATE POLICY "Users can view their own medical reports" 
  ON public.medical_reports FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own medical reports" 
  ON public.medical_reports FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own medical reports" 
  ON public.medical_reports FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own medical reports" 
  ON public.medical_reports FOR DELETE 
  USING (auth.uid() = user_id);

-- RLS Policies for risk_assessments
CREATE POLICY "Users can view their own risk assessments" 
  ON public.risk_assessments FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own risk assessments" 
  ON public.risk_assessments FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for chat_messages
CREATE POLICY "Users can view their own chat messages" 
  ON public.chat_messages FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own chat messages" 
  ON public.chat_messages FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX idx_health_records_user_date ON public.health_records(user_id, record_date DESC);
CREATE INDEX idx_medical_reports_user_date ON public.medical_reports(user_id, report_date DESC);
CREATE INDEX idx_risk_assessments_user_date ON public.risk_assessments(user_id, assessment_date DESC);
CREATE INDEX idx_chat_messages_user_created ON public.chat_messages(user_id, created_at DESC);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON public.profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_health_records_updated_at 
  BEFORE UPDATE ON public.health_records 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_medical_reports_updated_at 
  BEFORE UPDATE ON public.medical_reports 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
