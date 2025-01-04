import {
  Context,
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

export interface UserContextProps {
  uuid: string;
  setUuid: (uuid: string) => void;
}

const UserContext: Context<UserContextProps> = createContext<UserContextProps>({
  uuid: "",
  setUuid: (): void => {},
});

export default function UserProvider({
  children,
}: PropsWithChildren): React.JSX.Element {
  const [uuid, setUuid] = useState<string>("");

  return (
    <UserContext.Provider
      value={{
        uuid,
        setUuid,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = (): UserContextProps => useContext(UserContext);
