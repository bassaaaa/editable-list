import { useContext } from 'react';
import { ItemListContext } from '../provider/ItemListProvider';

export const useItemListContext = () => {
  const context = useContext(ItemListContext);
  if (!context) {
    throw new Error(
      'useItemListContext must be used within an ItemListProvider'
    );
  }
  return context;
};
