import { Language } from '@/i18n/LanguageContext';

type CurrencyConfig = {
  code: string;
  rate: number;
  locale: string;
};

const currencyByLanguage: Record<Language, CurrencyConfig> = {
  en: { code: 'USD', rate: 1, locale: 'en-US' },
  sv: { code: 'SEK', rate: 10.5, locale: 'sv-SE' },
  nl: { code: 'EUR', rate: 0.92, locale: 'nl-NL' },
  it: { code: 'EUR', rate: 0.92, locale: 'it-IT' },
  da: { code: 'DKK', rate: 6.8, locale: 'da-DK' },
  'de-DE': { code: 'EUR', rate: 0.92, locale: 'de-DE' },
  'de-CH': { code: 'CHF', rate: 0.9, locale: 'de-CH' },
  'de-LI': { code: 'CHF', rate: 0.9, locale: 'de-CH' },
  'fr-CH': { code: 'CHF', rate: 0.9, locale: 'fr-CH' },
  'es-ES': { code: 'EUR', rate: 0.92, locale: 'es-ES' },
  'pt-PT': { code: 'EUR', rate: 0.92, locale: 'pt-PT' },
  ko: { code: 'KRW', rate: 1350, locale: 'ko-KR' },
  ja: { code: 'JPY', rate: 150, locale: 'ja-JP' },
  'zh-CN': { code: 'CNY', rate: 7.2, locale: 'zh-CN' },
  'zh-HK': { code: 'HKD', rate: 7.8, locale: 'zh-HK' },
  'ar-SA': { code: 'SAR', rate: 3.75, locale: 'ar-SA' },
};

const parsePriceParts = (value: string) =>
  value
    .split(/–|-/)
    .map((part) => part.replace(/[^0-9.]/g, ''))
    .filter(Boolean)
    .map((part) => Number(part))
    .filter((part) => !Number.isNaN(part));

const roundToStep = (value: number) => {
  const step = value >= 100 ? 10 : 5;
  return Math.ceil(value / step) * step;
};

const formatCurrency = (value: number, config: CurrencyConfig) =>
  new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.code,
    maximumFractionDigits: 0,
  }).format(value);

export const formatPrice = (value: string, language: Language) => {
  const config = currencyByLanguage[language] ?? currencyByLanguage.en;

  if (config.code === 'USD') {
    return value;
  }

  const parts = parsePriceParts(value);
  if (parts.length === 0) {
    return value;
  }

  const formatted = parts.map((part) => {
    const converted = part * config.rate;
    return formatCurrency(roundToStep(converted), config);
  });

  return formatted.join('–');
};
