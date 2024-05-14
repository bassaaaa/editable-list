import { FC } from 'react';
import { EditableList } from './components/EditableList';
import { initialItemList } from './initialItemLists';

export const App: FC = () => {
  return <EditableList initialItemList={initialItemList} />;
};
