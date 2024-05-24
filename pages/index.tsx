import Image from 'next/image';
import * as S from '@/styles/HomePage.styled';
import MainImage from '@/public/images/main_bg.png';
import Section1Image from '@/public/images/section1.png';
import Section2Image from '@/public/images/section2.png';
import Section3Image from '@/public/images/section3.png';
import Section4Image from '@/public/images/section4.png';
import { BrInPC } from '@/styles/CommonPage.styled';

const GRADIENT_COLORS = {
  article1: 'linear-gradient(95.63deg, #fe8a8a 1.72%, #a4ceff 98.97%)',
  article2: 'linear-gradient(277.01deg, #6fbaff 13.22%, #ffd88b 94.66%)',
  article3:
    'linear-gradient(99.5deg, #6d7ccd 53.76%, rgba(82, 136, 133, 0.22) 125.69%)',
  article4: 'linear-gradient(271.36deg, #fe578f -50.84%, #68e8f9 51.18%)',
};

export default function HomePage() {
  return (
    <>
      <S.Main>
        <S.MainInner>
          <S.MainText>
            <S.MainTextGradient>세상의 모든 정보</S.MainTextGradient>를 <br />
            쉽게 저장하고 <br />
            관리해 보세요
          </S.MainText>
          <S.LinkButton link='/folder' text='링크 추가하기' />
          <S.MainImage
            src={MainImage}
            alt='메인 홈페이지 사진'
            width='698'
            height='343'
          />
        </S.MainInner>
      </S.Main>
      <S.Section>
        <S.SectionInner>
          <S.Article>
            <S.ArticleTextWrap>
              <S.ArticleTitle>
                <S.ArticleGradient $color={GRADIENT_COLORS.article1}>
                  원하는 링크
                </S.ArticleGradient>
                를 저장하세요
              </S.ArticleTitle>
              <S.ArticleContent>
                나중에 읽고 싶은 글, 다시 보고 싶은 영상, <BrInPC />
                사고 싶은 옷, 기억하고 싶은 모든 것을 <BrInPC />한 공간에
                저장하세요.
              </S.ArticleContent>
            </S.ArticleTextWrap>
            <S.ArticleImage
              src={Section1Image}
              alt='원하는 링크를 저장하세요'
              width='550'
              height='450'
            />
          </S.Article>
          <S.Article>
            <S.ArticleImage
              src={Section2Image}
              alt='폴더 이름 변경하기'
              width='550'
              height='450'
            />
            <S.ArticleTextWrap>
              <S.ArticleTitle>
                링크를 폴더로&nbsp;
                <BrInPC />
                <S.ArticleGradient $color={GRADIENT_COLORS.article2}>
                  관리
                </S.ArticleGradient>
                하세요
              </S.ArticleTitle>
              <S.ArticleContent>
                나만의 폴더를 무제한으로 만들고 <BrInPC />
                다양하게 활용할 수 있습니다.
              </S.ArticleContent>
            </S.ArticleTextWrap>
          </S.Article>
          <S.Article>
            <S.ArticleTextWrap>
              <S.ArticleTitle>
                저장한 링크를&nbsp;
                <BrInPC />
                <S.ArticleGradient $color={GRADIENT_COLORS.article3}>
                  공유
                </S.ArticleGradient>
                해 보세요.
              </S.ArticleTitle>
              <S.ArticleContent>
                여러 링크를 폴더에 담고 공유할 수 있습니다. <BrInPC />
                가족, 친구, 동료들에게 쉽고 빠르게 링크를 <BrInPC />
                공유해 보세요.
              </S.ArticleContent>
            </S.ArticleTextWrap>
            <S.ArticleImage
              src={Section3Image}
              alt='폴더 공유하기'
              width='550'
              height='450'
            />
          </S.Article>
          <S.Article>
            <S.ArticleImage
              src={Section4Image}
              alt='검색한 결과 보여주기'
              width='550'
              height='450'
            />
            <S.ArticleTextWrap>
              <S.ArticleTitle>
                저장한 링크를&nbsp;
                <BrInPC />
                <S.ArticleGradient $color={GRADIENT_COLORS.article1}>
                  검색
                </S.ArticleGradient>
                해 보세요
              </S.ArticleTitle>
              <S.ArticleContent>
                중요한 정보들을 검색으로 쉽게 찾아보세요.
              </S.ArticleContent>
            </S.ArticleTextWrap>
          </S.Article>
        </S.SectionInner>
      </S.Section>
    </>
  );
}
