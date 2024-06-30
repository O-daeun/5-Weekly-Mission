/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface FolderIdContextValue {
  folderId: string | string[] | undefined;
}

const FolderIdContext = createContext<FolderIdContextValue>({
  folderId: undefined,
});

interface FolderIdProviderProps {
  children: ReactNode;
}

export function FolderIdProvider({ children }: FolderIdProviderProps) {
  const router = useRouter();
  const { currentFolderId } = router.query;
  const [folderId, setFolderId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const nextFolderId = Array.isArray(currentFolderId)
      ? currentFolderId[0]
      : currentFolderId;
    setFolderId(nextFolderId);
  }, [currentFolderId]);

  return (
    <FolderIdContext.Provider value={{ folderId }}>
      {children}
    </FolderIdContext.Provider>
  );
}

export function useFolderId() {
  const context = useContext(FolderIdContext);

  if (!context) {
    throw new Error('반드시 FolderIdProvider 안에서 사용해야 합니다');
  }

  const { folderId } = context;

  return folderId;
}
