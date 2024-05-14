import { v4 as uuidv4 } from 'uuid';

const list: string[] = [
  'アイテム1',
  'アイテム2',
  'アイテム3',
  'アイテム4',
  'アイテム5',
];

export const externalItemList = list.map((text) => {
  return {
    id: uuidv4(),
    text,
  };
});
