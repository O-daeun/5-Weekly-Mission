import { ReactEventHandler, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { formatDateToString, formatDateToAgo } from '@/utils/date';
import Modal from '../Modal/ModalLayout';
import * as S from './Card.styled';
import star from '@/public/images/star_icon.png';
import kebab from '@/public/images/kebab_icon.png';
import defaultImage from '@/public/images/no-image.png';
import { FolderInterface } from '@/interfaces';
import AddLinkModal from '../Modal/Contents/AddLinkModal';
import DeleteLinkModal from '../Modal/Contents/DeleteLinkModal';

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
  const [isVisibleKebabModal, setIsVisibleKebabModal] = useState(false);
  const [isVisibleDeleteCardModal, setIsVisibleDeleteCardModal] =
    useState(false);
  const [isVisibleAddInFolderModal, setIsVisibleAddInFolderModal] =
    useState(false);

  const dateBetween = formatDateToAgo(created_at);
  const date = formatDateToString(created_at);

  const addDefaultImage: ReactEventHandler<HTMLImageElement> = (e: {
    currentTarget: { src: string | StaticImageData };
  }) => {
    e.currentTarget.src = defaultImage;
  };

  const handleStarClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('별 클릭');
  };
  const handleKebabClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsVisibleKebabModal(!isVisibleKebabModal);
  };

  const handleDeleteButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsVisibleDeleteCardModal(true);
  };
  const handleAddFolderButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsVisibleAddInFolderModal(true);
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
              {isVisibleKebabModal && (
                <S.KebabModal>
                  <button onClick={handleDeleteButtonClick}>삭제하기</button>
                  <button onClick={handleAddFolderButtonClick}>
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
      {isVisibleDeleteCardModal && (
        <DeleteLinkModal
          link={url}
          linkId={id}
          onClose={setIsVisibleDeleteCardModal}
        />
      )}
      {isVisibleAddInFolderModal && folders && (
        <AddLinkModal
          link={url}
          folders={folders}
          onClose={setIsVisibleAddInFolderModal}
        />
      )}
    </>
  );
}
