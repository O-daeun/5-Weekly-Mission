import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import * as S from './Search.styled';

interface SearchProps {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
}

export default function Search({ text, setText }: SearchProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  return (
    <S.Input
      placeholder='링크를 검색해 보세요.'
      value={text}
      onChange={handleChange}
    />
  );
}
