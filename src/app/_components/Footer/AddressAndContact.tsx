import { useTranslations } from 'next-intl';

const AddressAndContact = () => {
  const t = useTranslations('footer.contact');

  return (
    <div className='space-y-2'>
      <p>{t('address')}</p>
      <p>{t('phone')} <a href='tel:+33567686479'>+33 5 67 68 64 79</a></p>
      <p>{t('email')} <a href='mailto:bossanovatoulouse@gmail.com'>bossanovatoulouse@gmail.com</a></p>
    </div>
  )
};

export default AddressAndContact;