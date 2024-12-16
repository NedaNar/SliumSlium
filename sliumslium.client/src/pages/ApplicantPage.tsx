import "./applicantPage.css";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Pagination from "./HomePage/Pagination";
import { JobOffer } from "../api/apiModel";
import useFetch from "../api/useDataFetching";
import { useParams } from "react-router";

export function ApplicantPage() {
  const { id } = useParams();

  const { user } = useContext(UserContext);
  const { data: offers } = useFetch<JobOffer[]>(`JobOffer/applicant/${id}`);

  return (
    <>
      {user && (
        <>
          <h1 className="applPage__title">My profile</h1>
          <div className="card applPage__personalInfo">
            <p className="applPage__personalTitle">Personal information</p>
            <div className="row valign-wrapper applPage__personalRow">
              <i className="material-icons">person</i>
              <p className="applPage__text">{user.name}</p>
            </div>
            <div className="row valign-wrapper applPage__personalRow">
              <i className="material-icons">email</i>
              <p className="applPage__text">{user.email}</p>
            </div>
          </div>
          {offers && (
            <>
              <p className="applPage__applTitle">Applications</p>
              <Pagination jobOffers={offers} />
            </>
          )}
        </>
      )}
    </>
  );
}
