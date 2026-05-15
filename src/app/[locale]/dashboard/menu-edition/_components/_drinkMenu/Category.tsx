import { CurrentLocale, LocalizedText } from '@/types/LocalizedText';
import { FC, useState } from 'react';
import { CategoryEditionParams } from '../MenuEditor';
import EditorBox from '../_utils/EditorBox';
import LocalizedTextDisplay from '../_utils/LocalizedTextDisplay';
import LocalizedTextInput from '../_utils/LocalizedTextInput';
import SwitchButton from '@/components/SwitchButton';
import { useTranslations } from 'next-intl';

type NoteData = {
  text: LocalizedText;
  inline?: boolean;
  bold?: boolean;
};

type CategoryProps = {
  page: number;
  index: number;
  title: LocalizedText;
  inline?: boolean;
  id: string;
  note?: NoteData;
  onCategoryChange?: (params: CategoryEditionParams) => void;
};

const Category: FC<CategoryProps> = (props) => {
  const {
    page,
    index,
    title,
    inline = false,
    id,
    note,
    onCategoryChange,
  } = props;

  const [localizedTitle, setLocalizedTitle] = useState<LocalizedText>(title);
  const [noteData, setNoteData] = useState<NoteData | undefined>(note);

  const t = useTranslations('pages.dashboard.pages.menu');

  const handleConfirm = () => {
    const allTextsEmpty: boolean = Object.values(noteData?.text || {}).every(text => !text);
    const newNote = allTextsEmpty ? undefined : noteData;
    setNoteData(newNote);

    onCategoryChange?.({
      page,
      inline,
      categoryIndex: index,
      newTitle: localizedTitle,
      note: newNote,
    });
  };

  const handleCancel = () => {
    setLocalizedTitle(title);
  };

  const handleTitleChange = (locale: CurrentLocale, value: string) => {
    setLocalizedTitle((prev) => ({ ...prev, [locale]: value }));
  };

  const handleNoteTextChange = (locale: CurrentLocale, value: string) => {
    setNoteData((prev) => ({ ...prev, text: { ...prev?.text, [locale]: value } }));
  };

  const handleNoteInlineChange = (checked: boolean) => {
    setNoteData((prev) => prev ? { ...prev, inline: checked } : prev);
  };

  const handleNoteBoldChange = (checked: boolean) => {
    setNoteData((prev) => prev ? { ...prev, bold: checked } : prev);
  };

  const addNote = () => {
    if (!noteData) {
      setNoteData({
        text: { en: '', fr: '', pt: '' },
        bold: false,
        inline: false,
      })
    };
  };

  return (
    <EditorBox
      className='flex'
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      readContent={
        <div className={`mb-4 ${noteData?.inline ? 'flex gap-4': ''}`}>
          <LocalizedTextDisplay
            className='text-xl font-extrabold text-bossanova-orange uppercase tracking-widest'
            localizedText={localizedTitle}
          />
          {noteData && (
            <LocalizedTextDisplay
              className={`mt-1 text-sm ${noteData?.bold ? 'font-extrabold' : 'font-normal'}`}
              localizedText={noteData?.text}
            />
          )}
        </div>
      }
      editContent={
        <div>
          <div className={`mb-4 ${noteData?.inline ? 'flex': ''}`}>
            <LocalizedTextInput
              className='text-xl font-extrabold text-bossanova-orange uppercase tracking-widest'
              localizedText={title}
              id={id}
              onInputChange={handleTitleChange}
            />
            {noteData ? (
              <div className='w-full'>
                <LocalizedTextInput
                  className='grow text-sm h-9.5'
                  localizedText={noteData?.text}
                  bold={noteData?.bold}
                  id={`${id}-note`}
                  onInputChange={handleNoteTextChange}
                  showLabel={!noteData?.inline}
                />
                <div className='flex gap-4'>
                  <SwitchButton
                    label={t('editorBox.inline')}
                    onCheckedChange={handleNoteInlineChange}
                    defaultChecked={noteData?.inline}
                  />
                  <SwitchButton
                    label={t('editorBox.bold')}
                    onCheckedChange={handleNoteBoldChange}
                    defaultChecked={noteData?.bold}
                  />
                </div>
              </div>
            ) : (
              <div className='flex items-center gap-2 text-sm text-gray-500 italic'>
                <button
                  className='text-teal-600 hover:underline hover:cursor-pointer'
                  onClick={addNote}
                >
                  {t('drinkMenu.addCategoryNote')}
                </button>
              </div>
            )}
          </div>
        </div>
      }
    />
  );
};

export default Category;
