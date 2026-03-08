import { FC } from 'react';
import MenuEditor from './_components/MenuEditor';

const MenuEditionPage: FC = () => {
  return (
    <div className='py-8 w-full'>
      <h1 className='text-4xl font-bold mb-4 flex justify-center'>Menu edition</h1>
      <MenuEditor />
    </div>
  );
};

export default MenuEditionPage;