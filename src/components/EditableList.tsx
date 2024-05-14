import { FC } from 'react';
import { EditStateProvider } from '../provider/EditStateProvider';
import { ItemListProvider } from '../provider/ItemListProvider';
import { EditableListInner } from './EditableListInner';
import { ItemList } from '../types';

type Props = {
  initialItemList: ItemList;
};

export const EditableList: FC<Props> = ({ initialItemList }) => {
  return (
    <ItemListProvider initialItems={initialItemList.items}>
      <EditStateProvider>
        <EditableListInner initialTitle={initialItemList.title} />
      </EditStateProvider>
    </ItemListProvider>
  );
};
