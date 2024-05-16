import { FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Item } from '../types';
import DragHandleRoundedIcon from '@mui/icons-material/DragHandleRounded';
import { EditableText } from './EditableText';
import { useItemListContext } from '../hooks/useItemListContext';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { ButtonGhost } from './Button/ButtonGhost';

type Props = {
  item: Item;
};

export const SortableListItem: FC<Props> = ({ item }) => {
  const { removeItem } = useItemListContext();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({ id: item.id });

  return (
    <div
      className="flex border bg-base-100 rounded-md p-2 items-center min-w-full"
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      {/* 並べ替えアイコン */}
      <div ref={setActivatorNodeRef} {...attributes} {...listeners}>
        <DragHandleRoundedIcon className="cursor-move" />
      </div>
      <div className="flex pl-2 w-full items-center min-w-0">
        <EditableText item={item} />
        <ButtonGhost onClick={() => removeItem(item.id)}>
          <DeleteRoundedIcon />
        </ButtonGhost>
      </div>
    </div>
  );
};
