import { ButtonHTMLAttributes } from 'react';
import * as S from './Button.styled';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  link?: string;
}

export default function Button({ text, className = '', link }: Props) {
  return (
    <>
      {link ? (
        <S.StyledLink href={link} className={className}>
          {text}
        </S.StyledLink>
      ) : (
        <S.Button className={className}>{text}</S.Button>
      )}
    </>
  );
}
