// EditStateProvider.tsx
import { createContext, FC, useContext, useState, ReactNode } from 'react';

type EditStateContextType = {
  editingItemId: string | null;
  setEditingItemId: (id: string | null) => void;
};

type Props = {
  children: ReactNode;
};

const EditStateContext = createContext<EditStateContextType | undefined>(
  undefined
);

export const useEditStateContext = (): EditStateContextType => {
  const context = useContext(EditStateContext);
  if (!context) {
    throw new Error(
      'useEditStateContext must be used within an EditStateProvider'
    );
  }
  return context;
};

export const EditStateProvider: FC<Props> = ({ children }) => {
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  return (
    <EditStateContext.Provider value={{ editingItemId, setEditingItemId }}>
      {children}
    </EditStateContext.Provider>
  );
};
