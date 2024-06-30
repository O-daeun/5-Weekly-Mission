import { FormEvent, useState } from 'react';
import ModalLayout from '../ModalLayout';
import * as S from '../Modal.styled';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addFolder } from '@/apis/api';

interface AddFolderModalProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddFolderModal({ onClose }: AddFolderModalProps) {
  const [text, setText] = useState('');

  const queryClient = useQueryClient();

  const addFolderMutation = useMutation({
    mutationFn: (newFolderName: string) => addFolder(newFolderName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
    },
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addFolderMutation.mutate(text);
    onClose(false);
  };

  return (
    <ModalLayout title='폴더 추가' onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <S.Input
          type='text'
          placeholder='내용 입력'
          value={text}
          onChange={handleTextChange}
        />
        <S.StyledButton text='추가하기' type='submit' />
      </form>
    </ModalLayout>
  );
}
