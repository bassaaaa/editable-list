import { ReactNode } from 'react';

export type Button = {
  onClick: () => void;
  children: ReactNode;
  addStyle?: string;
};
