import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
import { getUser } from '../apis/api';
import { User } from '@/src/interfaces';

interface UserContextValue {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
}

export const UserContext = createContext<UserContextValue>({
  user: undefined,
  setUser: () => {},
});

interface Props {
  children: ReactNode;
}

export function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User | undefined>(undefined);

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
