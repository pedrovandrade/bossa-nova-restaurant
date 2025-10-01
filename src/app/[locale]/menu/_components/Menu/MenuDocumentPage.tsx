import { FC } from 'react';
import { MenuHeaderIcon } from '@/app/_components/_icons';
import { LocalizedText, LocalizedTextArray } from "@/types/LocalizedText";
import { useLocalized } from '@/hooks/language';

// export type MenuDocumentPageProps = {
//   title: string;
//   category: 'starters' | 'mainCourses' | 'desserts' | 'beverages';
//   items: {
//     name: string;
//     description?: string | string[];
//     price: number | null;
//   }[];
//   footer: {
//     notes?: string[];
//     generalNote?: string;
//   };
// };
export type MenuDocumentPageProps = {
  title: LocalizedText;
  category: 'starters' | 'mainCourses' | 'desserts' | 'beverages';
  items: {
    name: string;
    description?: LocalizedText | LocalizedTextArray;
    price: number | null;
  }[];
  footer: {
    notes?: LocalizedTextArray;
    generalNote?: LocalizedText;
  };
};

const MenuDocumentPage: FC<MenuDocumentPageProps> = ({ title, items, footer }) => {
  const getLocalized = useLocalized();
  const footerNotes: string[] = getLocalized(footer?.notes || {}) as string[] || [];
  const footerGeneralNote: string = getLocalized(footer?.generalNote || {}) as string || '';

  return (
    <section className="flex flex-col justify-between w-full bg-white pl-10 md:pl-20 pr-10 md:pr-30 py-7 text-bossanova-cyan">
      <div>
        <div className='flex justify-center max-h-20 mb-4'>
          <MenuHeaderIcon />
        </div>
        {/* Title */}
        <h1 className="text-4xl font-medium text-center mb-6 font-(family-name:--font-feeling-passionate)">
          {getLocalized(title)}
        </h1>

        {/* Menu Items */}
        <ul className='tracking-wider'>
          {items.map((item, index) => {
            const description = getLocalized(item?.description || {});
            const descriptionParagraphs = typeof description === 'string'
              ? [description]
              : description || [];
            const descriptionText = descriptionParagraphs.map((paragraph, idx) => (
              <p key={idx} className="mt-2 text-base">{paragraph}</p>
            ));
            
            const { price } = item;
            let priceFormatted = '';
            if (price) {
              priceFormatted = price % 1 === 0 ? price.toFixed(0) : price.toFixed(2);
            }

            return (
              <li key={item.name + index} className="py-4">
                <div className="flex justify-between text-xl font-extrabold uppercase tracking-widest text-bossanova-orange">
                  <span>{item.name}</span>
                  { price && <span>{priceFormatted} euros</span> }
                </div>
                {descriptionText}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer Notes */}
      {/* {(footer?.notes?.length || footer?.generalNote) && (
        <div className="flex flex-col text-sm items-center mt-auto text-center">
          {footer.notes?.map((note, index) => (
            <div key={index} className="flex items-start">
              <span className="mr-2 font-bold">*</span>
              <span>{note}</span>
            </div>
          ))}
          {footer.generalNote && (
            <div className="mt-2 text-bossanova-cyan font-bold">{footer.generalNote}</div>
          )}
        </div>
      )} */}
      {(footerNotes?.length || footerGeneralNote) && (
        <div className="flex flex-col text-sm items-center mt-auto text-center">
          {footerNotes?.map((note, index) => (
            <div key={index} className="flex items-start">
              <span className="mr-2 font-bold">*</span>
              <span>{note}</span>
            </div>
          ))}
          {footer.generalNote && (
            <div className="mt-2 text-bossanova-cyan font-bold">{footerGeneralNote}</div>
          )}
        </div>
      )}
    </section>
  );
};

export default MenuDocumentPage;