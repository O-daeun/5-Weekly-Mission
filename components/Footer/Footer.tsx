import Link from 'next/link';
import FooterSnsItem from './FooterSnsItem';
import * as S from './Footer.styled';

const SNS_LIST = [
  {
    id: 1,
    name: 'facebook',
    url: 'https://www.facebook.com/',
  },
  {
    id: 2,
    name: 'twitter',
    url: 'https://twitter.com/',
  },
  {
    id: 3,
    name: 'youtube',
    url: 'https://www.youtube.com/',
  },
  {
    id: 4,
    name: 'instagram',
    url: 'https://www.instagram.com/',
  },
];

export default function Footer() {
  return (
    <S.Footer>
      <S.Inner>
        <S.Address>©codeit - 2023</S.Address>
        <S.NavList>
          <li>
            <Link href='/privacy'>Privacy Policy</Link>
          </li>
          <li>
            <Link href='/faq'>FAQ</Link>
          </li>
        </S.NavList>
        <S.SnsList>
          {SNS_LIST.map((sns) => (
            <FooterSnsItem
              key={sns.id}
              id={sns.id}
              name={sns.name}
              url={sns.url}
            />
          ))}
        </S.SnsList>
      </S.Inner>
    </S.Footer>
  );
}
