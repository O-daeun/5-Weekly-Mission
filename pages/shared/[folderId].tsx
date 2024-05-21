import React, { useContext, useEffect, useState } from 'react';
import Search from '../../components/Search/Search';
import { getFolders, getLinks } from '../../apis/api';
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

  const handleLoad = async () => {
    if (user) {
      const nextLinks = await getLinks(user.id, folderId);
      const nextFolders = await getFolders(user.id, folderId);

      const nextFolderName = nextFolders.length ? nextFolders[0].name : '전체';

      setLinks(nextLinks);
      setFolderName(nextFolderName);
    }
  };

  useEffect(() => {
    handleLoad();
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
        <Search />
        {links && <CardList items={links} />}
      </SectionWrap>
    </Layout>
  );
}
