/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getFolderUser, getFolders, getLinks } from '@/apis/api';
import { LinkInterface, UserInterface } from '@/interfaces';
import Search from '@/components/Search/Search';
import Profile from '@/components/Profile/Profile';
import CardList from '@/components/CardList/CardList';
import * as S from '@/styles/SharedPage.styled';
import { Layout, SectionWrap, TopWrap } from '@/styles/CommonPage.styled';
import { useQuery } from '@tanstack/react-query';

export default function SharedPage() {
  const router = useRouter();
  const { folderId } = router.query;

  const [searchText, setSearchText] = useState('');
  const [links, setLinks] = useState<LinkInterface[]>();
  const [filteredLinks, setFilteredLinks] = useState<LinkInterface[]>();
  const [folderName, setFolderName] = useState();
  const [user, setUser] = useState<UserInterface>();

  const { data: nextFolder } = useQuery({
    queryKey: ['folder', folderId],
    queryFn: () => getFolders(Number(folderId)),
    enabled: !!folderId,
    staleTime: 60 * 1000,
  });

  const { data: nextUser } = useQuery({
    queryKey: ['user'],
    queryFn: () => getFolderUser(nextFolder[0]?.user_id),
    enabled: !!nextFolder,
    staleTime: 60 * 1000,
  });
  const { data: nextLinks } = useQuery({
    queryKey: ['links', folderId],
    queryFn: () => getLinks(Number(folderId)),
    enabled: !!user,
    staleTime: 60 * 1000,
  });

  const handleLoad = async () => {
    if (nextFolder) {
      const nextFolderName =
        nextFolder.length === 1 ? nextFolder[0].name : '전체';
      setFolderName(nextFolderName);
      setUser(nextUser);
    }
  };

  const handleLinksLoad = async () => {
    setLinks(nextLinks);
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
  }, [nextFolder, nextUser]);

  useEffect(() => {
    handleLinksLoad();
  }, [nextLinks]);

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
