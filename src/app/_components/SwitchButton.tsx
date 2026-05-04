import { Switch } from 'radix-ui';
import { FC } from 'react';

type SwitchButtonProps = {
  defaultChecked?: boolean;
  label?: string;
  onCheckedChange: (checked: boolean) => void;
};

const SwitchButton: FC<SwitchButtonProps> = (props) => {
  const { defaultChecked, onCheckedChange, label } = props;
  return (
    <div className='flex items-center'>
      <Switch.Root
        className='w-8 h-5 mr-5 my-2 bg-gray-200 rounded-full relative hover:cursor-pointer data-[state=checked]:bg-teal-600'
        onCheckedChange={onCheckedChange}
        defaultChecked={defaultChecked || false}
      >
        <Switch.Thumb
          className='w-3 h-3 bg-white rounded-full absolute top-1 left-1 data-[state=checked]:translate-x-full transition-transform'
        />
      </Switch.Root>
      <label
        htmlFor=''
        className='text-base'
      >
        {label}
      </label>
    </div>
  );
};

export default SwitchButton;