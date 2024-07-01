import ModalLayout from '../ModalLayout';
import * as S from '../Modal.styled';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLink } from '@/apis/api';
import { useSetModal } from '@/contexts/ModalContext';

interface DeleteLinkModalProps {
  link: string;
  linkId: number;
}

export default function DeleteLinkModal({
  link,
  linkId,
}: DeleteLinkModalProps) {
  const setModal = useSetModal();
  const queryClient = useQueryClient();
  const deleteLinkMutation = useMutation({
    mutationFn: (linkId: number) => deleteLink(linkId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
    },
  });

  const handleClick = () => {
    deleteLinkMutation.mutate(linkId);
    setModal({ isOpen: false, content: '' });
  };

  return (
    <ModalLayout title='링크 삭제'>
      <S.SemiTitle>{link}</S.SemiTitle>
      <S.StyledButton text='삭제하기' type='submit' onClick={handleClick} />
    </ModalLayout>
  );
}
