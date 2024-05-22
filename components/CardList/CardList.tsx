import Card from '../Card/Card';
import * as S from './CardList.styled';

interface Props {
  items: {
    id: number;
    created_at: string;
    url: string;
    title: string;
    image_source: string;
  }[];
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
