import React, { useContext } from 'react';
import logoImg from '../../src/images/logo.svg';
import { UserContext } from '../../contexts/UserContext';
import Profile from '../Profile/Profile';
import * as S from './Header.styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Header() {
  const { user } = useContext(UserContext);
  console.log(user);

  const router = useRouter();

  const $isSticky = router.pathname !== '/folder';

  return (
    <S.Header $isSticky={$isSticky}>
      <S.Inner>
        <S.Logo>
          <Link href='/'>
            <Image
              src={logoImg}
              alt='linkbrary logo'
              width='133'
              height='24'
              sizes='(max-width: 767px) 89px, 133px'
              priority={true}
            />
          </Link>
        </S.Logo>
        {user ? (
          <Profile user={user.email} src={user.image_source} $size='s' />
        ) : (
          <S.StyledButton link='/signin' text='로그인' />
        )}
      </S.Inner>
    </S.Header>
  );
}
