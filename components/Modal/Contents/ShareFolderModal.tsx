import ModalLayout from '../ModalLayout';
import * as S from '../Modal.styled';
import KakaotalkIcon from '@/public/images/share_kakaotalk.svg';
import facebookIcon from '@/public/images/share_facebook.svg';
import linkIcon from '@/public/images/share_link.svg';
import shareKakao from '@/apis/shareKakao';
import Image from 'next/image';
import { FolderInterface } from '@/interfaces';

interface ShardFolderModalProps {
  currentFolder: FolderInterface;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ShardFolderModal({
  currentFolder,
  onClose,
}: ShardFolderModalProps) {
  const SHARES = [
    {
      name: '카카오톡',
      imageSrc: KakaotalkIcon,
      onClick: (e: React.MouseEvent) => {
        shareKakao(e, currentFolder.name, currentFolder.id);
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
          .writeText(`${window.location.hostname}/shared/${currentFolder.id}`)
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
    <ModalLayout title='폴더 공유' onClose={onClose}>
      <S.SemiTitle>{currentFolder.name}</S.SemiTitle>
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
    </ModalLayout>
  );
}
