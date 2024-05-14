import { FC } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { InputForm } from './InputForm';
import { SortableItem } from './ListItem';
import { useItemListContext } from '../hooks/useItemListContext';

type Props = {
  initialTitle: string;
};

export const EditableListInner: FC<Props> = ({ initialTitle }) => {
  const { itemList, setItemList } = useItemListContext();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = itemList.findIndex((v) => v.id === active.id);
      const newIndex = itemList.findIndex((v) => v.id === over.id);
      setItemList(arrayMove(itemList, oldIndex, newIndex));
    }
  };

  return (
    <div className="w-full p-6 bg-base-200 rounded-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">{initialTitle}</h1>
      <InputForm placeholder="追加する項目を入力" />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]} // 垂直軸のみに動きを制限
      >
        <SortableContext
          items={itemList}
          strategy={verticalListSortingStrategy}
        >
          <ul className="flex flex-col gap-2 w-full mx-auto mt-2">
            {itemList.map((item) => (
              <SortableItem key={item.id} item={item} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
};
