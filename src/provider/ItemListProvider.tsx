import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Item } from '../types';

type ContextType = {
  itemList: Item[];
  setItemList: Dispatch<SetStateAction<Item[]>>;
  addItem: (text: string) => void;
  removeItem: (id: string) => void;
};

type ProviderType = {
  initialItems: Item[];
  children: ReactNode;
};

export const ItemListContext = createContext<ContextType | undefined>(
  undefined
);

export const ItemListProvider: FC<ProviderType> = (props) => {
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
