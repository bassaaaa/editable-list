import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Item } from '../types';

type Props = {
  initialItems: Item[];
  children: ReactNode;
};

export const ItemListContext = createContext(
  {} as {
    itemList: Item[];
    setItemList: Dispatch<SetStateAction<Item[]>>;
    addItem: (text: string) => void;
    removeItem: (id: string) => void;
  }
);

export const useItemListContext = () => {
  const context = useContext(ItemListContext);
  if (!context) {
    throw new Error(
      'useItemLListContext must be used within an ItemListProvider'
    );
  }
  return context;
};

export const ItemListProvider: FC<Props> = (props) => {
  const { initialItems, children } = props;
  const [itemList, setItemList] = useState<Item[]>(initialItems);
  const addItem = (text: string) => {
    const newItem: Item = {
      id: uuidv4(),
      text,
    };
    setItemList([...itemList, newItem]);
  };
  const removeItem = (id: string) =>
    setItemList(itemList.filter((item) => item.id !== id));

  return (
    <ItemListContext.Provider
      value={{ itemList, setItemList, addItem, removeItem }}
    >
      {children}
    </ItemListContext.Provider>
  );
};
