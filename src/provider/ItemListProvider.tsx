import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { Item } from '../types';

type Props = {
  children: ReactNode;
};

export const ItemListContext = createContext(
  {} as {
    itemList: Item[];
    setItemList: Dispatch<SetStateAction<Item[]>>;
  }
);

export const useItemListContext = () => useContext(ItemListContext);

export const ItemListProvider: FC<Props> = ({ children }) => {
  const [itemList, setItemList] = useState<Item[]>([
    { id: 1, name: 'item 1' },
    { id: 2, name: 'item 2' },
    { id: 3, name: 'item 3' },
    { id: 4, name: 'item 4' },
    { id: 5, name: 'item 5' },
  ]);

  return (
    <ItemListContext.Provider value={{ itemList, setItemList }}>
      {children}
    </ItemListContext.Provider>
  );
};
