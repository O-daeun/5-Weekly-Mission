import Button from '@/components/Button/Button';
import Image from 'next/image';
import styled from 'styled-components';

export const Main = styled.main`
  background-color: var(--Linkbrary-bg);
`;

export const MainInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 100%;
  max-width: 698px;
  margin: 0 auto;
  padding-top: 70px;

  @media (max-width: 767px) {
    gap: 24px;
    padding: 28px 9px 0;
  }
`;

export const MainText = styled.h2`
  font-size: 64px;
  font-weight: 700;
  line-height: 80px;
  text-align: center;

  @media (max-width: 767px) {
    font-size: 32px;
    line-height: 42px;
  }
`;

export const MainTextGradient = styled.span`
  background: linear-gradient(
    91.26deg,
    var(--Linkbrary-primary) 17.28%,
    #ff9f9f 74.98%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const LinkButton = styled(Button)`
  width: 350px;
  @media (max-width: 767px) {
    width: 200px;
  }
`;

export const MainImage = styled(Image)`
  width: 100%;
  height: auto;
`;

export const Section = styled.section`
  padding: 120px 32px 170px;

  @media (max-width: 767px) {
    padding: 40px 32px 81px;
  }
`;

export const SectionInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  max-width: 998px;
  margin: 0 auto;

  @media (max-width: 767px) {
    gap: 76px;
  }
`;

export const Article = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 767px) {
    flex-direction: column;
    gap: 24px;

    &:nth-of-type(even) {
      flex-direction: column-reverse;
    }
  }
`;

export const ArticleTextWrap = styled.div`
  width: 291px;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const ArticleTitle = styled.h3`
  font-size: 48px;
  font-weight: 700;
  letter-spacing: -0.3px;

  @media (max-width: 767px) {
    font-size: 24px;
  }
`;

export const ArticleGradient = styled.span<{ $color: string }>`
  background: ${({ $color }) => $color};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const ArticleContent = styled.p`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5rem;
  color: #6b6b6b;

  @media (max-width: 767px) {
    font-size: 15px;
  }
`;

export const ArticleImage = styled(Image)`
  @media (max-width: 1024px) {
    width: 40vw;
    height: auto;
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;
