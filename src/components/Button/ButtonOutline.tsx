import { FC } from 'react';
import { Button } from '../../types/button';
import { ButtonBase } from './ButtonBase';

export const ButtonOutline: FC<Button> = ({ onClick, children }) => {
  return (
    <ButtonBase onClick={onClick} addStyle="btn-outline">
      {children}
    </ButtonBase>
  );
};
