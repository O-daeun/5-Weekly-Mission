import ModalLayout from '../ModalLayout';
import * as S from '../Modal.styled';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLink } from '@/apis/api';

interface DeleteLinkModalProps {
  link: string;
  linkId: number;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteLinkModal({
  link,
  linkId,
  onClose,
}: DeleteLinkModalProps) {
  const queryClient = useQueryClient();
  const deleteLinkMutation = useMutation({
    mutationFn: (linkId: number) => deleteLink(linkId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
    },
  });

  const handleClick = () => {
    deleteLinkMutation.mutate(linkId);
    onClose(false);
  };

  return (
    <ModalLayout title='링크 삭제' onClose={onClose}>
      <S.SemiTitle>{link}</S.SemiTitle>
      <S.StyledButton text='삭제하기' type='submit' onClick={handleClick} />
    </ModalLayout>
  );
}
