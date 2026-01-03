import { useState } from 'react';
import { useLanguage, Language, languageNames, languageFlags } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';
import { Globe, ChevronDown } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages: Language[] = ['en', 'sv', 'nl', 'it'];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="neo-button interactive flex items-center gap-2 px-3 py-2 text-sm"
        aria-label="Change language"
      >
        <Globe className="w-4 h-4 text-muted-foreground" />
        <span className="text-foreground">{languageFlags[language]} {languageNames[language]}</span>
        <ChevronDown className={cn(
          "w-3 h-3 text-muted-foreground transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 z-50 neo-card rounded-xl overflow-hidden min-w-[160px] animate-fade-in">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full px-4 py-3 text-left text-sm flex items-center gap-3 transition-colors",
                  language === lang
                    ? "text-primary bg-primary/10 font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                )}
              >
                <span className="text-xl">{languageFlags[lang]}</span>
                <span>{languageNames[lang]}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
