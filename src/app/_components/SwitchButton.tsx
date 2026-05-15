import { Switch } from 'radix-ui';
import { FC } from 'react';

type SwitchButtonProps = {
  defaultChecked?: boolean;
  label?: string;
  id?: string;
  onCheckedChange: (checked: boolean) => void;
};

const SwitchButton: FC<SwitchButtonProps> = (props) => {
  const { defaultChecked, onCheckedChange, label, id = '' } = props;
  return (
    <div className='flex items-center'>
      <Switch.Root
        className='w-8 h-4 mr-5 my-2 bg-gray-200 border border-gray-500 rounded-full relative hover:cursor-pointer data-[state=checked]:bg-teal-600'
        onCheckedChange={onCheckedChange}
        defaultChecked={defaultChecked || false}
        id={id}
      >
        <Switch.Thumb
          className='w-3 h-3 bg-white border border-gray-500 rounded-full absolute top-[1px] left-0.5 data-[state=checked]:translate-x-full data-[state=checked]:left-1 transition-transform'
        />
      </Switch.Root>
      <label
        htmlFor={id}
        className='text-base'
      >
        {label}
      </label>
    </div>
  );
};

export default SwitchButton;