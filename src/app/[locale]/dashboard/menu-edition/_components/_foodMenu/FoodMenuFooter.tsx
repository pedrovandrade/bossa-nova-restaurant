import { FC, useState } from 'react';
import LocalizedTextInput from '../_utils/LocalizedTextInput';
import { LocalizedText, CurrentLocale } from '@/types/LocalizedText';
import LocalizedTextDisplay from '../_utils/LocalizedTextDisplay';
import EditorBox from '../_utils/EditorBox';
import {
  defaultLocalizedText,
  localizedTextArraysToText,
  localizedTextToTextArrays,
} from '../_utils/localizedTextService';
import { FoodFooterEditionParams } from '../MenuEditor';

type FoodMenuFooterProps = {
  page: number;
  footerData: Omit<FoodFooterEditionParams, 'page'>;
  onChange?: (params: FoodFooterEditionParams) => void;
};

const FoodMenuFooter: FC<FoodMenuFooterProps> = (props) => {
  const {
    page,
    footerData,
    onChange,
  } = props;

  const [footerNotes, setFooterNotes] = useState<LocalizedText | undefined>(
    footerData?.notes && localizedTextArraysToText(footerData.notes)
  );
  const [footerGeneralNote, setFooterGeneralNote] = useState<LocalizedText | undefined>(
    footerData?.generalNote
  );

  /** ------------------- Handlers ------------------- */
  /** ------------------------------------------------ */

  /** ************ Footer's notes ************ */
  const handleNotesChange = (locale: CurrentLocale, value: string) => {
    setFooterNotes({...footerNotes, [locale]: value});
  };
  
  /** ************ Footer's general note ************ */
  const handleGeneralNoteChange = (locale: CurrentLocale, value: string) => {
    setFooterGeneralNote({...footerGeneralNote, [locale]: value});
  };

  /** ************ Form actions ************ */
  const handleConfirm = () => {
    const footerNotesArrays = footerNotes && localizedTextToTextArrays(footerNotes);
    onChange?.({
      page,
      notes: footerNotesArrays,
      generalNote: footerGeneralNote,
    });
  };

  /**
   * Reset all states to initial value.
   */
  const handleCancel = () => {
    const initFooterNotes = footerData?.notes && localizedTextArraysToText(footerData.notes);
    const initFooterGeneralNote = footerData?.generalNote;

    setFooterNotes(initFooterNotes);
    setFooterGeneralNote(initFooterGeneralNote);
  };

  return (
    <EditorBox
      className='flex'
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      readContent={
        <div className='flex flex-col grow text-sm items-center mt-auto text-center'>
          {footerData.notes
            ? <LocalizedTextDisplay
                className='flex flex-col text-bossanova-orange'
                localizedText={footerData.notes}
              />
            : <p className='text-gray-400'>No footer note</p>
          }
          {footerData.generalNote
            ? <LocalizedTextDisplay
                className='mt-2 text-bossanova-cyan font-bold'
                localizedText={footerData.generalNote}
              />
            : <p className='text-gray-400'>No general footer note</p>
          }
        </div>
      }
      editContent={
        <div className='text-sm flex flex-col gap-2'>

          <fieldset>
            <legend className='text-lg ml-10'>
              Footer notes
            </legend>
            {footerNotes
              ? <LocalizedTextInput
                className='text-bossanova-orange text-center'
                localizedText={footerNotes}
                id={`food-menu-item-${page}-footer-notes`}
                textCenter={true}
                multiline={true}
                onInputChange={handleNotesChange}
              />
              : <button
                  type='button'
                  className=''
                  onClick={() => setFooterNotes(defaultLocalizedText)}
                >
                  Add footer notes
                </button>
            }
          </fieldset>

          <fieldset>
            <legend className='text-lg ml-10'>
              General footer note
            </legend>
            {footerGeneralNote
              ? <LocalizedTextInput
                  className='text-bossanova-cyan font-bold'
                  localizedText={footerGeneralNote}
                  id={`food-menu-item-${page}-footer-general-note`}
                  textCenter={true}
                  onInputChange={handleGeneralNoteChange}
                />
              : <button
                  type='button'
                  className=''
                  onClick={() => setFooterGeneralNote(defaultLocalizedText)}
                >
                  Add footer general note
                </button>
            }
          </fieldset>

        </div>
      }
    />
  );
};

export default FoodMenuFooter;