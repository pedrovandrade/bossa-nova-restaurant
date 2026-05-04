import { LocalizedText, LocalizedTextArray } from '@/types/LocalizedText';
import { useLocalized } from '@/hooks/language';
import { FC } from 'react';

type LocalizedTextDisplayProps = {
  localizedText: LocalizedText | LocalizedTextArray;
  className?: string;
};

const LocalizedTextDisplay: FC<LocalizedTextDisplayProps> = ({ localizedText, className }) => {
  const getLocalized = useLocalized();
  const text = getLocalized(localizedText) || '';

  const textParagraphs = typeof text === 'string' ? [text] : text;

  return (
    <div className={className}>
      {textParagraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
};

export default LocalizedTextDisplay;