import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface UserContextType {
  userName: string;
  setUserName: (name: string) => void;
}

export const UserContext = createContext<UserContextType>({
  userName: '',
  setUserName: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userName, setUserName] = useState<string>(() => {
    const savedName = localStorage.getItem('userName');
    return savedName || '';
  });

  useEffect(() => {
    if (userName) {
      localStorage.setItem('userName', userName);
    }
  }, [userName]);

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};