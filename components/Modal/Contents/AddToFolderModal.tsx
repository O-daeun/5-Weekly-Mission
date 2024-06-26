import { FormEvent, useState } from 'react';
import ModalLayout from '../ModalLayout';
import * as S from '../Modal.styled';
import { useMutation } from '@tanstack/react-query';
import { addFolder } from '@/apis/api';

interface AddToFolderModalProps {
  title: string;
  semiTitle: string;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  folders: string[];
  counts: number[];
  buttonText: string;
}

export default function AddToFolderModal({
  title,
  semiTitle,
  onClose,
  folders,
  counts,
  buttonText,
}: AddToFolderModalProps) {
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
    onClose(false);
  };

  return (
    <ModalLayout title={title} onClose={onClose}>
      <S.SemiTitle>{semiTitle}</S.SemiTitle>
      <form onSubmit={handleSubmit}>
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
        <S.StyledButton text={buttonText} type='submit' />
      </form>
    </ModalLayout>
  );
}
