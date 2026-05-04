'use client';

import { FC, FormEventHandler, PropsWithChildren, useState } from 'react';
import { createToaster, Portal, Toast, Toaster } from '@ark-ui/react';
import { AlertCircleIcon, CheckMark, Cross, LoaderIcon } from '@/components/_icons';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

type DashboardFormProps = PropsWithChildren & {
  onSubmit: () => Promise<void>;
  hasErrors?: boolean;
};

const toaster = createToaster({
  overlap: true,
  placement: 'bottom-end',
  gap: 16,
  // duration: Infinity,
});

const DashboardForm: FC<DashboardFormProps> = (props) => {
  const { children, onSubmit, hasErrors } = props;

  const router = useRouter();
  const currentLocale = useLocale();

  const getIcon = (type: string | undefined) => {
    switch (type) {
      case 'loading':
        return <LoaderIcon data-type='loading' />
      case 'success':
        return <CheckMark />
      case 'error':
        return <AlertCircleIcon />
      default:
        return null
    }
  }

  const [saving, setSaving] = useState(false);

  const t = useTranslations('pages.dashboard.form');

  const submitForm = async () => {
    try {
      await onSubmit();
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (hasErrors) return;

    setSaving(true);

    toaster.promise(submitForm, {
      loading: {
        title: t('toast.loading.title'),
        description: t('toast.loading.description'),
      },
      success: {
        title: t('toast.success.title'),
        description: t('toast.success.description'),
      },
      error: {
        title: t('toast.error.title'),
        description: t('toast.error.description'),
      },
    })
  };

  function cancelChanges() {
    router.push(`/${currentLocale ?? 'fr'}/dashboard`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='text-bossanova-cyan flex flex-col gap-7 w-full max-w-5xl mb-5 mx-auto'
    >
      {children}
      <div className='sticky bg-white bottom-0 w-full h-20 px-10 shadow-[0_-5px_10px_rgba(0,0,0,0.25)]'>
        <div className='flex gap-15 absolute right-10 top-1/2 -translate-y-1/2'>
          <button
            type='submit'
            className={[
              'bg-bossanova-cyan',
              'text-white',
              'px-6',
              'py-2',
              'rounded-md',
              'hover:cursor-pointer',
              'hover:bg-bossanova-green',
              'focus:ring-2',
              'focus:ring-bossanova-cyan',
              'focus:ring-opacity-50',
              'disabled:opacity-50',
              'disabled:hover:cursor-not-allowed',
              'disabled:hover:bg-bossanova-cyan'
            ].join(' ')}
            disabled={hasErrors || saving}
          >
            {saving
              ? (
                <div className='flex gap-3'>
                  <span className='h-6 w-6'><LoaderIcon/></span>
                  <span>{t('saving')}</span>
                </div>
              ) : t('saveChanges')
            }
            
          </button>
          <button
            type='button'
            className={[
              'bg-bossanova-cyan',
              'text-white',
              'px-6',
              'py-2',
              'rounded-md',
              'hover:cursor-pointer',
              'hover:bg-bossanova-green',
              'focus:ring-2',
              'focus:ring-bossanova-cyan',
              'focus:ring-opacity-50',
              'disabled:opacity-50',
              'disabled:hover:cursor-not-allowed',
              'disabled:hover:bg-bossanova-cyan',
            ].join(' ')}
            disabled={saving}
            onClick={cancelChanges}
          >
            {t('discardChanges')}
          </button>
        </div>
      </div>

      <Portal>
        <Toaster toaster={toaster}>
          {(toast) => (
            <Toast.Root
              key={toast.id}
              className={[
                'w-full',
                'min-w-60',
                'flex',
                'flex-col',
                'text-xl',
                'items-start',
                'bg-cyan-900',
                'text-slate-200',
                'px-8 py-4',
                'rounded-lg',
                'shadow-[-5px_5px_5px_rgba(0,0,0,0.25)]',
                'transform',
                'translate-x-4',
                'opacity-0',
                'data-[state=open]:translate-x-0',
                'data-[state=open]:opacity-100',
                'data-[state=closed]:translate-x-4',
                'data-[state=closed]:opacity-0',
                'transition-all',
                (toast.type === 'loading' && 'bg-cyan-900')
                  || (toast.type === 'success' && 'bg-emerald-900')
                  || (toast.type === 'error' && 'bg-red-900')
                  || '',
              ].join(' ')}
              style={{
                transitionDuration: 'var(--ark-toast-duration, 300ms)',
                transitionTimingFunction: 'var(--ark-toast-easing, cubic-bezier(0.2, 0, 0, 1))',
              }}
            >
              <Toast.Title
                className='flex items-center mb-6 font-semibold'
              >
                <div className='h-7 w-7 flex items-center px-1.5'>
                  {getIcon(toast.type)}
                </div>
                {toast.title}
              </Toast.Title>
              <Toast.Description className='m-0'>
                {toast.description}
              </Toast.Description>
              <Toast.CloseTrigger className='absolute h-5 w-5 right-2 top-2 hover:cursor-pointer'>
                <Cross />
              </Toast.CloseTrigger>
            </Toast.Root>
          )}
        </Toaster>
      </Portal>

    </form>
  );
};

export default DashboardForm;