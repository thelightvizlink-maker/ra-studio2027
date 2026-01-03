import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { en } from './translations/en';
import { sv } from './translations/sv';
import { nl } from './translations/nl';
import { it } from './translations/it';

export type Language = 'en' | 'sv' | 'nl' | 'it';

type Translations = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const translations: Record<Language, Translations> = {
  en,
  sv,
  nl,
  it,
};

export const languageNames: Record<Language, string> = {
  en: 'English',
  sv: 'Svenska',
  nl: 'Nederlands',
  it: 'Italiano',
};

export const languageFlags: Record<Language, string> = {
  en: '🇬🇧',
  sv: '🇸🇪',
  nl: '🇧🇪',
  it: '🇮🇹',
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('ra-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('ra-language', language);
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
