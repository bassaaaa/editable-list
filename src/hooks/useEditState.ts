import { useContext } from 'react';
import { EditStateContext } from '../provider/EditStateProvider';

export const useEditStateContext = () => {
  const context = useContext(EditStateContext);
  if (!context) {
    throw new Error(
      'useEditStateContext must be used within an EditStateProvider'
    );
  }
  return context;
};
