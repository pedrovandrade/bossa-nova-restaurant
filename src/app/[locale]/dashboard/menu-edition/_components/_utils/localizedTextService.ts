import { LocalizedTextArray, LocalizedText } from "@/types/LocalizedText";

const localizedTextArraysToText = (textArrayData: LocalizedTextArray): LocalizedText => {
    const localizedText = Object
      .entries(textArrayData)
      .map(([locale, textArray]) => [locale, textArray.join('\n')])
      .reduce((targetObj, [locale, text]) => ({...targetObj, [locale]: text}), {});
    return localizedText;
  };

  const localizedTextToTextArrays = (textData: LocalizedText): LocalizedTextArray => {
    const localizedTextArrays = Object
      .entries(textData)
      .map(([locale, text]) => [locale, text.split('\n')])
      .reduce((targetObj, [locale, textArray]) => ({...targetObj, [(locale as string)]: textArray}), {});
    return localizedTextArrays;
  };

  const defaultLocalizedText: LocalizedText = {
    fr: '',
    pt: '',
    en: '',
  };

  const defaultLocalizedTextArray: LocalizedTextArray = {
    fr: [''],
    pt: [''],
    en: [''],
  };

  export {
    localizedTextArraysToText,
    localizedTextToTextArrays,
    defaultLocalizedText,
    defaultLocalizedTextArray,
  };