import { v4 as uuidv4 } from 'uuid';
import { ItemList } from './types';

const list: string[] = [
  'アイテム1',
  'アイテム2',
  'アイテム3',
  'アイテム4',
  'アイテム5',
];

export const initialItemList: ItemList = {
  title: 'リストタイトル',
  items: list.map((text) => ({
    id: uuidv4(),
    text,
  })),
};
