import { FormEvent, useState } from 'react';
import ModalLayout from '../ModalLayout';
import * as S from '../Modal.styled';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putFolderName } from '@/apis/api';
import { FolderInterface } from '@/interfaces';
import { EditFolderName } from '@/interfaces/api';

interface EditFolderNameModalProps {
  currentFolder: FolderInterface;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditFolderNameModal({
  currentFolder,
  onClose,
}: EditFolderNameModalProps) {
  const [text, setText] = useState(currentFolder.name);

  const queryClient = useQueryClient();

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
    onClose(false);
  };

  return (
    <ModalLayout title='폴더 이름 변경' onClose={onClose}>
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
