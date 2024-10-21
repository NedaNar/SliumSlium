import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { User } from "../api/apiModel";
import { useNavigate } from "react-router";

interface UserProviderContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signUp: (user: Omit<User, "id_User">) => Promise<void>;
}

const defaultContext: UserProviderContextType = {
  user: null,
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
      M.toast({
        html: "Wrong email or password",
        classes: "red",
      });
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
        M.toast({
          html: "Email already exists",
          classes: "red",
        });
      } else {
        M.toast({
          html: "Error, please try again",
          classes: "red",
        });
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
    } catch (error) {
      M.toast({
        html: "Error, please try again",
        classes: "red",
      });
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, signUp }}>
      {children}
    </UserContext.Provider>
  );
};
