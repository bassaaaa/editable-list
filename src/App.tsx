import { FC, useState, ChangeEvent, KeyboardEvent } from 'react';
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
import { SortableItem } from './components/SortableItem';
import { Item } from './types';
import { InputForm } from './components/InputForm';
import { useItemListContext } from './provider/ItemListProvider';
import { v4 as uuidv4 } from 'uuid';

export const App: FC = () => {
  const [inputText, setInputText] = useState<string>('');
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

  // 入力フォームの変更を処理する
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  // 新しい項目を追加する
  const handleAddItem = () => {
    if (inputText.trim() === '') return; // 空の入力を防止
    const newItem: Item = {
      id: uuidv4(),
      name: inputText.trim(),
    };
    setItemList((prevItemList) => [...prevItemList, newItem]);
    setInputText('');
  };

  // Enterキーが押されたときにも項目を追加する
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return; // Enter以外は何もしない
    event.preventDefault(); // Enterキーが押されたときにページがリロードされたり、inputが実行されることを防止
    handleAddItem();
  };

  return (
    <div className="max-w-screen-lg p-4 bg-base-200 rounded-md mx-auto">
      <InputForm
        placeholder="追加する項目を入力"
        inputText={inputText}
        onChange={handleChange}
        onClick={handleAddItem}
        onKeyDown={handleKeyDown}
      />
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
