import React, { useCallback, useContext, useEffect, useState } from 'react';
import Search from '../../components/Search/Search';
import { getFolders, getLinks, getUser } from '../../apis/api';
import { Layout, SectionWrap, TopWrap } from '../../styles/CommonPage.styled';
import * as S from '../../styles/SharedPage.styled';
import Profile from '../../components/Profile/Profile';
import CardList from '../../components/CardList/CardList';
import { useRouter } from 'next/router';
import { UserContext } from '@/contexts/UserContext';

export default function SharedPage() {
  const { user } = useContext(UserContext);
  const [links, setLinks] = useState([]);
  const [folderName, setFolderName] = useState();

  interface ParamsType {
    folderId: number;
  }

  const router = useRouter();
  const { folderId } = router.query as unknown as ParamsType;

  const handleLoad = useCallback(async () => {
    const nextLinks = await getLinks(folderId || 0);
    const { name: nextFolderName } = await getFolders(1, folderId);
    setLinks(nextLinks);
    setFolderName(nextFolderName);
  }, [folderId]);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

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
        <Search />
        {links && <CardList items={links} />}
      </SectionWrap>
    </Layout>
  );
}
