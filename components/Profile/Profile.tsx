import Image from 'next/image';
import * as S from './Profile.styled';
import profileInit from '@/public/images/profile_init.png';

interface Props {
  user: string | undefined;
  src: string | undefined;
  $size?: string;
  $flextype?: string;
}

export default function Profile({
  user,
  src,
  $size = 's',
  $flextype = 'row',
}: Props) {
  return (
    <S.Wrap $flextype={$flextype}>
      <S.ImgBox $size={$size}>
        <Image
          src={src ? src : profileInit}
          alt='프로필 이미지'
          width={60}
          height={60}
        />
      </S.ImgBox>
      <S.Text $flextype={$flextype}>{user}</S.Text>
    </S.Wrap>
  );
}
