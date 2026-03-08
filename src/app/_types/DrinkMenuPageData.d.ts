import { LocalizedText } from '@/types/LocalizedText';

/**
 * Represents the content of a drink menu page.
 */
type DrinkMenuPageData = {
  /** Date when the page was last updated. */
  lastUpdated: Date;
  /** Localized page title (e.g. "Boissons"). */
  title: LocalizedText;
  /** List of drink categories on the page. */
  items: {
    /** Localized category title (e.g. "Cocktails"). */
    category: LocalizedText;
    /** If true, the category should be rendered inline (compact). */
    inline?: boolean;
    /** Optional note for the category. */
    note?: {
      /** Localized note text content. */
      text: LocalizedText;
      /** Render the note inline (next to heading). */
      inline?: boolean;
      /** Render the note text bold. */
      bold?: boolean;
    };
    /** Drinks contained in this category. */
    drinks: {
      /** Drink name object. */
      name: {
        /** Localized drink name. */
        text: LocalizedText;
        /** Render the name in bold. */
        bold?: boolean;
      };
      /** Optional description for the drink. */
      description?: {
        /** Localized description text. */
        text: LocalizedText;
        /** Position of the description relative to the name/price: 'top' | 'bottom' | 'inline'. */
        position?: 'top' | 'bottom' | 'inline';
        /** Render the description in bold. */
        bold?: boolean;
        /** Render the description in a smaller font. */
        small?: boolean;
      };
      /** Numeric price in euros. */
      price?: number;
    }[];
  }[];
};

export { DrinkMenuPageData };