import { createContext, useContext } from 'react';

export const UserContext = createContext<{
  user: any;
  username: string | null;
}>({ user: null, username: null });

export const useUserContext = () => {
  if (!UserContext) {
    throw new Error(
      'useUserContext must be used within the UserContext Provider!'
    );
  }
  return useContext(UserContext);
};
