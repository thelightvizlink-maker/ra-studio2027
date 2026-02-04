import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { en } from './translations/en';
import { sv } from './translations/sv';
import { nl } from './translations/nl';
import { it } from './translations/it';
import { da } from './translations/da';
import { de } from './translations/de';
import { frCH } from './translations/frCH';
import { es } from './translations/es';
import { pt } from './translations/pt';
import { ko } from './translations/ko';
import { ja } from './translations/ja';
import { zhCN } from './translations/zhCN';
import { zhHK } from './translations/zhHK';
import { ar } from './translations/ar';

export type Language =
  | 'en'
  | 'sv'
  | 'nl'
  | 'it'
  | 'da'
  | 'de-CH'
  | 'de-LI'
  | 'fr-CH'
  | 'es-ES'
  | 'pt-PT'
  | 'ko'
  | 'ja'
  | 'zh-CN'
  | 'zh-HK'
  | 'ar-SA';

type Translations = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const transformTranslations = (value: unknown, transform: (input: string) => string): unknown => {
  if (typeof value === 'string') {
    return transform(value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => transformTranslations(item, transform));
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, transformTranslations(entry, transform)])
    );
  }

  return value;
};

const deCH = transformTranslations(de, (value) => value.replace(/ß/g, 'ss')) as Translations;

const translations: Record<Language, Translations> = {
  en,
  sv,
  nl,
  it,
  da,
  'de-CH': deCH,
  'de-LI': de,
  'fr-CH': frCH,
  'es-ES': es,
  'pt-PT': pt,
  ko,
  ja,
  'zh-CN': zhCN,
  'zh-HK': zhHK,
  'ar-SA': ar,
};

const defaultLanguage: Language = 'en';
const autoDetectOnlyLanguages: Language[] = ['pt-PT'];
const rtlLanguages: Language[] = ['ar-SA'];
const supportedLanguages: Language[] = Object.keys(translations) as Language[];

export const selectableLanguages: Language[] = supportedLanguages.filter(
  (language) => !autoDetectOnlyLanguages.includes(language)
);

export const languageNames: Record<Language, string> = {
  en: 'English',
  sv: 'Svenska',
  nl: 'Nederlands',
  it: 'Italiano',
  da: 'Dansk',
  'de-CH': 'Deutsch (Schweiz)',
  'de-LI': 'Deutsch (Liechtenstein)',
  'fr-CH': 'Français (Suisse)',
  'es-ES': 'Español',
  'pt-PT': 'Português',
  ko: '한국어',
  ja: '日本語',
  'zh-CN': '中文 (简体)',
  'zh-HK': '中文 (繁體)',
  'ar-SA': 'العربية (السعودية)',
};

export const languageFlags: Record<Language, string> = {
  en: '🇬🇧',
  sv: '🇸🇪',
  nl: '🇳🇱',
  it: '🇮🇹',
  da: '🇩🇰',
  'de-CH': '🇨🇭',
  'de-LI': '🇱🇮',
  'fr-CH': '🇨🇭',
  'es-ES': '🇪🇸',
  'pt-PT': '🇵🇹',
  ko: '',
  ja: '',
  'zh-CN': '',
  'zh-HK': '',
  'ar-SA': '🇸🇦',
};

const languageAliases: Record<string, Language> = {
  en: 'en',
  'en-us': 'en',
  'en-gb': 'en',
  sv: 'sv',
  'sv-se': 'sv',
  nl: 'nl',
  'nl-nl': 'nl',
  it: 'it',
  'it-it': 'it',
  da: 'da',
  'da-dk': 'da',
  de: 'de-CH',
  'de-de': 'de-CH',
  'de-ch': 'de-CH',
  'de-li': 'de-LI',
  fr: 'fr-CH',
  'fr-ch': 'fr-CH',
  es: 'es-ES',
  'es-es': 'es-ES',
  pt: 'pt-PT',
  'pt-pt': 'pt-PT',
  'pt-br': 'pt-PT',
  ko: 'ko',
  'ko-kr': 'ko',
  ja: 'ja',
  'ja-jp': 'ja',
  ar: 'ar-SA',
  'ar-sa': 'ar-SA',
};

const detectLanguage = (): Language => {
  if (typeof navigator === 'undefined') {
    return defaultLanguage;
  }

  const candidates = navigator.languages && navigator.languages.length > 0
    ? navigator.languages
    : [navigator.language];

  for (const candidate of candidates) {
    const normalized = candidate.toLowerCase();

    if (languageAliases[normalized]) {
      return languageAliases[normalized];
    }

    if (normalized.startsWith('zh')) {
      if (normalized.includes('hant') || normalized.includes('tw') || normalized.includes('hk') || normalized.includes('mo')) {
        return 'zh-HK';
      }
      return 'zh-CN';
    }

    const base = normalized.split('-')[0];
    if (languageAliases[base]) {
      return languageAliases[base];
    }
  }

  return defaultLanguage;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') {
      return defaultLanguage;
    }
    const saved = localStorage.getItem('ra-language');
    if (saved && supportedLanguages.includes(saved as Language)) {
      return saved as Language;
    }
    return detectLanguage();
  });

  useEffect(() => {
    localStorage.setItem('ra-language', language);
    document.documentElement.lang = language;
    const isRtl = rtlLanguages.includes(language);
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.classList.toggle('rtl', isRtl);
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
