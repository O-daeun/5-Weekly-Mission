import styled from 'styled-components';
import Button from '../Button/Button';
import checkIcon from '@/public/images/check_icon.svg';

export const Layout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

export const Modal = styled.div`
  position: relative;
  width: 360px;
  max-width: calc(100vw - 64px);
  padding: 32px 40px;
  border-radius: 15px;
  border: 1px solid var(--Linkbrary-gray20);
  background: var(--Linkbrary-white);

  @media (max-width: 767px) {
    padding: 30px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
`;

export const Title = styled.h2`
  color: var(--Linkbrary-gray100);
  font-size: 20px;
  font-weight: 700;
  color: var(--Linkbrary-gray100);
  text-align: center;
`;

export const SemiTitle = styled.h3`
  margin-top: 8px;
  color: var(--Linkbrary-gray60);
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 157.143%;
  overflow: auto;
  padding-bottom: 5px;
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--Linkbrary-gray20);
    border-radius: 30px;
  }
`;

export const Input = styled.input`
  width: 100%;
  margin-top: 24px;
  padding: 18px 15px;
  border-radius: 8px;
  border: 1px solid var(--Linkbrary-gray20);
  outline: none;
  background: var(--Linkbrary-white);
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  color: var(--Linkbrary-gray100);

  &::placeholder {
    color: var(--Linkbrary-gray60);
  }

  &:focus {
    border: 1px solid var(--Linkbrary-primary);
  }
`;

export const StyledButton = styled(Button)<{ mt?: string }>`
  width: 100%;
  height: 51px;
  margin-top: ${({ mt }) => (mt ? 24 : 15)}px;
  font-size: 16px;
  ${({ text }) => text === '삭제하기' && 'background: var(--Linkbrary-red);'}
`;

export const ShareList = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-top: 24px;

  & button {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    & img {
      width: 42px;
    }
  }
`;

export const FoldersList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  max-height: 172px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--Linkbrary-gray20);
    border-radius: 30px;
    cursor: pointer;
  }

  & li {
    & input {
      display: none;
    }
    & input:checked ~ label {
      border-radius: 8px;
      background: var(--Linkbrary-bg);

      & h3 {
        color: var(--Linkbrary-primary);
      }
    }
    & input:checked ~ label::after {
      content: '';
      position: absolute;
      top: 13px;
      right: 8px;
      width: 14px;
      height: 14px;
      background: url(${checkIcon.src}) no-repeat center / contain;
    }
    & label {
      position: relative;
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 8px;
      cursor: pointer;

      & h3 {
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;
        color: var(--Linkbrary-gray100);
      }
      & span {
        font-size: 14px;
        color: var(--Linkbrary-gray60);
      }
    }
  }
`;
