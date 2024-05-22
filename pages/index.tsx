import React, { useEffect } from 'react';
import Button from '../components/Button/Button';
import * as S from '../styles/HomePage.styled';

export default function HomePage() {
  return (
    <S.Wrap>
      <Button link='/shared/14' text='shared 페이지로 이동'></Button>
      <Button link='/folder' text='folder 페이지로 이동'></Button>
    </S.Wrap>
  );
}
