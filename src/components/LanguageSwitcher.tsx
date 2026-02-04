import { useState } from 'react';
import { useLanguage, languageNames, languageFlags, selectableLanguages } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';
import { Globe, ChevronDown } from 'lucide-react';

type LanguageSwitcherProps = {
  className?: string;
  buttonClassName?: string;
};

const LanguageSwitcher = ({ className, buttonClassName }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const hasFlag = Boolean(languageFlags[language]);

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'neo-button interactive flex items-center gap-2 px-3 py-2 text-sm',
          buttonClassName
        )}
        aria-label="Change language"
      >
        <Globe className="w-4 h-4 text-muted-foreground" />
        <span className="text-foreground flex items-center gap-2">
          {hasFlag && <span className="text-xl">{languageFlags[language]}</span>}
          <span>{languageNames[language]}</span>
        </span>
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
          <div
            className="absolute right-0 top-full mt-2 z-50 neo-card rounded-xl overflow-hidden min-w-[160px] max-h-72 overflow-y-auto overscroll-contain animate-fade-in"
            onWheel={(event) => event.stopPropagation()}
          >
            {selectableLanguages.map((lang) => (
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
                {languageFlags[lang] && <span className="text-xl">{languageFlags[lang]}</span>}
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
