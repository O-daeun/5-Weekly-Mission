import { LinkInterface } from '@/interfaces';
import Card from '../Card/Card';
import * as S from './CardList.styled';

interface Props {
  items: LinkInterface[] | undefined;
  folderNames?: string[];
  itemCountsInEachFolder?: number[];
}

export default function CardList({
  items,
  folderNames,
  itemCountsInEachFolder,
}: Props) {
  return (
    <S.List>
      {items?.map((item) => (
        <Card
          key={item.id}
          item={item}
          folderNames={folderNames}
          itemCountsInEachFolder={itemCountsInEachFolder}
        />
      ))}
    </S.List>
  );
}
