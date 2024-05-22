import React, { useEffect, useState } from 'react';
import Search from '../../components/Search/Search';
import { getFolderUser, getFolders, getLinks, getUser } from '../../apis/api';
import { Layout, SectionWrap, TopWrap } from '../../styles/CommonPage.styled';
import * as S from '../../styles/SharedPage.styled';
import Profile from '../../components/Profile/Profile';
import CardList from '../../components/CardList/CardList';
import { useRouter } from 'next/router';
import { User } from '@/src/interfaces';

export default function SharedPage() {
  const [links, setLinks] = useState([]);
  const [folderName, setFolderName] = useState();
  const [user, setUser] = useState<User>();

  interface ParamsType {
    folderId: number;
  }

  const router = useRouter();
  const { folderId } = router.query as unknown as ParamsType;

  const handleLoad = async () => {
    if (folderId) {
      const nextFolder = await getFolders(Number(folderId));

      const nextFolderName =
        nextFolder.length === 1 ? nextFolder[0].name : '전체';
      setFolderName(nextFolderName);

      const nextUser = await getFolderUser(nextFolder[0].user_id);
      setUser(nextUser);
    }
  };

  const handleLinksLoad = async () => {
    if (user) {
      const nextLinks = await getLinks(user.id, Number(folderId));
      setLinks(nextLinks);
    }
  };

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
        <Search />
        {links && <CardList items={links} />}
      </SectionWrap>
    </Layout>
  );
}
