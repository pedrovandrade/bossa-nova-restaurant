import { LocalizedText } from '@/types/LocalizedText';
import { type FC, useState } from 'react';
import LocalizedTextDisplay from '../_utils/LocalizedTextDisplay';
import EditorBox from '../_utils/EditorBox';
import LocalizedTextInput from '../_utils/LocalizedTextInput';

type LocalizedTextEditorProps = {
  /** The default text for each locale.*/
  defaultText: LocalizedText;
  id: string;
  className?: string;
};

const LocalizedTextEditor: FC<LocalizedTextEditorProps> = ({ id, defaultText, className }) => {
  /* **** States **** */
  const [localizedText, setLocalizedText] = useState<LocalizedText>(defaultText);

  return (
    <EditorBox
      onConfirm={() => {
        setLocalizedText(localizedText);
      }}
      onCancel={() => setLocalizedText(defaultText)}
      readContent={
        <LocalizedTextDisplay
          className={className}
          localizedText={localizedText}
        />
      }
      editContent={
        <LocalizedTextInput
          localizedText={localizedText}
          id={id}
        />
      }
    />
  );
};

export default LocalizedTextEditor;