import styled from 'styled-components';
import Button from '../Button/Button';

export const Header = styled.header<{ $isSticky: boolean }>`
  position: ${({ $isSticky }) => ($isSticky ? 'sticky' : 'relative')};
  top: 0;
  padding: 20px 32px;
  background: var(--Linkbrary-bg);
  z-index: 1;

  @media (max-width: 1199px) {
    padding: 20px 32px;
  }
`;

export const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1060px;
  margin: 0 auto;

  @media (max-width: 1199px) {
    width: 100%;
  }
`;

export const Logo = styled.h1`
  width: 133px;
  height: 24px;

  @media (max-width: 767px) {
    width: 89px;
    height: 16px;
  }
`;

export const StyledButton = styled(Button)`
  width: 128px;

  @media (max-width: 767px) {
    width: 80px;
  }
`;
