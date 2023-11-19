'use client';
import { FC, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';

// icons
import { RiArrowDownSLine } from 'react-icons/ri';
import { EN, KE, FR, ES, DE, CN } from '../../../public/flags';
import { Locale } from '@/app/[lang]/dictionaries';

type Props = {};

const LanguageDropdown: FC<Props> = () => {
  const router = useRouter();

  type Language = 'en' | 'sw' | 'fr' | 'es' | 'cn';
  const languages: Language[] = ['en', 'sw', 'fr', 'es', 'cn'];

  type FlagsType = {
    [key: string]: any;
  };
  const flags: FlagsType = {
    en: EN,
    sw: KE,
    fr: FR,
    es: ES,
    de: DE,
    cn: CN,
  };

  const storedLang = localStorage.getItem('selectedLanguage');
  const initialLang = storedLang ? JSON.parse(storedLang) : languages[0];

  const [selectedLanguage, setSelectedLanguage] =
    useState<Language>(initialLang);
  const [languageOpen, setLanguageOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguageOpen(!languageOpen);
  };

  const switchLanguage = (lang: Locale) => {
    router.push(`/${lang}`);
  };

  const selectLanguage = (language: Language) => {
    setSelectedLanguage(language);
    setLanguageOpen(false);
  };

  useEffect(() => {
    localStorage.setItem('selectedLanguage', JSON.stringify(selectedLanguage));
    if (selectedLanguage) {
      switchLanguage(selectedLanguage);
    }
  }, [selectedLanguage]);

  return (
    <div className="p-4">
      <div className="relative">
        <div className="flex items-center justify-center">
          <button
            onClick={toggleLanguage}
            aria-label="Toggle Language Dropdown"
            className="flex items-center justify-center w-16 h-16 focus:outline-none">
            <div className="relative w-4 h-4 rounded-full overflow-hidden mr-0">
              <Image
                src={flags[selectedLanguage]}
                alt={selectedLanguage}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover"
              />
            </div>
            {/* <span className="-mr-1">{selectedLanguage}</span> */}
            <div className="ml-1">
              <RiArrowDownSLine size={24} />
            </div>
          </button>
          <AnimatePresence>
            {languageOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full mt-2 w-[8rem] rounded-md shadow-lg overflow-hidden z-50 bg-opacity-60 bg-[#010f4d] backdrop-filter backdrop-blur"
                aria-label="Language Selection">
                <motion.div className="py-2 flex-col align-center">
                  <ul className="space-y-1 flex flex-col items-center justify-center">
                    {languages.map((language) => (
                      <li
                        key={language}
                        className="px-4 py-2 w-3/4 mx-auto text-center lowercase rounded-md hover:bg-black cursor-pointer flex items-center justify-center"
                        aria-label={language}
                        onClick={() => {
                          selectLanguage(language);
                        }}>
                        <div className="relative w-4 h-4 rounded-full overflow-hidden mr-2">
                          <Image
                            src={flags[language]}
                            alt={language}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover"
                          />
                        </div>
                        {language}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default LanguageDropdown;
