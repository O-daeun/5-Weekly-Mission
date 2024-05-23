import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
import { getUser } from '../apis/api';
import { UserInterface } from '@/interfaces';

interface UserContextValue {
  user: UserInterface | undefined;
  setUser: Dispatch<SetStateAction<UserInterface | undefined>>;
}

export const UserContext = createContext<UserContextValue>({
  user: undefined,
  setUser: () => {},
});

interface Props {
  children: ReactNode;
}

export function UserProvider({ children }: Props) {
  const [user, setUser] = useState<UserInterface | undefined>(undefined);

  const handleLoadUser = async () => {
    const nextUser = await getUser();
    setUser(nextUser);
  };

  useEffect(() => {
    handleLoadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
