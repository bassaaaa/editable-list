// EditStateProvider.tsx
import { createContext, FC, useState, ReactNode } from 'react';

type ContextTypes = {
  editingItemId: string | null;
  setEditingItemId: (id: string | null) => void;
};

type ProviderTypes = {
  children: ReactNode;
};

export const EditStateContext = createContext<ContextTypes | undefined>(
  undefined
);

export const EditStateProvider: FC<ProviderTypes> = ({ children }) => {
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  return (
    <EditStateContext.Provider value={{ editingItemId, setEditingItemId }}>
      {children}
    </EditStateContext.Provider>
  );
};
