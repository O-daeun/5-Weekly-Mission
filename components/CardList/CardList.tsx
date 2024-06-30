import { FolderInterface, LinkInterface } from '@/interfaces';
import Card from '../Card/Card';
import * as S from './CardList.styled';

interface Props {
  items: LinkInterface[] | undefined;
  folders?: FolderInterface[];
}

export default function CardList({ items, folders }: Props) {
  return (
    <S.List>
      {items?.map((item) => (
        <Card key={item.id} item={item} folders={folders} />
      ))}
    </S.List>
  );
}
