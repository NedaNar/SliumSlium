import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import JobOffersPage from "../JobOffers/JobOffersPage";
import OpenPositionsPage from "../OpenPositions/OpenPositionsPage";

export default function HomePage() {
  const { user } = useContext(UserContext);

  return (
    <>
      {(!user || user.type === 1) && <JobOffersPage />}
      {user && user.type === 0 && <OpenPositionsPage />}
    </>
  );
}
