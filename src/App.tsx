import { FC, useState, SetStateAction, KeyboardEvent } from 'react';
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

  const onChangeInput = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputText(event.target.value);
  };

  const onClickInputButton = () => {
    if (inputText === '') return;
    const newItem: Item = {
      id: new Date().getTime(),
      name: inputText,
    };
    const newitemList = [...itemList, newItem];
    setItemList(newitemList);
    setInputText('');
  };

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return; // Enter以外は何もしない
    event.preventDefault(); // Enterキーが押されたときにページがリロードされたり、inputが実行されることを防止
    onClickInputButton();
  };

  return (
    <div className="max-w-lg p-4">
      <InputForm
        placeholder="追加する項目を入力"
        inputText={inputText}
        onChange={(event) => onChangeInput(event)}
        onClick={onClickInputButton}
        onKeyDown={(event) => onInputKeyDown(event)}
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
