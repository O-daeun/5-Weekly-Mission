import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface ModalValue {
  isOpen: boolean;
  content: string | null;
}
interface ModalContextValue {
  modal: ModalValue;
  setModal: Dispatch<React.SetStateAction<ModalValue>>;
}

const defaultModalValue: ModalContextValue = {
  modal: {
    isOpen: false,
    content: null,
  },
  setModal: () => {},
};

const ModalContext = createContext<ModalContextValue>(defaultModalValue);

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modal, setModal] = useState<ModalValue>({
    isOpen: false,
    content: null,
  });

  const contextValue = useMemo(
    () => ({
      modal,
      setModal,
    }),
    [modal, setModal]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('반드시 ModalProvider 안에서 사용해야 합니다');
  }

  return context.modal;
}

export function useSetModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('반드시 ModalProvider 안에서 사용해야 합니다');
  }

  return context.setModal;
}
