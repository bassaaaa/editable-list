import {
  FC,
  ChangeEvent,
  KeyboardEvent,
  useState,
  useEffect,
  useRef,
} from 'react';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { ClickButton } from './ClickButton';
import { useItemListContext } from '../provider/ItemListProvider';
import { useEditStateContext } from '../provider/EditStateProvider';
import { Item } from '../types';

type Props = {
  item: Item;
};

const useEditableText = (item: Item) => {
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

export const EditableText: FC<Props> = ({ item }) => {
  const {
    text,
    isEditing,
    handleInputChange,
    handleInputKeyDown,
    handleInputFocus,
    handleEditButtonClick,
    handleSaveButtonClick,
  } = useEditableText(item);

  return (
    <div
      id={`editable-${item.id}`}
      className="flex gap-2 m-2 items-center w-full min-w-0"
    >
      {isEditing ? (
        // 編集中の場合
        <>
          <input
            type="text"
            value={text}
            className="input input-bordered input-sm w-full"
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            ref={(input) => handleInputFocus(input)}
          />
          <ClickButton onClick={() => handleSaveButtonClick(item.id)}>
            <SaveRoundedIcon />
            保存
          </ClickButton>
        </>
      ) : (
        // 編集中でない場合
        <>
          <div className="w-full px-3 truncate">{text}</div>
          <ClickButton onClick={() => handleEditButtonClick(item.id)}>
            <EditRoundedIcon />
            編集
          </ClickButton>
        </>
      )}
    </div>
  );
};
