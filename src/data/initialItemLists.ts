import { v4 as uuidv4 } from 'uuid';
import { ItemList } from '../types';

const list: string[][] = [
  ['アイテム1', 'アイテム2', 'アイテム3', 'アイテム4', 'アイテム5'],
  ['アイテム1', 'アイテム2', 'アイテム3', 'アイテム4'],
  [
    'アイテム1',
    'アイテム2',
    'アイテム3',
    'アイテム4',
    'アイテム5',
    'アイテム6',
  ],
];

export const initialItemLists: ItemList[] = list.map((items, index) => {
  return {
    id: uuidv4(),
    title: `リスト${index + 1}`,
    items: items.map((text) => {
      return {
        id: uuidv4(),
        text,
      };
    }),
  };
});
