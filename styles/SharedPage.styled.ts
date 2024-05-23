import styled from 'styled-components';

export const Title = styled.h2`
  font-size: 40px;
  font-weight: 600;

  @media (max-width: 767px) {
    font-size: 32px;
  }
`;

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const NoData = styled.p`
  padding: 41px 0 35px;
  text-align: center;

  @media (max-width: 767px) {
    padding: 42px 0 290px;
  }
`;
