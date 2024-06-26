import { ReactNode } from 'react';
import Image from 'next/image';
import * as S from './Modal.styled';
import CloseImage from '@/public/images/close_button.svg';

interface Props {
  title: string;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

export default function ModalLayout({ title, onClose, children }: Props) {
  const handleCloseClick = () => {
    onClose(false);
  };

  return (
    <S.Layout>
      <S.Modal>
        <S.CloseButton onClick={handleCloseClick}>
          <Image src={CloseImage} alt='모달 닫기' />
        </S.CloseButton>
        <S.Title>{title}</S.Title>
        {children}
      </S.Modal>
    </S.Layout>
  );
}
