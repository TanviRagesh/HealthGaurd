export const translations = {
  en: {
    // Navigation
    "dashboard": "Dashboard",
    "health_records": "Health Records",
    "reports": "Reports",
    "articles": "Health Articles",
    "health_progress": "Health Progress",
    "health_alerts": "Health Alerts",
    "chatbot": "AI Assistant",
    "profile": "Profile",
    "nav.sign_out": "Sign Out",

    // Dashboard
    "dashboard.welcome": "Welcome back",
    "dashboard.overview": "Here's an overview of your health journey",
    "dashboard.health_records": "Health Records",
    "dashboard.medical_reports": "Medical Reports",
    "dashboard.risk_score": "Risk Score",
    "dashboard.total_entries": "Total entries logged",
    "dashboard.reports_analyzed": "Reports analyzed",
    "dashboard.last_updated": "Last updated",
    "dashboard.no_assessment": "No assessment yet",
    "dashboard.quick_actions": "Quick Actions",
    "dashboard.common_tasks": "Common tasks to manage your health",
    "dashboard.log_health_data": "Log Health Data",
    "dashboard.upload_report": "Upload Medical Report",
    "dashboard.chat_ai": "Chat with AI Assistant",
    "dashboard.latest_reading": "Latest Reading",
    "dashboard.recent_measurement": "Your most recent health measurement",
    "dashboard.no_records": "No health records yet",
    "dashboard.add_first_record": "Add your first record",

    // Language
    "language.english": "English",
    "language.hindi": "हिंदी",
  },
  hi: {
    // Navigation
    "dashboard": "डैशबोर्ड",
    "health_records": "स्वास्थ्य रिकॉर्ड",
    "reports": "रिपोर्ट",
    "articles": "स्वास्थ्य लेख",
    "health_progress": "स्वास्थ्य प्रगति",
    "health_alerts": "स्वास्थ्य चेतावनी",
    "chatbot": "AI सहायक",
    "profile": "प्रोफ़ाइल",
    "nav.sign_out": "साइन आउट",

    // Dashboard
    "dashboard.welcome": "वापस स्वागत है",
    "dashboard.overview": "यहाँ आपकी स्वास्थ्य यात्रा का अवलोकन है",
    "dashboard.health_records": "स्वास्थ्य रिकॉर्ड",
    "dashboard.medical_reports": "चिकित्सा रिपोर्ट",
    "dashboard.risk_score": "जोखिम स्कोर",
    "dashboard.total_entries": "कुल प्रविष्टियाँ दर्ज",
    "dashboard.reports_analyzed": "रिपोर्ट विश्लेषित",
    "dashboard.last_updated": "अंतिम अपडेट",
    "dashboard.no_assessment": "अभी तक कोई मूल्यांकन नहीं",
    "dashboard.quick_actions": "त्वरित क्रियाएं",
    "dashboard.common_tasks": "अपने स्वास्थ्य का प्रबंधन करने के लिए सामान्य कार्य",
    "dashboard.log_health_data": "स्वास्थ्य डेटा लॉग करें",
    "dashboard.upload_report": "चिकित्सा रिपोर्ट अपलोड करें",
    "dashboard.chat_ai": "AI सहायक से बात करें",
    "dashboard.latest_reading": "नवीनतम पाठन",
    "dashboard.recent_measurement": "आपका सबसे हालिया स्वास्थ्य माप",
    "dashboard.no_records": "अभी तक कोई स्वास्थ्य रिकॉर्ड नहीं",
    "dashboard.add_first_record": "अपना पहला रिकॉर्ड जोड़ें",

    // Language
    "language.english": "English",
    "language.hindi": "हिंदी",
  },
}

export type Language = "en" | "hi"

export function translate(key: string, lang: Language): string {
  const keys = key.split(".")
  let value: any = translations[lang]

  for (const k of keys) {
    value = value?.[k]
  }

  return value || key
}
