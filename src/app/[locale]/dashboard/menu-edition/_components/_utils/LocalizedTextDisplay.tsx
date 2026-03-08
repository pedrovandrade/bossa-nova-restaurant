import { LocalizedText } from '@/types/LocalizedText';
import { useLocalized } from '@/hooks/language';
import { FC } from 'react';

type LocalizedTextDisplayProps = {
  localizedText: LocalizedText;
  className?: string;
};

const LocalizedTextDisplay: FC<LocalizedTextDisplayProps> = ({ localizedText, className }) => {
  const getLocalized = useLocalized();

  return (
    <div className={className}>
      <p>{getLocalized(localizedText) || ''}</p>
    </div>
  );
};

export default LocalizedTextDisplay;