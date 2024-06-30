import React, { useEffect, useState } from 'react';
import { FolderInterface } from '@/interfaces';
import * as S from './MenuLink.styled';

interface Props {
  folder?: FolderInterface;
  currentFolderId: string | string[];
}

export default function MenuLink({
  folder = {
    id: 0,
    name: '전체',
    created_at: '',
    favorite: false,
    link_count: 0,
  },
  currentFolderId,
}: Props) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(folder.id === Number(currentFolderId));
  }, [folder, currentFolderId]);

  return (
    <S.MenuLink
      $isActive={isActive}
      href={folder.id ? `/folder/${folder.id}` : '/folder'}
    >
      {folder.name}
    </S.MenuLink>
  );
}
