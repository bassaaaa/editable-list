import { FC } from 'react';
import { Button } from '../../types/button';

export const ButtonBase: FC<Button> = ({
  onClick,
  children,
  addStyle = '',
}) => {
  return (
    <button
      className={`btn btn-sm min-w-0 bg-base-100 ${addStyle}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
