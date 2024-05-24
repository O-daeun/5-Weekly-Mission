import Image from 'next/image';
import styled from 'styled-components';

interface Responsive {
  pc: number;
  mo: number;
}

interface Size {
  s: Responsive;
  m: Responsive;
}

const SIZES: Size = {
  s: {
    pc: 28,
    mo: 28,
  },
  m: {
    pc: 60,
    mo: 40,
  },
};

export const Wrap = styled.div<{ $flextype: string }>`
  display: flex;
  flex-direction: ${({ $flextype }) => $flextype};
  align-items: center;
  gap: ${({ $flextype }) => ($flextype === 'row' ? 6 : 12)}px;

  @media (max-width: 767px) {
    gap: 6px;
  }
`;

export const ImgBox = styled.div<{ $size: string }>`
  position: relative;
  border-radius: 50%;
  object-fit: cover;
  width: ${({ $size }) => `${(SIZES as any)[$size].pc}px`};
  height: ${({ $size }) => `${(SIZES as any)[$size].pc}px`};
  overflow: hidden;

  & > img {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 767px) {
    width: ${({ $size }) => `${(SIZES as any)[$size].mo}px`};
    height: ${({ $size }) => `${(SIZES as any)[$size].mo}px`};
  }
`;

export const Text = styled.p<{ $flextype: string }>`
  font-size: ${({ $flextype }) => ($flextype === 'row' ? 14 : 16)}px;
  color: ${({ $flextype }) => ($flextype === 'row' ? '#373740' : 'inherit')};

  @media (max-width: 767px) {
    display: ${({ $flextype }) => ($flextype === 'row' ? 'none' : 'block')};
    font-size: 14px;
  }
`;
