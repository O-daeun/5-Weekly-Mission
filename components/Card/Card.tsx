import { ReactEventHandler, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { formatDateToString, formatDateToAgo } from '@/utils/date';
import Modal from '../Modal/Modal';
import * as S from './Card.styled';
import star from '@/src/images/star_icon.png';
import kebab from '@/src/images/kebab_icon.png';
import defaultImage from '@/src/images/no-image.png';

interface Props {
  item: {
    created_at: string;
    url: string;
    title: string;
    image_source: string;
  };
  folderNames?: string[];
  itemCountsInEachFolder?: number[];
}

export default function Card({
  item,
  folderNames,
  itemCountsInEachFolder,
}: Props) {
  const { created_at, url, title, image_source } = item;
  const [isVisibleKebabModal, setIsVisibleKebabModal] = useState(false);
  const [isVisibledeleteCardModal, setIsVisibleDeleteCardModal] =
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
              {folderNames && (
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
          {folderNames && (
            <S.Star onClick={handleStarClick}>
              <Image src={star} alt='별' fill sizes='34px' />
            </S.Star>
          )}
        </Link>
      </S.Card>
      {isVisibledeleteCardModal && (
        <Modal
          title='링크 삭제'
          semiTitle={url}
          button='삭제하기'
          onClose={setIsVisibleDeleteCardModal}
        />
      )}
      {isVisibleAddInFolderModal && (
        <Modal
          title='폴더에 추가'
          semiTitle={url}
          folders={folderNames}
          counts={itemCountsInEachFolder}
          button='추가하기'
          onClose={setIsVisibleAddInFolderModal}
        />
      )}
    </>
  );
}
