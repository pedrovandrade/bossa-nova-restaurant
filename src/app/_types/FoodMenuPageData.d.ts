/**
 * Represents the content of a food menu page.
 */
type FoodMenuPageData = {
  /** Localized page title (e.g. `"Plats"`). */
  title: LocalizedText;
  /** Category identifier for the page. */
  category: 'starters' | 'mainCourses' | 'desserts';
  /** Menu items on the page. */
  items: {
    /** Localized item name. */
    name: LocalizedText;
    /** Localized item description or array of localized texts. */
    description?: LocalizedText | LocalizedTextArray;
    /** Numeric price in euros, or null when not applicable. */
    price: number | null;
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