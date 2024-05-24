import styled from 'styled-components';
import Button from '../Button/Button';
import Image from 'next/image';

export const Header = styled.header<{ $isSticky: boolean }>`
  position: ${({ $isSticky }) => ($isSticky ? 'sticky' : 'relative')};
  top: 0;
  padding: 20px 32px;
  background: var(--Linkbrary-bg);
  z-index: 1;

  @media (max-width: 1199px) {
    padding: 20px 32px;
  }

  @media (max-width: 767px) {
    padding: 13px 32px;
  }
`;

export const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1520px;
  margin: 0 auto;

  @media (max-width: 1199px) {
    width: 100%;
  }
`;

export const LogoImage = styled(Image)`
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

export const ProfileButton = styled.div`
  position: relative;
  user-select: none;
  cursor: pointer;
`;

export const LogoutButton = styled.button`
  position: absolute;
  top: 30px;
  right: 0;
  width: 100px;
  text-align: center;
  padding: 10px 0;
  background: var(--Linkbrary-white);
  border-radius: 10px;
  box-shadow: 0px 2px 8px 0px rgba(51, 50, 54, 0.1);

  &:hover {
    color: var(--Linkbrary-primary);
  }
`;
