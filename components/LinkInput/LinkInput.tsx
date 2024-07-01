import { ChangeEvent, FormEvent, useState } from 'react';
import * as S from './LinkInput.styled';
import AddLinkModal from '../Modal/Contents/AddLinkModal';
import { FolderInterface } from '@/interfaces';
import { useModal, useSetModal } from '@/contexts/ModalContext';

interface Props {
  folders: FolderInterface[];
}

export default function LinkInput({ folders }: Props) {
  const [text, setText] = useState('');
  const [link, setLink] = useState('');

  const modal = useModal();
  const setModal = useSetModal();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLink(text);
    setText('');
    setModal({ isOpen: true, content: 'AddLinkModal' });
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  return (
    <>
      <S.Form onSubmit={handleSubmit}>
        <S.Input
          type='text'
          value={text}
          onChange={handleChange}
          placeholder='링크를 추가해 보세요'
        />
        <S.StyledButton text='추가하기' type='submit' disabled={!text} />
      </S.Form>
      {modal.isOpen && modal.content === 'AddLinkModal' && (
        <AddLinkModal link={link} folders={folders} />
      )}
    </>
  );
}
