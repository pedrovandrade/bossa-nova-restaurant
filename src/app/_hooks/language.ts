import { type CurrentLocale, LocalizedText, LocalizedTextArray } from "@/types/LocalizedText";
import { useLocale } from "next-intl";

type GetLocalizedFunction = (textData: LocalizedText | LocalizedTextArray) => string | string[] | undefined;

const useLocalized = (locale?: CurrentLocale): GetLocalizedFunction => {
  const currentLocale = useLocale() as CurrentLocale;
  const defaultLocale: CurrentLocale = 'fr';

  const getLocalizedText = (textData: LocalizedText | LocalizedTextArray): string | string[] => {
    if (locale && textData[locale]) {
      return textData[locale];
    }

    return textData[currentLocale] || textData[defaultLocale] || '';
  }

  return getLocalizedText;
};

export {
  useLocalized,
};