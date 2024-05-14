export type Item = {
  id: string;
  text: string;
};

export type ItemList = {
  id: string;
  title: string;
  items: Item[];
};
