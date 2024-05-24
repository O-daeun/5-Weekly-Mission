import { useState } from 'react';
import Image from 'next/image';
import * as S from './Modal.styled';
import CloseImage from '@/public/images/close_button.svg';
import KakaotalkIcon from '@/public/images/share_kakaotalk.svg';
import facebookIcon from '@/public/images/share_facebook.svg';
import linkIcon from '@/public/images/share_link.svg';
import shareKakao from '../../apis/shareKakao';

/**
 * 1. 폴더 이름 변경, 폴더 추가
 * @param {string} title - '폴더 이름 변경' / '폴더 추가'
 * @param {string} input - 폴더 명 / undefined
 * @param {string} button - '변경하기' / '추가하기'
 * @param {function} onClose - 모달을 열고 닫을 수 있는 setter 함수
 *
 * 2. 폴더 공유
 * @param {string} title - '폴더 공유'
 * @param {string} semiTitle - 폴더 name
 * @param {number} folderId - 폴더 id
 * @param {function} onClose - 모달을 열고 닫을 수 있는 setter 함수
 *
 * 3. 폴더 삭제, 링크 삭제
 * @param {string} title - '폴더 삭제' / '링크 삭제'
 * @param {string} semiTitle - 폴더 name / link url
 * @param {string} button - '삭제하기'
 * @param {function} onClose - 모달을 열고 닫을 수 있는 setter 함수
 *
 * 4. 폴더에 추가
 * @param {string} title - '폴더에 추가'
 * @param {string} semiTitle - link url
 * @param {string[]} folders - 폴더 name 배열
 * @param {number[]} counts - 각 폴더별 아이템 개수 배열
 * @param {string} button - '추가하기'
 * @param {function} onClose - 모달을 열고 닫을 수 있는 setter 함수
 */

interface Props {
  title: string;
  semiTitle?: string;
  input?: boolean;
  inputValue?: string;
  button?: string;
  folderId?: number;
  folders?: string[];
  counts?: number[];
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({
  title,
  semiTitle,
  input,
  inputValue,
  button,
  folderId,
  folders,
  counts,
  onClose,
}: Props) {
  const [text, setText] = useState(inputValue);
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleCloseClick = () => {
    onClose(false);
  };

  const SHARES = [
    {
      name: '카카오톡',
      imageSrc: KakaotalkIcon,
      onClick: (e: React.MouseEvent) => {
        if (semiTitle && folderId) {
          shareKakao(e, semiTitle, folderId);
        }
      },
    },
    {
      name: '페이스북',
      imageSrc: facebookIcon,
      onClick: () => {},
    },
    {
      name: '링크 복사',
      imageSrc: linkIcon,
      onClick: () => {
        navigator.clipboard
          .writeText(`${window.location.hostname}/shared/${folderId}`)
          .then(() => {
            alert('링크가 복사되었습니다.');
          })
          .catch((error) => {
            console.error('복사 실패:', error);
          });
      },
    },
  ];

  return (
    <S.Layout>
      <S.Modal>
        <S.CloseButton onClick={handleCloseClick}>
          <Image src={CloseImage} alt='모달 닫기' />
        </S.CloseButton>
        <S.Title>{title}</S.Title>
        {semiTitle && <S.SemiTitle>{semiTitle}</S.SemiTitle>}
        {input && (
          <S.Input
            type='text'
            placeholder='내용 입력'
            value={text}
            onChange={handleTextChange}
          />
        )}
        {folders && counts && (
          <S.FoldersList>
            {folders.map((folder, index) => (
              <li key={index}>
                <input
                  type='radio'
                  id={'' + index}
                  name='folder'
                  value={folder}
                />
                <label htmlFor={'' + index}>
                  <h3>{folder}</h3>
                  <span>{counts[index]}개 링크</span>
                </label>
              </li>
            ))}
          </S.FoldersList>
        )}
        {button && <S.StyledButton text={button} mt={semiTitle} />}
        {folderId && (
          <S.ShareList>
            {SHARES.map((share, index) => (
              <button key={index} onClick={share.onClick}>
                <Image
                  src={share.imageSrc}
                  alt={share.name + '공유'}
                  width='42'
                  height='42'
                />
                <p>{share.name}</p>
              </button>
            ))}
          </S.ShareList>
        )}
      </S.Modal>
    </S.Layout>
  );
}
