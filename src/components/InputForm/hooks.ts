import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useItemListContext } from '../../provider/ItemListProvider';

export const useInputForm = () => {
  const [inputText, setInputText] = useState<string>('');
  const { addItem } = useItemListContext();

  // 入力フォームの変更を処理する
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  // 新しい項目を追加する
  const handleAddItem = () => {
    if (inputText.trim() === '') return; // 空の入力を防止
    addItem(inputText);
    setInputText('');
  };

  // Enterキーが押されたときにも項目を追加する
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return; // Enter以外は何もしない
    event.preventDefault(); // Enterキーが押されたときにページがリロードされたり、inputが実行されることを防止
    handleAddItem();
  };

  return {
    inputText,
    setInputText,
    handleChange,
    handleKeyDown,
    handleAddItem,
  };
};
