import Link from 'next/link';
import styled, { css } from 'styled-components';

const StyledButton = css`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 16px 5px;
  background: linear-gradient(
    90.99deg,
    var(--Linkbrary-primary) 0.12%,
    #6ae3fe 101.84%
  );
  border-radius: 8px;
  color: var(--Linkbrary-white);
  font-weight: 600;
  font-size: 1.125rem;

  @media (max-width: 767px) {
    padding: 10px 0;
    font-size: 0.875rem;
  }
`;

export const Button = styled.button`
  ${StyledButton}
`;

export const StyledLink = styled(Link)`
  ${StyledButton}
`;
