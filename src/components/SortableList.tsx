import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { FC } from 'react';
import { SortableListItem } from './SortableListItem';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { useSortableList } from '../hooks/useSortableList';
import { useItemListContext } from '../hooks/useItemListContext';

export const SortableList: FC = () => {
  const { sensors, handleDragEnd } = useSortableList();
  const { itemList } = useItemListContext();

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]} // 垂直軸のみに動きを制限
    >
      <SortableContext items={itemList} strategy={verticalListSortingStrategy}>
        <ul className="flex flex-col gap-2 w-full mx-auto mt-2">
          {itemList.map((item) => (
            <SortableListItem key={item.id} item={item} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};
