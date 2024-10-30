import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { User, UserJobOffer } from "../api/apiModel";
import { useNavigate } from "react-router";
import useDelayedFetch from "../api/useDelayedDataFetching";
import { toastError } from "../utils/toastUtils";

interface UserProviderContextType {
  user: User | null;
  userJobOffers: UserJobOffer[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signUp: (user: Omit<User, "id_User">) => Promise<void>;
}

const defaultContext: UserProviderContextType = {
  user: null,
  userJobOffers: [],
  login: async () => {},
  logout: () => {},
  signUp: async () => {},
};

export const UserContext =
  createContext<UserProviderContextType>(defaultContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [userJobOffers, setUserJobOffers] = useState<UserJobOffer[]>([]);

  const { data: userJobOffersData, fetchData } = useDelayedFetch<
    UserJobOffer[]
  >(`UserJobOffer/user=${user?.id_User}`);

  useEffect(() => {
    const fetchAuthenticatedUser = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7091/api/User/User",
          { withCredentials: true }
        );

        setUser(response.data);
      } catch (error) {
        setUser(null);
      }
    };

    fetchAuthenticatedUser();
  }, []);

  useEffect(() => {
    if (user?.id_User) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    if (userJobOffersData) {
      setUserJobOffers(userJobOffersData);
    }
  }, [userJobOffersData]);

  const login = async (email: string, password: string) => {
    try {
      await axios.post(
        "https://localhost:7091/api/User/login",
        { email, password },
        { withCredentials: true }
      );
      const userResponse = await axios.get(
        "https://localhost:7091/api/User/User",
        { withCredentials: true }
      );

      setUser(userResponse.data);
      navigate("/");
    } catch (error) {
      toastError("Wrong email or password");
    }
  };

  const signUp = async (user: Omit<User, "id_User">) => {
    try {
      await axios.post("https://localhost:7091/api/User", user, {
        withCredentials: true,
      });
      const userResponse = await axios.get(
        "https://localhost:7091/api/User/User",
        { withCredentials: true }
      );

      setUser(userResponse.data);
      navigate("/");
    } catch (error: any) {
      if (error.status === 409) {
        toastError("Email already exists");
      } else {
        toastError("Error, please try again");
      }
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "https://localhost:7091/api/User/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      navigate("/");
    } catch (error) {
      toastError("Error, please try again");
    }
  };

  return (
    <UserContext.Provider
      value={{ user, userJobOffers, login, logout, signUp }}
    >
      {children}
    </UserContext.Provider>
  );
};
