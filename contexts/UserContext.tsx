import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
import { getUser } from '../apis/api';

interface UserContextValue {
  user:
    | {
        id: number;
        created_at: string;
        name: string;
        image_source: string;
        email: string;
        auth_id: string;
      }
    | undefined;
  setUser:
    | Dispatch<SetStateAction<boolean>>
    | Dispatch<SetStateAction<undefined>>;
}

export const UserContext = createContext<UserContextValue>({
  user: undefined,
  setUser: () => {},
});

interface Props {
  children: ReactNode;
}

export function UserProvider({ children }: Props) {
  const [user, setUser] = useState();

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
