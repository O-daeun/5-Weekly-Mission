import { ReactNode } from 'react';
import Image from 'next/image';
import * as S from './Modal.styled';
import CloseImage from '@/public/images/close_button.svg';
import { useSetModal } from '@/contexts/ModalContext';

interface Props {
  title: string;
  children: ReactNode;
}

export default function ModalLayout({ title, children }: Props) {
  const setModal = useSetModal();
  const handleCloseClick = () => {
    setModal({ isOpen: false, content: null });
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
