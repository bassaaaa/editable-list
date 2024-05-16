import { FC } from 'react';
import { Button } from '../../types/button';
import { ButtonBase } from './ButtonBase';

export const ButtonGhost: FC<Button> = ({ onClick, children }) => {
  return (
    <ButtonBase onClick={onClick} addStyle="btn-ghost px-1">
      {children}
    </ButtonBase>
  );
};
