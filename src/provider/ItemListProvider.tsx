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
import { externalItemList } from '../externalItemList';

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
  const [itemList, setItemList] = useState<Item[]>(externalItemList);

  return (
    <ItemListContext.Provider value={{ itemList, setItemList }}>
      {children}
    </ItemListContext.Provider>
  );
};
