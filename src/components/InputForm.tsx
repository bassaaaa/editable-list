import { FC, SetStateAction, KeyboardEvent } from 'react';
import { ClickButton } from './ClickButton';

type Props = {
  placeholder: string;
  inputText: string;
  onChange: (event: { target: { value: SetStateAction<string> } }) => void;
  onClick: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
};

export const InputForm: FC<Props> = (props) => {
  const { placeholder, inputText, onChange, onClick, onKeyDown } = props;

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={inputText}
        className="input input-bordered input-sm w-full"
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <ClickButton onClick={onClick}>追加</ClickButton>
    </div>
  );
};
