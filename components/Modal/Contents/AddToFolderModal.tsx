import { FormEvent, useState } from 'react';
import ModalLayout from '../ModalLayout';
import * as S from '../Modal.styled';
import { useMutation } from '@tanstack/react-query';
import { addLink } from '@/apis/api';
import { FolderInterface } from '@/interfaces';
import { AddLink } from '@/interfaces/api';
import { useRouter } from 'next/router';
import { useFolderId } from '@/contexts/folderIdContext';

interface AddToFolderModalProps {
  title: string;
  link: string;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  folders: FolderInterface[];
}

export default function AddToFolderModal({
  title,
  link,
  onClose,
  folders,
}: AddToFolderModalProps) {
  const router = useRouter();
  const currentFolderId = useFolderId();

  const [checkedId, setCheckedId] = useState<number | null>(null);

  const addToFolderMutation = useMutation({
    mutationFn: ({ url: link, folderId: checkedId }: AddLink) =>
      addLink({ url: link, folderId: checkedId }),
    onSuccess: () => {
      router.push(`/folder/${currentFolderId}`);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addToFolderMutation.mutate({ url: link, folderId: checkedId });
    onClose(false);
  };

  return (
    <ModalLayout title={title} onClose={onClose}>
      <S.SemiTitle>{link}</S.SemiTitle>
      <form onSubmit={handleSubmit}>
        <S.FoldersList>
          {folders.map((folder) => (
            <li key={folder.id}>
              <input
                type='radio'
                id={folder.name}
                name='folders'
                value={folder.id}
                onChange={() => setCheckedId(folder.id)}
              />
              <label htmlFor={folder.name}>
                <h3>{folder.name}</h3>
                <span>{folder.link_count}개 링크</span>
              </label>
            </li>
          ))}
        </S.FoldersList>
        <S.StyledButton text='추가하기' type='submit' />
      </form>
    </ModalLayout>
  );
}
