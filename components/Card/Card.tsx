import { MouseEvent, ReactEventHandler, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { formatDateToString, formatDateToAgo } from '@/utils/date';
import * as S from './Card.styled';
import star from '@/public/images/star_icon.png';
import kebab from '@/public/images/kebab_icon.png';
import defaultImage from '@/public/images/no-image.png';
import { FolderInterface } from '@/interfaces';
import AddLinkModal from '../Modal/Contents/AddLinkModal';
import DeleteLinkModal from '../Modal/Contents/DeleteLinkModal';
import { useModal, useSetModal } from '@/contexts/ModalContext';

interface Props {
  item: {
    id: number;
    created_at: string;
    url: string;
    title: string;
    image_source: string;
  };
  folders?: FolderInterface[];
}

export default function Card({ item, folders }: Props) {
  const { id, created_at, url, title, image_source } = item;
  const [isOpenKebab, setIsOpenKebab] = useState(false);

  const modal = useModal();
  const setModal = useSetModal();
  const dateBetween = formatDateToAgo(created_at);
  const date = formatDateToString(created_at);

  const addDefaultImage: ReactEventHandler<HTMLImageElement> = (e: {
    currentTarget: { src: string | StaticImageData };
  }) => {
    e.currentTarget.src = defaultImage;
  };

  const handleStarClick = (e: MouseEvent) => {
    e.preventDefault();
    console.log('별 클릭');
  };
  const handleKebabClick = (e: MouseEvent) => {
    e.preventDefault();
    setIsOpenKebab(!isOpenKebab);
  };

  const handleDeleteButtonClick = (e: MouseEvent) => {
    e.preventDefault();
    setModal({ isOpen: true, content: `DeleteLinkModal ${id}` });
  };
  const handleAddLinkButtonClick = (e: MouseEvent) => {
    e.preventDefault();
    setModal({ isOpen: true, content: `AddLinkModal ${id}` });
  };

  return (
    <>
      <S.Card>
        <Link href={url} target='_blank' rel='noreferrer'>
          <S.thumbnailWrap>
            <S.thumbnail
              src={image_source ? image_source : defaultImage}
              alt='썸네일'
              onError={addDefaultImage}
              fill
              sizes='(max-width: 767px) 100vw, (max-width: 1124px) 50vw, 33vw'
            />
          </S.thumbnailWrap>
          <S.TextWrap>
            <S.TextTopWrap>
              <S.DateAgo>{dateBetween}</S.DateAgo>
              {folders && (
                <button onClick={handleKebabClick}>
                  <Image src={kebab} alt='더보기' width='21' height='17' />
                </button>
              )}
              {isOpenKebab && (
                <S.KebabModal>
                  <button onClick={handleDeleteButtonClick}>삭제하기</button>
                  <button onClick={handleAddLinkButtonClick}>
                    폴더에 추가
                  </button>
                </S.KebabModal>
              )}
            </S.TextTopWrap>
            <S.Title>{title}</S.Title>
            <S.Date>{date}</S.Date>
          </S.TextWrap>
          {folders && (
            <S.Star onClick={handleStarClick}>
              <Image src={star} alt='별' fill sizes='34px' />
            </S.Star>
          )}
        </Link>
      </S.Card>

      {modal.isOpen && modal.content === `DeleteLinkModal ${id}` ? (
        <DeleteLinkModal link={url} linkId={id} />
      ) : modal.content === `AddLinkModal ${id}` ? (
        <AddLinkModal link={url} folders={folders} />
      ) : (
        ''
      )}
    </>
  );
}
