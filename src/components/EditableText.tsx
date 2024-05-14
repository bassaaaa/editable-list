import { FC } from 'react';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { ClickButton } from './ClickButton';
import { Item } from '../types';
import { useEditableText } from '../hooks/useEditableText';

type Props = {
  item: Item;
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
