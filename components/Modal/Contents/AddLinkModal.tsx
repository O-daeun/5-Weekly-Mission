import { FormEvent, useState } from 'react';
import ModalLayout from '../ModalLayout';
import * as S from '../Modal.styled';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addLink } from '@/apis/api';
import { FolderInterface } from '@/interfaces';
import { AddLink } from '@/interfaces/api';
import { useRouter } from 'next/router';

interface AddLinkModalProps {
  link: string;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  folders: FolderInterface[];
}

export default function AddLinkModal({
  link,
  onClose,
  folders,
}: AddLinkModalProps) {
  const [checkedId, setCheckedId] = useState<number | null>(null);

  const router = useRouter();
  const queryClient = useQueryClient();

  const addToFolderMutation = useMutation({
    mutationFn: ({ url, folderId }: AddLink) => addLink({ url, folderId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links', checkedId] });
      router.push(`/folder/${checkedId}`);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addToFolderMutation.mutate({ url: link, folderId: checkedId });
    onClose(false);
  };

  return (
    <ModalLayout title='폴더에 추가' onClose={onClose}>
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
