type CurrentLocale = 'fr' | 'en' | 'pt';

// type LocalizedText = {
//   [key: 'fr' | 'en' | 'pt']: string;
// };
type LocalizedText = {
  fr?: string;
  pt?: string;
  en?: string;
};

type LocalizedTextArray = {
  fr?: string[];
  pt?: string[];
  en?: string[];
};

export {
  CurrentLocale,
  LocalizedText,
  LocalizedTextArray,
};