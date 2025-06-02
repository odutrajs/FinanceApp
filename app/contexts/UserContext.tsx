"use client";

import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { getMe } from "../(auth)/services/get-me";

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  sharedWithPhones: string[];
};

type UserContextType = {
  user: User | undefined;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType>({
  user: undefined,
  isLoading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["userMe"],
    queryFn: getMe,
    retry: false,
  });

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
