export const supportedLanguages = {
  ru_RU: 'Русский',
  en_US: 'English',
};

export const defaultLanguage = localStorage.getItem('lang') || Object.keys(supportedLanguages)[0];
