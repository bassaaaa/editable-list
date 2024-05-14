import { FC } from 'react';
import { ClickButton } from '../ClickButton';
import { useInputForm } from './hooks';

type Props = {
  placeholder: string;
};

export const InputForm: FC<Props> = ({ placeholder }) => {
  const { inputText, handleChange, handleKeyDown, handleAddItem } =
    useInputForm();

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
