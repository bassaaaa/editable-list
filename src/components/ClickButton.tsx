import { FC, ReactNode } from 'react';

type Props = {
  onClick: () => void;
  children: ReactNode;
};

export const ClickButton: FC<Props> = (props: Props) => {
  const { onClick, children } = props;

  return (
    <button
      className="btn btn-outline btn-sm min-w-0 bg-base-100"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
