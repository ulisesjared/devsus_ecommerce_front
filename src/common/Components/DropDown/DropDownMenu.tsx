import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { type FC, type ReactNode } from 'react';
import { Icons } from '../../Constants/Icons';

export interface DropDownInterface {
  title: string;
  icon: ReactNode;
  onPress?: () => void;
  color?: string
}
//⋮
export const CustomDropdownMenu: FC<{ data: DropDownInterface[] }> = ({ data }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="absolute top-2 right-2 size-8 btn-primary total-center">
          <Icons.Dots />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        className="z-50 min-w-[150px] bg-white shadow-md rounded-md p-1 appear"
        sideOffset={5}
      >
        {
          data.map((d) => (
            <DropdownMenu.Item
              key={d.title}
              onSelect={d.onPress}
              className="px-3 py-2 text-sm rounded-md hover:bg-slate-100 flex items-center gap-2 cursor-pointer"
            >
              {d.icon}
              {d.title}
            </DropdownMenu.Item>
          ))
        }
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
