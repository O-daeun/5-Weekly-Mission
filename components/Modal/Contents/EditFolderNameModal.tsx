import { FormEvent, useState } from 'react';
import ModalLayout from '../ModalLayout';
import * as S from '../Modal.styled';
import { useMutation } from '@tanstack/react-query';
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

  const putFolderNameMutation = useMutation({
    mutationFn: ({ folderId, newFolderName }: EditFolderName) =>
      putFolderName({ folderId, newFolderName }),
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    putFolderNameMutation.mutate(
      { folderId: currentFolder.id, newFolderName: text },
      {
        onSuccess: () => {
          console.log('성공');
        },
      }
    );
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
