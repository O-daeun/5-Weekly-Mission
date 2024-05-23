import styled from 'styled-components';
import SearchIcon from '@/public/images/search_icon.svg';

export const Input = styled.input`
  width: 100%;
  height: 54px;
  padding-left: 42px;
  margin: 40px 0;
  border: none;
  outline: none;
  border-radius: 10px;
  background: #f5f5f5 url(${SearchIcon.src}) no-repeat 15px 18px / 16px;
  font-size: 16px;
  color: #666;

  @media (max-width: 768px) {
    height: 43px;
    padding-left: 38px;
    margin: 20px 0 32px;
    font-size: 14px;
    background-position: 16px 13px;
  }
`;
