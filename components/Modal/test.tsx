import { useState } from 'react';
import Image from 'next/image';
import CloseImage from '@/public/images/close_button.svg';
import KakaotalkIcon from '@/public/images/share_kakaotalk.svg';
import facebookIcon from '@/public/images/share_facebook.svg';
import linkIcon from '@/public/images/share_link.svg';

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
  buttonOnClick?: () => void;
}

export default function Test({
  title,
  semiTitle,
  input,
  inputValue,
  button,
  folderId,
  folders,
  counts,
  onClose,
  buttonOnClick,
}: Props) {
  const [text, setText] = useState(inputValue);
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
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
        {button && (
          <S.StyledButton
            text={button}
            mt={semiTitle}
            onClick={buttonOnClick}
          />
        )}
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
