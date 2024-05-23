import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getFolderUser, getFolders, getLinks } from '@/apis/api';
import { LinkInterface, UserInterface } from '@/interfaces';
import Search from '@/components/Search/Search';
import Profile from '@/components/Profile/Profile';
import CardList from '@/components/CardList/CardList';
import * as S from '@/styles/SharedPage.styled';
import { Layout, SectionWrap, TopWrap } from '@/styles/CommonPage.styled';

export default function SharedPage() {
  const router = useRouter();
  const { folderId } = router.query;

  const [searchText, setSearchText] = useState('');
  const [links, setLinks] = useState<LinkInterface[]>();
  const [filteredLinks, setFilteredLinks] = useState<LinkInterface[]>();
  const [folderName, setFolderName] = useState();
  const [user, setUser] = useState<UserInterface>();

  const handleLoad = async () => {
    if (folderId) {
      const nextFolder = await getFolders(Number(folderId));

      const nextFolderName =
        nextFolder.length === 1 ? nextFolder[0].name : '전체';
      setFolderName(nextFolderName);

      const nextUser = await getFolderUser(nextFolder[0]?.user_id);
      setUser(nextUser);
    }
  };

  const handleLinksLoad = async () => {
    if (user) {
      const nextLinks = await getLinks(user.id, Number(folderId));
      setLinks(nextLinks);
    }
  };

  const handleFilterItems = () => {
    if (links) {
      const nextFilteredLinks = links.filter(
        (link) =>
          link.url?.includes(searchText) ||
          link.title?.includes(searchText) ||
          link.description?.includes(searchText)
      );
      setFilteredLinks(nextFilteredLinks);
    }
  };

  useEffect(() => {
    handleFilterItems();
  }, [searchText]);

  useEffect(() => {
    handleLoad();
  }, [folderId]);

  useEffect(() => {
    handleLinksLoad();
  }, [user]);

  return (
    <Layout>
      <TopWrap>
        <Profile
          src={user?.image_source}
          $size='m'
          user={user?.name}
          $flextype='column'
        />
        <S.Title>{folderName}</S.Title>
      </TopWrap>
      <SectionWrap>
        <Search text={searchText} setText={setSearchText} />
        {(!links?.length ||
          (links && searchText && filteredLinks?.length === 0)) && (
          <S.NoData>저장된 링크가 없습니다</S.NoData>
        )}
        {links && <CardList items={searchText ? filteredLinks : links} />}
      </SectionWrap>
    </Layout>
  );
}
