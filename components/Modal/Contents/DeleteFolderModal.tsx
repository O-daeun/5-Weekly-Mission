import ModalLayout from '../ModalLayout';
import * as S from '../Modal.styled';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFolder } from '@/apis/api';
import { useRouter } from 'next/router';
import { FolderInterface } from '@/interfaces';

interface DeleteFolderModalProps {
  currentFolder: FolderInterface;
}

export default function DeleteFolderModal({
  currentFolder,
}: DeleteFolderModalProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const deleteFolderMutation = useMutation({
    mutationFn: (id: number) => deleteFolder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
      router.replace('/folder');
    },
  });

  const handleClick = () => {
    deleteFolderMutation.mutate(currentFolder.id);
  };

  return (
    <ModalLayout title='폴더 삭제'>
      <S.SemiTitle>{currentFolder.name}</S.SemiTitle>
      <S.StyledButton text='삭제하기' type='submit' onClick={handleClick} />
    </ModalLayout>
  );
}
