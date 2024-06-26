import { FormEvent, useState } from 'react';
import ModalLayout from '../ModalLayout';
import * as S from '../Modal.styled';
import { useMutation } from '@tanstack/react-query';
import { addFolder } from '@/apis/api';

interface Props {
  title: string;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  buttonText: string;
}

export default function AddFolderModal({ title, onClose, buttonText }: Props) {
  const [text, setText] = useState('');
  const addFolderMutation = useMutation({
    mutationFn: (newFolderName: string) => addFolder(newFolderName),
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addFolderMutation.mutate(text, {
      onSuccess: () => {
        console.log('성공');
      },
    });
  };

  return (
    <ModalLayout title={title} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <S.Input
          type='text'
          placeholder='내용 입력'
          value={text}
          onChange={handleTextChange}
        />
        <S.StyledButton text={buttonText} type='submit' />
      </form>
    </ModalLayout>
  );
}
