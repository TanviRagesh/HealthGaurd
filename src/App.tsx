import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { OnboardingPage } from './components/OnboardingPage';
import { HealthDataInput } from './components/HealthDataInput';
import { RiskDashboard } from './components/RiskDashboard';
import { PreventiveRecommendations } from './components/PreventiveRecommendations';
import { RiskSimulator } from './components/RiskSimulator';
import { PatientRecords } from './components/PatientRecords';
import { Chatbot } from './components/Chatbot';
import { UploadReports } from './components/UploadReports';
import { UserProfile } from './components/UserProfile';
import { DiseaseArticles } from './components/DiseaseArticles';
import { Notifications } from './components/Notifications';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [viewMode, setViewMode] = useState<'patient' | 'doctor'>('patient');
  const [userProfile, setUserProfile] = useState<any>(null);
  const [healthData, setHealthData] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onGetStarted={() => setCurrentPage('login')} onDoctorDemo={() => { setViewMode('doctor'); setCurrentPage('dashboard'); }} />;
      case 'login':
        return <LoginPage onLogin={() => { setIsLoggedIn(true); setCurrentPage('dashboard'); }} onRegister={() => setCurrentPage('register')} />;
      case 'register':
        return <RegisterPage onRegister={() => setCurrentPage('login')} onLogin={() => setCurrentPage('login')} />;
      case 'onboarding':
        return <OnboardingPage onComplete={(data) => { setUserProfile(data); setCurrentPage('health-input'); }} />;
      case 'health-input':
        return <HealthDataInput onComplete={(data) => { setHealthData(data); setCurrentPage('dashboard'); }} />;
      case 'dashboard':
        return <RiskDashboard viewMode={viewMode} onNavigate={setCurrentPage} />;
      case 'recommendations':
        return <PreventiveRecommendations onBack={() => setCurrentPage('dashboard')} />;
      case 'simulator':
        return <RiskSimulator onBack={() => setCurrentPage('dashboard')} />;
      case 'records':
        return <PatientRecords onNavigate={setCurrentPage} />;
      case 'chatbot':
        return <Chatbot />;
      case 'upload':
        return <UploadReports onComplete={() => setCurrentPage('records')} />;
      case 'profile':
        return <UserProfile onNavigate={setCurrentPage} />;
      case 'articles':
        return <DiseaseArticles />;
      case 'notifications':
        return <Notifications />;
      default:
        return <LandingPage onGetStarted={() => setCurrentPage('login')} onDoctorDemo={() => { setViewMode('doctor'); setCurrentPage('dashboard'); }} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col">
      {currentPage !== 'landing' && currentPage !== 'login' && currentPage !== 'register' && (
        <Header currentPage={currentPage} onNavigate={setCurrentPage} isLoggedIn={isLoggedIn} />
      )}
      
      <main className="flex-1">
        {renderPage()}
      </main>
      
      {currentPage !== 'landing' && currentPage !== 'login' && currentPage !== 'register' && (
        <Footer />
      )}
    </div>
  );
}
