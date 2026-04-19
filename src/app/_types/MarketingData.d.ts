import { LocalizedText } from '@/types/LocalizedText';

type MarketingData = {
  instagram: {
    active: boolean,
    url: string,
  },
  popin: {
    active: boolean,
    image: string,
    altText: LocalizedText,
  },
};

export { MarketingData };