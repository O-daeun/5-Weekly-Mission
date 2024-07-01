import { ReactNode, createContext, useState } from 'react';

interface ModalValue {
  isOpen: boolean;
  content: ReactNode | undefined;
}

interface ModalContextValue {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  modal: ModalValue;
}

const ModalContext = createContext<ModalContextValue>({
  setIsOpen: undefined,
  modal: {
    isOpen: false,
    content: undefined,
  },
});

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState({
    isOpen,
    content: undefined,
  });

  return (
    <ModalContext.Provider value={{ setIsOpen, modal }}>
      {children}
    </ModalContext.Provider>
  );
}
