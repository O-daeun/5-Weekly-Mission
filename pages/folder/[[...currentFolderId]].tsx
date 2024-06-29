/* eslint-disable react-hooks/exhaustive-deps */
import React, { MouseEvent, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '@/contexts/UserContext';
import Image from 'next/image';
import { getLinks, getFolders } from '@/apis/api';
import LinkInput from '@/components/LinkInput/LinkInput';
import Search from '@/components/Search/Search';
import CardList from '@/components/CardList/CardList';
import MenuLink from '@/components/MenuLink/MenuLink';
import * as S from '@/styles/FolderPage.styled';
import { Layout, SectionWrap } from '@/styles/CommonPage.styled';
import AddIcon from '@/public/images/add_icon.svg';
import AddWhiteIcon from '@/public/images/add_white_icon.svg';
import ShareIcon from '@/public/images/share_icon.png';
import PenIcon from '@/public/images/pen_icon.png';
import DeleteIcon from '@/public/images/delete_icon.png';
import { FolderInterface, LinkInterface } from '@/interfaces';
import AddFolderModal from '@/components/Modal/Contents/AddFolderModal';
import { useFolderId } from '@/contexts/folderIdContext';
import DeleteFolderModal from '@/components/Modal/Contents/DeleteFolderModal';
import EditFolderNameModal from '@/components/Modal/Contents/EditFolderNameModal';
import ShardFolderModal from '@/components/Modal/Contents/ShareFolderModal';

const All_FOLDER = {
  id: 0,
  name: '전체',
  created_at: '',
  favorite: false,
  link_count: 0,
};

export default function FolderPage() {
  const router = useRouter();
  const currentFolderId = useFolderId();

  const [searchText, setSearchText] = useState('');
  const [folders, setFolders] = useState([
    {
      id: 0,
      created_at: '',
      name: '',
      favorite: false,
      link_count: 0,
    },
  ]);
  const [currentFolder, setCurrentFolder] =
    useState<FolderInterface>(All_FOLDER);
  const [links, setLinks] = useState<LinkInterface[]>();
  const [filteredLinks, setFilteredLinks] = useState<LinkInterface[]>();
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
      const nextFolders: FolderInterface[] = await getFolders(0);
      setFolders(nextFolders);
    }
  };

  const handleLoadItems = async () => {
    if (user) {
      let nextLinks;
      nextLinks = await getLinks(currentFolderId ? Number(currentFolderId) : 0);
      setLinks(nextLinks);
      const nextCurrentFolder = await getFolders(
        currentFolderId ? Number(currentFolderId) : 0
      );
      setCurrentFolder(
        nextCurrentFolder.length === 1 ? nextCurrentFolder[0] : All_FOLDER
      );
      handleFilterItems(nextLinks);
    }
  };

  const handleAddFolderButtonClick = () => {
    setIsVisibleAddFolderModal(true);
  };

  const handleFilterItems = (prevLinks: LinkInterface[]) => {
    if (prevLinks) {
      const nextFilteredLinks = prevLinks.filter(
        (prevLink) =>
          prevLink.url?.includes(searchText) ||
          prevLink.title?.includes(searchText) ||
          prevLink.description?.includes(searchText)
      );
      setFilteredLinks(nextFilteredLinks);
    }
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

  useEffect(() => {
    if (links) {
      handleFilterItems(links);
    }
  }, [searchText]);

  return (
    <Layout>
      <S.StyledTopWrap>
        <LinkInput folders={folders} />
      </S.StyledTopWrap>
      <SectionWrap>
        <Search text={searchText} setText={setSearchText} />
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
        {(!links?.length ||
          (links && searchText && filteredLinks?.length === 0)) && (
          <S.NoData>저장된 링크가 없습니다</S.NoData>
        )}
        {links && (
          <CardList
            items={searchText ? filteredLinks : links}
            folders={folders}
          />
        )}
      </SectionWrap>
      {isVisibleAddFolderModal && (
        <AddFolderModal onClose={setIsVisibleAddFolderModal} />
      )}
      {isVisibleShareFolderModal && (
        <ShardFolderModal
          currentFolder={currentFolder}
          onClose={setIsVisibleShareFolderModal}
        />
      )}
      {isVisibleChangeFolderNameModal && (
        <EditFolderNameModal
          currentFolder={currentFolder}
          onClose={setIsVisibleChangeFolderNameModal}
        />
      )}
      {isVisibleDeleteFolderModal && (
        <DeleteFolderModal
          currentFolder={currentFolder}
          onClose={setIsVisibleDeleteFolder}
        />
      )}
    </Layout>
  );
}
