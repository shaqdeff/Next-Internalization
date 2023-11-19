import 'server-only';

export type Locale = keyof typeof dictionaries;

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  sw: () => import('./dictionaries/sw.json').then((module) => module.default),
  fr: () => import('./dictionaries/fr.json').then((module) => module.default),
  es: () => import('./dictionaries/es.json').then((module) => module.default),
  cn: () => import('./dictionaries/cn.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
