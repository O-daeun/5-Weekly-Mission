import ModalLayout from '../ModalLayout';
import * as S from '../Modal.styled';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLink } from '@/apis/api';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const deleteLinkMutation = useMutation({
    mutationFn: (linkId: number) => deleteLink(linkId),
    onSuccess: () => {
      // queryClient.invalidateQueries('link');
      router.reload();
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
