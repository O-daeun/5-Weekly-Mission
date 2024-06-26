import { ChangeEvent, FormEvent, useState } from 'react';
import Modal from '../Modal/ModalLayout';
import * as S from './LinkInput.styled';
import AddToFolderModal from '../Modal/Contents/AddToFolderModal';

interface Props {
  folderNames: string[];
  itemCountsInEachFolder: number[];
}

export default function LinkInput({
  folderNames,
  itemCountsInEachFolder,
}: Props) {
  const [text, setText] = useState('');
  const [link, setLink] = useState('');
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLink(text);
    setIsVisibleModal(true);
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
        <S.StyledButton text='추가하기' type='submit' />
      </S.Form>
      {isVisibleModal && (
        <AddToFolderModal
          title='폴더에 추가'
          semiTitle={link}
          buttonText='추가하기'
          folders={folderNames}
          counts={itemCountsInEachFolder}
          onClose={setIsVisibleModal}
        />
      )}
    </>
  );
}
