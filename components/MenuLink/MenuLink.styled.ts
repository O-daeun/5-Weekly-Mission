import Link from 'next/link';
import styled from 'styled-components';

export const MenuLink = styled(Link)<{ $isActive: boolean }>`
  height: 35px;
  padding: 0 12px;
  background-color: var(--Linkbrary-white);
  border: 1px solid var(--Linkbrary-primary);
  border-radius: 5px;
  line-height: 35px;

  background: ${({ $isActive }) =>
    $isActive ? 'var(--Linkbrary-primary)' : 'none'};
  color: ${({ $isActive }) => ($isActive ? 'white' : 'inherit')};

  @media (max-width: 767px) {
    height: 29px;
    padding: 0 10px;
    font-size: 14px;
    line-height: 29px;
  }
`;
