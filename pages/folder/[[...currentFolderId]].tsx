import React, { MouseEvent, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '@/contexts/UserContext';
import Image from 'next/image';
import { getLinks, getFolders } from '@/apis/api';
import LinkInput from '@/components/LinkInput/LinkInput';
import Search from '@/components/Search/Search';
import CardList from '@/components/CardList/CardList';
import Modal from '@/components/Modal/Modal';
import MenuLink from '@/components/MenuLink/MenuLink';
import * as S from '@/styles/FolderPage.styled';
import { Layout, SectionWrap } from '@/styles/CommonPage.styled';
import AddIcon from '@/src/images/add_icon.svg';
import AddWhiteIcon from '@/src/images/add_white_icon.svg';
import ShareIcon from '@/src/images/share_icon.png';
import PenIcon from '@/src/images/pen_icon.png';
import DeleteIcon from '@/src/images/delete_icon.png';
import { FolderInterface } from '@/src/interfaces';

export default function FolderPage() {
  const router = useRouter();
  const { currentFolderId } = router.query;

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

  const { user } = useContext(UserContext);

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

  const handleLoadMenu = async () => {
    if (user) {
      const nextFolders: FolderInterface[] = await getFolders(0, user.id);
      setFolders(nextFolders);
      const nextFolderNames = folders?.map((item) => item.name);
      const nextItemCounts = folders?.map((item) => item.link.count);
      setFolderNames(nextFolderNames);
      setItemCountsInEachFolder(nextItemCounts);
    }
  };

  const handleLoadItems = async () => {
    if (user) {
      let nextLinks;
      nextLinks = await getLinks(
        user.id,
        currentFolderId ? Number(currentFolderId) : 0
      );
      setLinks(nextLinks);
    }
  };

  const handleAddFolderButtonClick = () => {
    setIsVisibleAddFolderModal(true);
  };

  useEffect(() => {
    if (!localStorage.accessToken) {
      router.replace('/signin');
    }
  }, []);

  useEffect(() => {
    handleLoadMenu();
  }, [user]);

  useEffect(() => {
    handleLoadItems();
  }, [user, currentFolderId]);

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
            <MenuLink currentFolderId={currentFolderId || '0'} />
            {folders?.map((folder, index) => (
              <MenuLink
                key={index}
                currentFolderId={currentFolderId || '0'}
                folder={folder}
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
          {currentFolderId && (
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
