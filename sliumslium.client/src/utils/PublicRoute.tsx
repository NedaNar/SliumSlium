import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const PublicRoute = ({ element }: any) => {
  const { user } = useContext(UserContext);

  return !user ? element : <Navigate to="/" />;
};

export default PublicRoute;
