import { ChangeEvent, FormEvent, useState } from 'react';
import * as S from './LinkInput.styled';
import AddLinkModal from '../Modal/Contents/AddLinkModal';
import { FolderInterface } from '@/interfaces';

interface Props {
  folders: FolderInterface[];
}

export default function LinkInput({ folders }: Props) {
  const [text, setText] = useState('');
  const [link, setLink] = useState('');
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLink(text);
    setIsVisibleModal(true);
    setText('');
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
      {isVisibleModal && (
        <AddLinkModal
          link={link}
          folders={folders}
          onClose={setIsVisibleModal}
        />
      )}
    </>
  );
}
