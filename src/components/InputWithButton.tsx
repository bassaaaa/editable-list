import { FC } from 'react';
import { useInputWithButton } from '../hooks/useInputWithButton';
import { ClickButton } from './ClickButton';

type Props = {
  placeholder: string;
};

export const InputWithButton: FC<Props> = ({ placeholder }) => {
  const { inputText, handleChange, handleKeyDown, handleAddItem } =
    useInputWithButton();

  return (
    <div className="flex gap-2">
      <input
        type="text"
        className="input input-bordered input-sm w-full"
        placeholder={placeholder}
        value={inputText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <ClickButton onClick={handleAddItem}>追加</ClickButton>
    </div>
  );
};
