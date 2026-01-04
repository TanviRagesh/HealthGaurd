-- Create health articles table for smart search
CREATE TABLE IF NOT EXISTS public.health_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL, -- 'disease', 'symptom', 'topic'
  keywords TEXT[] NOT NULL,
  overview TEXT NOT NULL,
  symptoms TEXT[],
  risk_factors TEXT[],
  prevention_tips TEXT[],
  lifestyle_guidance TEXT[],
  related_conditions TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create daily health tracking table
CREATE TABLE IF NOT EXISTS public.daily_health_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  log_date DATE NOT NULL DEFAULT CURRENT_DATE,
  sleep_hours DECIMAL(3, 1),
  exercise_minutes INTEGER,
  stress_level INTEGER CHECK (stress_level >= 1 AND stress_level <= 10),
  calories_intake INTEGER,
  water_intake_ml INTEGER,
  mood_level INTEGER CHECK (mood_level >= 1 AND mood_level <= 10),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, log_date)
);

-- Create disease impact analysis table
CREATE TABLE IF NOT EXISTS public.disease_impact_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  analysis_date DATE NOT NULL DEFAULT CURRENT_DATE,
  disease_name TEXT NOT NULL,
  current_risk_level INTEGER CHECK (current_risk_level >= 0 AND current_risk_level <= 100),
  risk_trend TEXT CHECK (risk_trend IN ('improving', 'stable', 'worsening')),
  contributing_factors JSONB,
  preventive_actions TEXT[],
  precautions TEXT[],
  lifestyle_remedies TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.health_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_health_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disease_impact_analysis ENABLE ROW LEVEL SECURITY;

-- RLS Policies for health_articles (public read access)
CREATE POLICY "Anyone can view health articles" 
  ON public.health_articles FOR SELECT 
  USING (true);

-- RLS Policies for daily_health_logs
CREATE POLICY "Users can view their own daily logs" 
  ON public.daily_health_logs FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own daily logs" 
  ON public.daily_health_logs FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own daily logs" 
  ON public.daily_health_logs FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own daily logs" 
  ON public.daily_health_logs FOR DELETE 
  USING (auth.uid() = user_id);

-- RLS Policies for disease_impact_analysis
CREATE POLICY "Users can view their own disease impact analysis" 
  ON public.disease_impact_analysis FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own disease impact analysis" 
  ON public.disease_impact_analysis FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_health_articles_keywords ON public.health_articles USING GIN(keywords);
CREATE INDEX idx_health_articles_category ON public.health_articles(category);
CREATE INDEX idx_daily_health_logs_user_date ON public.daily_health_logs(user_id, log_date DESC);
CREATE INDEX idx_disease_impact_user_date ON public.disease_impact_analysis(user_id, analysis_date DESC);

-- Create trigger for daily_health_logs updated_at
CREATE TRIGGER update_daily_health_logs_updated_at 
  BEFORE UPDATE ON public.daily_health_logs 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample health articles
INSERT INTO public.health_articles (title, category, keywords, overview, symptoms, risk_factors, prevention_tips, lifestyle_guidance, related_conditions) VALUES
  ('Type 2 Diabetes', 'disease', ARRAY['diabetes', 'blood sugar', 'insulin', 'glucose', 'metabolic'], 
   'Type 2 diabetes is a chronic condition that affects how your body processes blood sugar (glucose). With type 2 diabetes, your body either resists the effects of insulin or doesn''t produce enough insulin to maintain normal glucose levels.',
   ARRAY['Increased thirst', 'Frequent urination', 'Increased hunger', 'Fatigue', 'Blurred vision', 'Slow healing wounds', 'Frequent infections'],
   ARRAY['Family history of diabetes', 'Being overweight', 'Physical inactivity', 'Age over 45', 'High blood pressure', 'Abnormal cholesterol levels', 'History of gestational diabetes'],
   ARRAY['Maintain a healthy weight', 'Stay physically active', 'Eat healthy foods', 'Avoid prolonged inactivity', 'Get regular screenings'],
   ARRAY['Follow a balanced diet rich in vegetables, whole grains, and lean proteins', 'Exercise for at least 150 minutes per week', 'Monitor blood sugar levels regularly', 'Maintain healthy sleep patterns', 'Manage stress through relaxation techniques'],
   ARRAY['Hypertension', 'Heart disease', 'Obesity', 'Metabolic syndrome']),
   
  ('Hypertension (High Blood Pressure)', 'disease', ARRAY['hypertension', 'blood pressure', 'cardiovascular', 'heart'], 
   'Hypertension is a common condition where the long-term force of blood against artery walls is high enough to eventually cause health problems, particularly heart disease.',
   ARRAY['Headaches', 'Shortness of breath', 'Dizziness', 'Chest pain', 'Visual changes', 'Blood in urine'],
   ARRAY['Age', 'Family history', 'Being overweight', 'Lack of physical activity', 'High sodium diet', 'Excessive alcohol consumption', 'Stress', 'Chronic kidney disease'],
   ARRAY['Reduce sodium intake', 'Exercise regularly', 'Maintain healthy weight', 'Limit alcohol', 'Quit smoking', 'Manage stress', 'Get adequate sleep'],
   ARRAY['Follow DASH diet (Dietary Approaches to Stop Hypertension)', 'Exercise 30 minutes most days', 'Limit sodium to 2,300mg per day', 'Practice stress reduction techniques like meditation', 'Maintain consistent sleep schedule'],
   ARRAY['Heart disease', 'Stroke', 'Kidney disease', 'Diabetes']),
   
  ('Chronic Fatigue', 'symptom', ARRAY['fatigue', 'tiredness', 'exhaustion', 'low energy', 'weakness'], 
   'Chronic fatigue is persistent tiredness that doesn''t improve with rest and may worsen with physical or mental activity. It can be a symptom of various underlying conditions.',
   ARRAY['Persistent exhaustion', 'Difficulty concentrating', 'Memory problems', 'Muscle pain', 'Joint pain', 'Headaches', 'Sleep problems'],
   ARRAY['Poor sleep quality', 'Nutrient deficiencies', 'Chronic stress', 'Sedentary lifestyle', 'Underlying medical conditions', 'Depression or anxiety', 'Dehydration'],
   ARRAY['Improve sleep hygiene', 'Stay hydrated', 'Eat a balanced diet', 'Exercise regularly', 'Manage stress', 'Limit caffeine and alcohol'],
   ARRAY['Establish regular sleep schedule', 'Stay active with gentle exercises like walking', 'Eat iron-rich foods and whole grains', 'Practice energy management techniques', 'Take regular breaks during activities'],
   ARRAY['Anemia', 'Thyroid disorders', 'Depression', 'Diabetes', 'Sleep apnea']),
   
  ('Heart Disease Prevention', 'topic', ARRAY['heart', 'cardiovascular', 'prevention', 'heart health', 'cardiac'], 
   'Heart disease prevention involves lifestyle changes and risk factor management to reduce the likelihood of developing cardiovascular conditions.',
   ARRAY['Chest pain', 'Shortness of breath', 'Irregular heartbeat', 'Fatigue', 'Swelling in legs'],
   ARRAY['High blood pressure', 'High cholesterol', 'Smoking', 'Diabetes', 'Obesity', 'Family history', 'Physical inactivity', 'Stress'],
   ARRAY['Don''t smoke', 'Exercise regularly', 'Eat heart-healthy diet', 'Maintain healthy weight', 'Control blood pressure', 'Manage cholesterol', 'Control diabetes', 'Manage stress'],
   ARRAY['Eat more vegetables, fruits, whole grains, and lean proteins', 'Limit saturated fats and trans fats', 'Reduce sodium intake', 'Exercise 150 minutes per week', 'Practice stress management', 'Get 7-9 hours of sleep nightly'],
   ARRAY['Hypertension', 'High cholesterol', 'Diabetes', 'Obesity']);
