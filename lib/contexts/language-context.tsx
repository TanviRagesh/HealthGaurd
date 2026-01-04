"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "hi"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    "dashboard": "Dashboard",
    "health_records": "Health Records",
    "reports": "Reports",
    "articles": "Health Articles",
    "health_progress": "Health Progress",
    "health_alerts": "Health Alerts",
    "chatbot": "AI Assistant",
    "profile": "Profile",
    "nav.sign_out": "Sign Out",
    "language.switch": "Language",
  },
  hi: {
    "dashboard": "डैशबोर्ड",
    "health_records": "स्वास्थ्य रिकॉर्ड",
    "reports": "रिपोर्ट",
    "articles": "स्वास्थ्य लेख",
    "health_progress": "स्वास्थ्य प्रगति",
    "health_alerts": "स्वास्थ्य चेतावनी",
    "chatbot": "AI सहायक",
    "profile": "प्रोफ़ाइल",
    "nav.sign_out": "साइन आउट",
    "language.switch": "भाषा",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    const saved = localStorage.getItem("healthguard-language") as Language
    if (saved && (saved === "en" || saved === "hi")) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("healthguard-language", lang)
  }

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = translations[language]

    for (const k of keys) {
      value = value?.[k]
    }

    return value || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
