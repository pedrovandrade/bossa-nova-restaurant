import { LocalizedText } from '@/app/_types/LocalizedText';
import { FC, useState } from 'react';
import EditorBox from '../_utils/EditorBox';
import LocalizedTextDisplay from '../_utils/LocalizedTextDisplay';
import LocalizedTextInput, { ValidationType } from '../_utils/LocalizedTextInput';
import { TitleEditionParams } from '../MenuEditor';

type TitleProps = {
  /** The default text for each locale.*/
  currentText: LocalizedText;
  id: string;
  page: number;
  className?: string;
  onTitleChange?: (params: TitleEditionParams) => void;
};

const { NoEmptyFields } = ValidationType;

const Title: FC<TitleProps> = ({ id, page, currentText, className, onTitleChange }) => {
  /* **** States **** */
  const [localizedText, setLocalizedText] = useState<LocalizedText>(currentText);
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleConfirm = () => {
    setLocalizedText(localizedText);
    onTitleChange?.({ page, newTitle: localizedText });
  };

  const handleCancel = () => {
    setLocalizedText(currentText);
    setIsValid(true);
  };

  const handleTextChange = (locale: string, value: string) => {
    setLocalizedText((prev) => ({ ...prev, [locale]: value }));
  };

  const handleTextValidation = (errors: ValidationType[]) => {
    setIsValid(errors.length === 0);
  };

  return (
    <EditorBox
      className='flex justify-center'
      confirmationDisabled={!isValid}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      readContent={
        <LocalizedTextDisplay
          className={className}
          localizedText={localizedText}
        />
      }
      editContent={
        <LocalizedTextInput
          className={className}
          localizedText={localizedText}
          id={id}
          onInputChange={handleTextChange}
          validators={[NoEmptyFields]}
          onValidation={handleTextValidation}
        />
      }
    />
  );
};

export default Title;
