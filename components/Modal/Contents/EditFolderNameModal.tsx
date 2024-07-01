import { FormEvent, useState } from 'react';
import ModalLayout from '../ModalLayout';
import * as S from '../Modal.styled';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putFolderName } from '@/apis/api';
import { FolderInterface } from '@/interfaces';
import { EditFolderName } from '@/interfaces/api';
import { useSetModal } from '@/contexts/ModalContext';

interface EditFolderNameModalProps {
  currentFolder: FolderInterface;
}

export default function EditFolderNameModal({
  currentFolder,
}: EditFolderNameModalProps) {
  const [text, setText] = useState(currentFolder.name);

  const queryClient = useQueryClient();
  const setModal = useSetModal();

  const putFolderNameMutation = useMutation({
    mutationFn: ({ folderId, newFolderName }: EditFolderName) =>
      putFolderName({ folderId, newFolderName }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
      queryClient.invalidateQueries({
        queryKey: ['folder', String(currentFolder.id)],
      });
    },
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    putFolderNameMutation.mutate({
      folderId: currentFolder.id,
      newFolderName: text,
    });
    setModal({ isOpen: false, content: '' });
  };

  return (
    <ModalLayout title='폴더 이름 변경'>
      <form onSubmit={handleSubmit}>
        <S.Input
          type='text'
          placeholder='내용 입력'
          value={text}
          onChange={handleTextChange}
        />
        <S.StyledButton text='변경하기' type='submit' />
      </form>
    </ModalLayout>
  );
}
