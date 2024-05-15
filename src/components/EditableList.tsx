import { FC } from 'react';
import { EditStateProvider } from '../provider/EditStateProvider';
import { ItemListProvider } from '../provider/ItemListProvider';
import { InputWithButton } from './InputWithButton';
import { SortableList } from './SortableList';
import { Item } from '../types';

type Props = {
  title: string;
  items: Item[];
};

export const EditableList: FC<Props> = ({ title, items }) => {
  return (
    <ItemListProvider initialItems={items}>
      <EditStateProvider>
        <div className="w-full p-6 bg-base-200 rounded-md mx-auto">
          <h1 className="text-2xl font-bold text-center mb-6">{title}</h1>
          <InputWithButton placeholder="追加する項目を入力" />
          <SortableList />
        </div>
      </EditStateProvider>
    </ItemListProvider>
  );
};
