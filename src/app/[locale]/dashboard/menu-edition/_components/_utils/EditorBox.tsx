import { CheckMark, Cross, Pencil } from '@/components/_icons';
import { useTranslations } from 'next-intl';
import { useState, type FC, type ReactNode, type MouseEvent } from 'react';

type EditorBoxProps = {
  confirmationDisabled?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  onDelete?: () => void;
  readContent: ReactNode;
  editContent: ReactNode;
  className?: string;
};

const EditorBox: FC<EditorBoxProps> = ({
  confirmationDisabled = false,
  onConfirm,
  onCancel,
  onDelete,
  readContent,
  editContent,
  className
}) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const t = useTranslations('pages.dashboard.pages.menu.editorBox');

  const handleConfirm = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (onConfirm) {
      onConfirm();
    }
    setIsEditMode(false);
  };

  const handleCancel = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (onCancel) {
      onCancel();
    }
    setIsEditMode(false);
  };

  const onEditionSelection = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsEditMode(true);
  };

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (onDelete) {
      onDelete();
    }
  };

  return (
    isEditMode ? (
      <div className='bg-gray-50 p-4 rounded-md border border-gray-200 w-full'>
        { editContent }
        <div className='flex gap-4 pt-2'>
          <button
            disabled={confirmationDisabled}
            className={[
                'inline-flex',
                'h-8',
                'rounded-md',
                'text-teal-600',
                'hover:cursor-pointer',
                'hover:bg-gray-200',
                'focus:ring-2',
                'focus:ring-bossanova-cyan',
                'focus:ring-opacity-50',
                'disabled:text-gray-400',
                'disabled:hover:bg-transparent',
                'disabled:cursor-not-allowed',
                'disabled:focus:ring-gray-400',
                'disabled:focus:ring-opacity-50',
              ].join(' ')
            }
            onClick={handleConfirm}
          >
            <span className='p-1.5 w-8'>
              <CheckMark />
            </span>
            <span className='px-5'>
              {t('confirm')}
            </span>
          </button>
          <button
            className={[
              'inline-flex',
              'h-8',
              'rounded-md',
              'text-red-500',
              'hover:bg-gray-200',
              'hover:cursor-pointer',
              'focus:ring-2',
              'focus:ring-gray-400',
              'focus:ring-opacity-50',
            ].join(' ')}
            onClick={handleCancel}
          >
            <span className='w-8'>
              <Cross />
            </span>
            <span className='px-5'>
              {t('cancel')}
            </span>
          </button>
        </div>
      </div>
  ) : (
      <div className={'border border-dashed border-gray-200 ' + className || ''}>
        { readContent }
        <div className='flex'>
          {/* Edition button */}
          <button
            type='button'
            className={[
                'p-1',
                'h-8',
                'min-h-8',
                'w-8',
                'min-w-8',
                'rounded-md',
                'text-gray-400',
                'hover:text-gray-700',
                'hover:cursor-pointer',
                'hover:bg-gray-100',
                'focus:outline-none',
                'focus:ring-2',
                'focus:ring-bossanova-cyan',
                'focus:ring-opacity-50',
              ].join(' ')
            }
            aria-label={t('edit')}
            onClick={onEditionSelection}
          >
            <Pencil />
          </button>

          {/* Delete button (if there is a delete function) */}
          {onDelete &&
            <button
              type='button'
              className={[
                  'p-1',
                  'h-8',
                  'min-h-8',
                  'w-8',
                  'min-w-8',
                  'rounded-md',
                  'text-red-300',
                  'hover:text-red-700',
                  'hover:cursor-pointer',
                  'hover:bg-gray-100',
                  'focus:outline-none',
                  'focus:ring-2',
                  'focus:ring-gray-400',
                  'focus:ring-opacity-50',
                ].join(' ')
              }
              aria-label={t('delete')}
              onClick={handleDelete}
            >
              <Cross />
            </button>
          }
        </div>
      </div>
  )
  );
};

export default EditorBox;