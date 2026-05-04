import { LocalizedText, LocalizedTextArray } from '@/types/LocalizedText';

/**
 * Represents the content of a food menu page.
 */
type FoodMenuPageData = {
  /** Date when the page was last updated. */
  lastUpdated: Date;
  /** Localized page title (e.g. `"Plats"`). */
  title: LocalizedText;
  /** Menu items on the page. */
  items: {
    /** Localized item name. */
    name: LocalizedText;
    /** Localized item description as an array of localized texts. */
    description?: LocalizedTextArray;
    /** Numeric price in euros. */
    price?: number;
  }[];
  /** Footer content for the page (notes and general note). */
  footer: {
    /** Array of localized short notes. */
    notes?: LocalizedTextArray;
    /** A general localized note shown on the page. */
    generalNote?: LocalizedText;
  };
};

export { FoodMenuPageData };