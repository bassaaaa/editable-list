import { FC, ChangeEvent, useState } from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { ClickButton } from "./ClickButton";
import { useItemListContext } from "../provider/ItemListProvider";
import { Item } from "../types";

type Props = {
  item: Item;
};

export const EditableText: FC<Props> = (props) => {
  const { item } = props;
  const [text, setText] = useState<string>(item.text);
  const [editing, setEditing] = useState<boolean>(false);
  const { itemList, setItemList } = useItemListContext();

  const onClickEdit = (id: string) => {
    setEditing((prev) => !prev);
    const newItemList = [...itemList];
    const itemToUpdate = newItemList.find((item) => item.id === id);
    if (itemToUpdate) {
      itemToUpdate.text = text;
    }
    setItemList(newItemList);
    console.log(itemList);
  };

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return; // Enter以外は何もしない
    event.preventDefault(); // Enterキーが押されたときにページがリロードされたり、inputが実行されることを防止
    onClickEdit(item.id);
  };

  // editボタンを押したらinputにフォーカス
  const handleRef = (input: HTMLInputElement | null) => {
    if (input && editing) {
      input.focus();
    }
  };

  return (
    <div className="flex gap-2 m-2 items-center w-full min-w-0">
      {editing ? (
        <>
          <input
            type="text"
            value={text}
            className="input input-bordered input-sm w-full"
            onChange={(event) => onChangeInput(event)}
            onKeyDown={(event) => onInputKeyDown(event)}
            ref={handleRef}
          />
          <ClickButton onClick={() => onClickEdit(item.id)}>
            <SaveRoundedIcon />
            保存
          </ClickButton>
        </>
      ) : (
        <>
          <div className="w-full px-3 truncate">{text}</div>
          <ClickButton onClick={() => onClickEdit(item.id)}>
            <EditRoundedIcon />
            編集
          </ClickButton>
        </>
      )}
    </div>
  );
};
