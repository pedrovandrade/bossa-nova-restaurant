import { MenuHeaderIcon } from '@/components/_icons';
import { useLocalized } from '@/hooks/language';
import { DrinkMenuPageData } from '@/types/DrinkMenuPageData';
import { FC } from 'react';

const DrinkMenuPage: FC<DrinkMenuPageData> = ({ title, items }) => {
  const getLocalized = useLocalized();

  return (
    <section className='flex flex-col justify-between w-full bg-white pl-10 md:pl-20 pr-10 md:pr-30 py-7 text-bossanova-cyan'>
      <div>
        <div className='flex justify-center max-h-20 mb-4'>
          <MenuHeaderIcon />
        </div>
        {/* Title */}
        <h1 className='text-4xl font-medium text-center mb-6 font-(family-name:--font-feeling-passionate)'>
          {getLocalized(title)}
        </h1>

        {/* Menu Items */}
        {items.map((item, index) => {
          const category = getLocalized(item.category);
          const note = item.note ? getLocalized(item.note.text) : '';
          const inline = item.inline || false;
          const noteIsInline = item.note?.inline || false;

          return (
            <section key={index} className='mb-8 tracking-wider'>
              <div className={`mb-4 ${noteIsInline ? 'flex gap-4': ''}`}>
                {/* Drink category name */}
                <h2 className='text-xl font-extrabold text-bossanova-orange uppercase tracking-widest'>
                  {category}
                </h2>
                {/* Category note, if any */}
                {note && (
                  <p className={[
                      'mt-1',
                      'text-sm',
                      item.note?.bold ? 'font-extrabold' : 'font-normal',
                    ].join(' ')}
                  >
                    {note}
                  </p>
                )}
              </div>
              <ul className={inline ? 'flex justify-between' : ''}>
                {item.drinks.map((drink, drinkIndex) => {
                  const { description, name, price } = drink;
                  const descriptionText = getLocalized(description?.text || {});
                  const descriptionPosition = description?.position || 'bottom';
                  const descriptionIsInline = descriptionPosition === 'inline';

                  let priceFormatted = '';
                  if (price) {
                    priceFormatted = price % 1 === 0 ? price.toFixed(0) : price.toFixed(2);
                  }

                  const drinkName = getLocalized(name.text);

                  return (
                    <li
                      key={drinkIndex}
                      className={[
                        'flex',
                        inline ? 'flex-row' : 'flex-col',
                      ].join(' ')}
                    >
                      <div
                        className={[
                          'text-base',
                          'tracking-wide',
                          'text-bossanova-cyan',
                          'flex',
                          inline ? 'gap-4' : 'justify-between w-full'
                        ].join(' ')}
                      >
                        {/* Drink name (and description if description is inline)*/}
                        {descriptionIsInline ?
                          <div>
                              <span className={name.bold ? 'font-extrabold' : ''}>
                              {drinkName}
                            </span>
                            {': '}
                            <span>{descriptionText}</span>
                          </div>
                          :
                          <span className={name.bold ? 'font-extrabold' : ''}>
                            {drinkName}
                          </span>
                        }
                        {/* Drink price */}
                        {price &&
                          <span className='font-extrabold'>
                            {priceFormatted} euros
                          </span>
                        }
                      </div>
                      {/* Drink description (if not inline) */}
                      {descriptionText && !descriptionIsInline &&
                        <p className={[
                            'my-1',
                            description?.bold ? 'font-extrabold' : 'font-normal',
                            description?.small ? 'text-xs' : 'text-sm',
                            descriptionPosition === 'top' ? 'order-first mb-0' : '',
                          ].join(' ')}
                        >
                          {descriptionText}
                        </p>
                      }
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </section>
  );
};

export default DrinkMenuPage;