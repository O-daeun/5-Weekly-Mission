import React, { MouseEvent, useContext, useEffect, useState } from 'react';
import { Layout, SectionWrap } from '../../styles/CommonPage.styled';
import LinkInput from '../../components/LinkInput/LinkInput';
import * as S from '../../styles/FolderPage.styled';
import { getLinks, getFolders, getUser } from '../../apis/api';
import Search from '../../components/Search/Search';
import CardList from '../../components/CardList/CardList';
import MenuButton from '../../components/MenuButton/MenuButton';
import AddIcon from '../../src/images/add_icon.svg';
import AddWhiteIcon from '../../src/images/add_white_icon.svg';
import ShareIcon from '../../src/images/share_icon.png';
import PenIcon from '../../src/images/pen_icon.png';
import DeleteIcon from '../../src/images/delete_icon.png';
import Modal from '../../components/Modal/Modal';
import Image from 'next/image';
import { UserContext } from '@/contexts/UserContext';

export default function FolderPage() {
  const { user } = useContext(UserContext);
  const [folderNames, setFolderNames] = useState(['']);
  const [folders, setFolders] = useState([
    {
      id: 0,
      created_at: '',
      name: '',
      userId: 0,
      favorite: false,
      link: {
        count: 0,
      },
    },
  ]);
  const [currentFolder, setCurrentFolder] = useState({
    id: 0,
    name: '전체',
  });
  const [links, setLinks] = useState([]);
  const [itemCountsInEachFolder, setItemCountsInEachFolder] = useState([0]);
  const [isVisibleAddFolderModal, setIsVisibleAddFolderModal] = useState(false);
  const [isVisibleShareFolderModal, setIsVisibleShareFolderModal] =
    useState(false);
  const [isVisibleChangeFolderNameModal, setIsVisibleChangeFolderNameModal] =
    useState(false);
  const [isVisibleDeleteFolderModal, setIsVisibleDeleteFolder] =
    useState(false);

  const CONTROLS = [
    {
      name: '공유',
      icon: ShareIcon,
      onClick: () => {
        setIsVisibleShareFolderModal(true);
      },
    },
    {
      name: '이름 변경',
      icon: PenIcon,
      onClick: () => {
        setIsVisibleChangeFolderNameModal(true);
      },
    },
    {
      name: '삭제',
      icon: DeleteIcon,
      onClick: () => {
        setIsVisibleDeleteFolder(true);
      },
    },
  ];

  const handleMenuButtonClick = async (e: MouseEvent<HTMLButtonElement>) => {
    if ((e.target as HTMLButtonElement).value === '전체') {
      setCurrentFolder({
        id: 0,
        name: '전체',
      });
      return;
    }
    setCurrentFolder(
      folders
        .filter(
          (folder) => folder.name === (e.target as HTMLButtonElement).value
        )
        .splice(0, 1)[0]
    );
  };

  const handleLoadMenu = async () => {
    if (user) {
      const data: [
        {
          id: 0;
          created_at: '';
          name: '';
          userId: 0;
          favorite: false;
          link: {
            count: 0;
          };
        }
      ] = await getFolders(user.id, 0);
      setFolders(data);
      const nextFolderNames = data?.map((item) => item.name);
      const nextItemCounts = data?.map((item) => item.link.count);
      setFolderNames(nextFolderNames);
      setItemCountsInEachFolder(nextItemCounts);
    }
  };

  const handleLoadItems = async () => {
    if (user) {
      const nextLinks = await getLinks(user.id, currentFolder.id);
      setLinks(nextLinks);
    }
  };

  const handleAddFolderButtonClick = () => {
    setIsVisibleAddFolderModal(true);
  };

  useEffect(() => {
    handleLoadMenu();
  }, [user]);

  useEffect(() => {
    handleLoadItems();
  }, [user, currentFolder]);

  return (
    <Layout>
      <S.StyledTopWrap>
        <LinkInput
          folderNames={folderNames}
          itemCountsInEachFolder={itemCountsInEachFolder}
        />
      </S.StyledTopWrap>
      <SectionWrap>
        <Search />
        <S.MenuWrap>
          <S.MenuList>
            <MenuButton
              currentFolder={currentFolder}
              folderName='전체'
              onClick={handleMenuButtonClick}
            />
            {folderNames?.map((folderName, index) => (
              <MenuButton
                key={index}
                currentFolder={currentFolder}
                folderName={folderName}
                onClick={handleMenuButtonClick}
              />
            ))}
          </S.MenuList>
          <S.AddButton onClick={handleAddFolderButtonClick}>
            폴더 추가
            <Image src={AddIcon} alt='더하기' width='16' height='16' />
            <Image src={AddWhiteIcon} alt='더하기' width='16' height='16' />
          </S.AddButton>
        </S.MenuWrap>
        <S.TitleWrap>
          <S.Title>{currentFolder?.name}</S.Title>
          {currentFolder?.name !== '전체' && (
            <S.ControlWrap>
              {CONTROLS.map((control, index) => (
                <S.ControlButton key={index} onClick={control.onClick}>
                  <S.ControlIcon
                    src={control.icon}
                    alt='아이콘'
                    width='18'
                    height='18'
                  />
                  {control.name}
                </S.ControlButton>
              ))}
            </S.ControlWrap>
          )}
        </S.TitleWrap>
        {!links?.length && <S.NoData>저장된 링크가 없습니다</S.NoData>}
        {links && (
          <CardList
            items={links}
            folderNames={folderNames}
            itemCountsInEachFolder={itemCountsInEachFolder}
          />
        )}
      </SectionWrap>
      {isVisibleAddFolderModal && (
        <Modal
          title='폴더 추가'
          input
          button='추가하기'
          onClose={setIsVisibleAddFolderModal}
        />
      )}
      {isVisibleShareFolderModal && (
        <Modal
          title='폴더 공유'
          semiTitle={currentFolder.name}
          folderId={currentFolder.id}
          onClose={setIsVisibleShareFolderModal}
        />
      )}
      {isVisibleChangeFolderNameModal && (
        <Modal
          title='폴더 이름 변경'
          input
          inputValue={currentFolder.name}
          button='변경하기'
          onClose={setIsVisibleChangeFolderNameModal}
        />
      )}
      {isVisibleDeleteFolderModal && (
        <Modal
          title='폴더 삭제'
          semiTitle={currentFolder.name}
          button='삭제하기'
          onClose={setIsVisibleDeleteFolder}
        />
      )}
    </Layout>
  );
}
