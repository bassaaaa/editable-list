import { FC } from 'react';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { Item } from '../types';
import { useEditableText } from '../hooks/useEditableText';
import { ButtonGhost } from './Button/ButtonGhost';

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
          <ButtonGhost onClick={() => handleSaveButtonClick(item.id)}>
            <SaveRoundedIcon />
          </ButtonGhost>
        </>
      ) : (
        // 編集中でない場合
        <>
          <div className="w-full px-3 truncate">{text}</div>
          <ButtonGhost onClick={() => handleEditButtonClick(item.id)}>
            <EditRoundedIcon />
          </ButtonGhost>
        </>
      )}
    </div>
  );
};
