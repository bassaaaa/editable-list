import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Item } from '../types';
import { useEditStateContext } from '../provider/EditStateProvider';
import { useItemListContext } from './useItemListContext';

export const useEditableText = (item: Item) => {
  const [text, setText] = useState<string>(item.text); // テキストの状態
  const { itemList, setItemList } = useItemListContext(); // アイテムリスト
  const { editingItemId, setEditingItemId } = useEditStateContext(); // 編集中のアイテムID
  const originalText = useRef(item.text); // 編集前のテキスト

  const isEditing = editingItemId === item.id;

  // 編集モードにする
  const handleEditButtonClick = (id: string) => {
    setEditingItemId(id);
  };

  // 名前を更新し、編集モードを終了
  const handleSaveButtonClick = (id: string) => {
    updateItemName(id);
    setEditingItemId(null);
    setText(text.trim() === '' ? originalText.current : text); // 空の場合は編集前のテキストに戻す
    originalText.current = text; // 編集前のテキストを更新
  };

  // アイテムの名前を更新
  const updateItemName = (id: string) => {
    const updatedItemList = itemList.map((i) =>
      i.id === id ? { ...i, text: text } : i
    );
    setItemList(updatedItemList);
  };

  // テキストフィールドの入力値が変更された時の処理
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  // Enterキーが押された時の処理
  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    handleSaveButtonClick(item.id);
  };

  // テキストフィールドにフォーカス
  const handleInputFocus = (input: HTMLInputElement | null) => {
    if (input && isEditing) {
      input.focus();
    }
  };

  // 編集中の項目以外がクリックされた時の処理
  const handleClickOutside = (event: MouseEvent) => {
    if (
      isEditing &&
      !event
        .composedPath()
        .some(
          (element) =>
            element === document.getElementById(`editable-${item.id}`)
        )
    ) {
      setText(originalText.current); // 編集前のテキストに戻す
      setEditingItemId(null); // 編集終了
    }
  };

  // 編集中の状態が変更された時の処理
  useEffect(() => {
    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside); // 編集中は外部クリックを監視
    } else {
      document.removeEventListener('mousedown', handleClickOutside); // 編集中でない場合は外部クリック監視を解除
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // コンポーネントがアンマウントされる時に外部クリック監視を解除
    };
  }, [isEditing]);

  return {
    text,
    isEditing,
    handleInputChange,
    handleInputKeyDown,
    handleInputFocus,
    handleEditButtonClick,
    handleSaveButtonClick,
  };
};
