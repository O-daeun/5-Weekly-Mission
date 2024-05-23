import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Profile from '../Profile/Profile';
import { UserContext } from '@/contexts/UserContext';
import Link from 'next/link';
import * as S from './Header.styled';
import logoImg from '@/public/images/logo.svg';
import { getUser } from '@/apis/api';

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  const $isSticky = router.pathname.includes('/folder');
  const [isVisibleKebabModal, setIsVisibleKebabModal] = useState(false);

  const handleProfileClick = () => {
    setIsVisibleKebabModal((prev) => !prev);
  };

  const handleLogout = async () => {
    localStorage.removeItem('accessToken');
    const nextUser = await getUser();
    setUser(nextUser);
    router.push('/');
  };

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
          <S.ProfileButton onClick={handleProfileClick}>
            <Profile user={user.email} src={user.image_source} $size='s' />
            {isVisibleKebabModal && (
              <S.LogoutButton onClick={handleLogout}>로그아웃</S.LogoutButton>
            )}
          </S.ProfileButton>
        ) : (
          <S.StyledButton link='/signin' text='로그인' />
        )}
      </S.Inner>
    </S.Header>
  );
}
