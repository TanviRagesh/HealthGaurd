import { useState } from 'react';
import { Upload, Activity, Brain, TrendingUp, AlertCircle } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';

interface HealthDataInputProps {
  onComplete: (data: any) => void;
}

export function HealthDataInput({ onComplete }: HealthDataInputProps) {
  const [recordDate, setRecordDate] = useState('');
  const [dateError, setDateError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [labData, setLabData] = useState({
    bloodSugar: '',
    cholesterol: '',
    systolicBP: '',
    diastolicBP: '',
    liverEnzymes: ''
  });

  const [lifestyle, setLifestyle] = useState({
    activityLevel: 3,
    sleepHours: 7,
    sleepQuality: 3,
    dietQuality: 3,
    smoking: false,
    alcohol: false,
    stressLevel: 3
  });

  const [mentalHealth, setMentalHealth] = useState({
    stressLevel: 3,
    moodConsistency: 3,
    burnout: false,
    sleepDisturbance: false
  });

  // Get today's date in YYYY-MM-DD format for max attribute
  const today = new Date().toISOString().split('T')[0];

  const validateDate = (date: string): boolean => {
    if (!date) {
      setDateError('Please select a record date');
      return false;
    }
    
    const selectedDate = new Date(date);
    const todayDate = new Date();
    todayDate.setHours(23, 59, 59, 999); // End of today
    
    if (selectedDate > todayDate) {
      setDateError('Record date cannot be in the future');
      return false;
    }
    
    setDateError('');
    return true;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setRecordDate(date);
    validateDate(date);
  };

  const handleSubmit = async () => {
    if (!validateDate(recordDate)) {
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}/health-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          lab: labData,
          lifestyle: lifestyle,
          mental_health: mentalHealth,
          recorded_at: recordDate
        })
      });

      if (response.ok) {
        onComplete({ labData, lifestyle, mentalHealth });
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to save health data');
      }
    } catch (error) {
      console.error('Error saving health data:', error);
      alert('Error saving health data');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Health Data</h1>
          <p className="text-xl text-gray-600">
            Provide your recent health information for accurate risk analysis
          </p>
        </div>

        <div className="space-y-8">
          {/* Lab Data Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Lab Data (Trend-Based)</h2>
                <p className="text-gray-600">Upload reports or enter values manually</p>
              </div>
            </div>

            <div className="mb-6">
              <button className="w-full py-4 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 text-blue-600">
                <Upload className="w-5 h-5" />
                <span className="font-medium">Upload Previous Lab Reports (PDF/Image)</span>
              </button>
              <p className="text-sm text-gray-500 mt-2 text-center">
                💡 Upload multiple reports to track trends over time
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Blood Sugar (mg/dL)</label>
                <input
                  type="number"
                  value={labData.bloodSugar}
                  onChange={(e) => setLabData({ ...labData, bloodSugar: e.target.value })}
                  placeholder="e.g., 95"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Total Cholesterol (mg/dL)</label>
                <input
                  type="number"
                  value={labData.cholesterol}
                  onChange={(e) => setLabData({ ...labData, cholesterol: e.target.value })}
                  placeholder="e.g., 180"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Systolic BP (mmHg)</label>
                <input
                  type="number"
                  value={labData.systolicBP}
                  onChange={(e) => setLabData({ ...labData, systolicBP: e.target.value })}
                  placeholder="e.g., 120"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Diastolic BP (mmHg)</label>
                <input
                  type="number"
                  value={labData.diastolicBP}
                  onChange={(e) => setLabData({ ...labData, diastolicBP: e.target.value })}
                  placeholder="e.g., 80"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">Liver Enzymes (ALT/AST)</label>
                <input
                  type="text"
                  value={labData.liverEnzymes}
                  onChange={(e) => setLabData({ ...labData, liverEnzymes: e.target.value })}
                  placeholder="e.g., 25/28 U/L"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Lifestyle Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Lifestyle Data</h2>
                <p className="text-gray-600">Your daily habits and routines</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-3">
                  Daily Activity Level: <span className="font-semibold text-blue-600">{lifestyle.activityLevel}/5</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={lifestyle.activityLevel}
                  onChange={(e) => setLifestyle({ ...lifestyle, activityLevel: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Sedentary</span>
                  <span>Very Active</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-3">
                    Sleep Duration: <span className="font-semibold text-blue-600">{lifestyle.sleepHours} hours</span>
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="12"
                    value={lifestyle.sleepHours}
                    onChange={(e) => setLifestyle({ ...lifestyle, sleepHours: Number(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-3">
                    Sleep Quality: <span className="font-semibold text-blue-600">{lifestyle.sleepQuality}/5</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={lifestyle.sleepQuality}
                    onChange={(e) => setLifestyle({ ...lifestyle, sleepQuality: Number(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-3">
                  Diet Quality: <span className="font-semibold text-blue-600">{lifestyle.dietQuality}/5</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={lifestyle.dietQuality}
                  onChange={(e) => setLifestyle({ ...lifestyle, dietQuality: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition-all">
                  <input
                    type="checkbox"
                    checked={lifestyle.smoking}
                    onChange={(e) => setLifestyle({ ...lifestyle, smoking: e.target.checked })}
                    className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                  />
                  <span className="text-2xl">🚬</span>
                  <span className="font-medium text-gray-900">Smoking</span>
                </label>

                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition-all">
                  <input
                    type="checkbox"
                    checked={lifestyle.alcohol}
                    onChange={(e) => setLifestyle({ ...lifestyle, alcohol: e.target.checked })}
                    className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                  />
                  <span className="text-2xl">🍷</span>
                  <span className="font-medium text-gray-900">Regular Alcohol</span>
                </label>
              </div>
            </div>
          </div>

          {/* Mental Health Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Mental Health & Stress</h2>
                <p className="text-gray-600">Understanding your emotional wellbeing</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-3">
                  Stress Level: <span className="font-semibold text-purple-600">{mentalHealth.stressLevel}/5</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={mentalHealth.stressLevel}
                  onChange={(e) => setMentalHealth({ ...mentalHealth, stressLevel: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Very Low</span>
                  <span>Very High</span>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-3">
                  Mood Consistency: <span className="font-semibold text-purple-600">{mentalHealth.moodConsistency}/5</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={mentalHealth.moodConsistency}
                  onChange={(e) => setMentalHealth({ ...mentalHealth, moodConsistency: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Very Unstable</span>
                  <span>Very Stable</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition-all">
                  <input
                    type="checkbox"
                    checked={mentalHealth.burnout}
                    onChange={(e) => setMentalHealth({ ...mentalHealth, burnout: e.target.checked })}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="text-2xl">😓</span>
                  <span className="font-medium text-gray-900">Feeling Burnout</span>
                </label>

                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition-all">
                  <input
                    type="checkbox"
                    checked={mentalHealth.sleepDisturbance}
                    onChange={(e) => setMentalHealth({ ...mentalHealth, sleepDisturbance: e.target.checked })}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="text-2xl">😴</span>
                  <span className="font-medium text-gray-900">Sleep Disturbance</span>
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              onClick={handleSubmit}
              disabled={submitting || !recordDate || !!dateError}
              className="px-12 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {submitting ? 'Submitting...' : 'Analyze My Health Risks'}
            </button>
            <p className="text-sm text-gray-500 mt-4">
              🔒 All data is encrypted and securely processed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
