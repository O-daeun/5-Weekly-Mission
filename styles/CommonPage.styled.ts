import styled from 'styled-components';

export const TopWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px 33px 60px;
  background-color: var(--Linkbrary-bg);

  @media (max-width: 767px) {
    gap: 10px;
    padding: 10px 0 40px;
  }
`;

export const SectionWrap = styled.section`
  max-width: 1124px;
  margin: 0 auto;
  padding: 0 32px 100px;

  @media (max-width: 767px) {
    padding-bottom: 60px;
  }
`;

export const Layout = styled.div`
  min-height: calc(100vh - 230px);
`;

export const BrInPC = styled.br`
  @media (max-width: 767px) {
    display: none;
  }
`;

export const BrInTablet = styled.br`
  display: none;
  @media (max-width: 767px) {
    display: block;
  }
`;

export const BrInMobile = styled.br`
  display: none;
  @media (max-width: 767px) {
    display: block;
  }
`;
