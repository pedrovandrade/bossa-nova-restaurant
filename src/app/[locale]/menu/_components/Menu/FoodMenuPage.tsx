import { FC } from 'react';
import { MenuHeaderIcon } from '@/components/_icons';
import { useLocalized } from '@/hooks/language';
import type { FoodMenuPageData } from '@/app/_types/FoodMenuPageData';

const FoodMenuPage: FC<FoodMenuPageData> = ({ title, items, footer }) => {
  const getLocalized = useLocalized();
  const footerNotes: string[] = getLocalized(footer?.notes || {}) as string[] || [];
  const footerGeneralNote: string = getLocalized(footer?.generalNote || {}) as string || '';

  return (
    <section className="flex flex-col justify-between w-full bg-white pl-7 md:pl-20 pr-7 md:pr-30 py-7 text-bossanova-cyan">
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

            const itemName = getLocalized(item.name);

            return (
              <li key={index} className="py-4">
                <div className="flex justify-between text-xl font-extrabold uppercase tracking-widest text-bossanova-orange">
                  <span>{itemName}</span>
                  { price && <span>{priceFormatted} euros</span> }
                </div>
                {descriptionText}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer notes */}
      {(footerNotes?.length || footerGeneralNote) && (
        <div className="flex flex-col text-sm items-center mt-auto text-center">
          {footerNotes?.map((note, index) => (
            <div key={index} className="flex items-start text-bossanova-orange">
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

export default FoodMenuPage;