import { FC } from 'react';
import { EditableList } from './components/EditableList';
import { initialItemLists } from './initialItemLists';

export const App: FC = () => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 sm:p-2 md:p-6 mx-auto">
      {initialItemLists.map((initialItemList) => (
        <EditableList
          key={initialItemList.id}
          initialItemList={initialItemList}
        />
      ))}
    </div>
  );
};
