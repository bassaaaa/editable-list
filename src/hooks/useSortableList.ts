import {
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useItemListContext } from './useItemListContext';

export const useSortableList = () => {
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

  return { sensors, handleDragEnd };
};
