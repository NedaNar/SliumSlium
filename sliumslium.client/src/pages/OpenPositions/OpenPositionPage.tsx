import { useLocation } from "react-router";
import { Applicant } from "../../api/apiModel";
import useFetch from "../../api/useDataFetching";
import { getExperience, getPartTime, getRemote } from "../../utils/enumUtils";
import ApplicantCard from "../../components/Applicant/ApplicantCard";
import ApplicantFilters from "../../components/Applicant/ApplicantFilters";

export default function OpenPositionPage() {
  const location = useLocation();
  const offer = location.state?.offer;

  const { data: applicants } = useFetch<Applicant[]>(
    `JobOffer/${offer.id_JobOffer}/applicants`
  );

  return (
    <>
      {offer && (
        <div className="container" style={{ marginTop: "2rem", padding: 0 }}>
          <div className="row">
            <div className="col s12 m6 l7">
              <h4>{offer.name}</h4>
              <p>{offer.companyName}</p>
              <p style={{ margin: "0 2rem 0 0" }}>{offer.description}</p>
              <button className="btn indigo" style={{ margin: "2rem 0 0" }}>
                <div className="valign-wrapper">
                  Close position &nbsp;
                  <i className="tiny material-icons">close</i>
                </div>
              </button>
            </div>

            <div className="col s12 m6 l5">
              <div
                className="card"
                style={{ padding: "1rem 2rem", marginTop: "2rem" }}
              >
                <div
                  className="row valign-wrapper"
                  style={{ margin: "0.3rem 0" }}
                >
                  <i className="tiny material-icons">place</i>
                  <strong>&nbsp;&nbsp;Location:&nbsp;</strong>
                  {offer.location}
                </div>
                <div
                  className="row valign-wrapper"
                  style={{ margin: "0.3rem 0" }}
                >
                  <i className="tiny material-icons">show_chart</i>
                  <strong>&nbsp;&nbsp;Experience:&nbsp;</strong>
                  {getExperience(offer.experienceLevel)}
                </div>
                <div
                  className="row valign-wrapper"
                  style={{ margin: "0.3rem 0" }}
                >
                  <i className="tiny material-icons">apartment</i>
                  <strong>&nbsp;&nbsp;Remote:&nbsp;</strong>
                  {getRemote(offer.workEnvironment)}
                </div>
                <div
                  className="row valign-wrapper"
                  style={{ margin: "0.3rem 0" }}
                >
                  <i className="tiny material-icons">schedule</i>
                  <strong>&nbsp;&nbsp;Part Time:&nbsp;</strong>
                  {getPartTime(offer.partTime)}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <h5 style={{ margin: "4rem 0 2rem" }}>
              Applicants ({applicants?.length})
            </h5>
            <ApplicantFilters
              onFilterChange={function (filters: any): void {
                throw new Error("Function not implemented.");
              }}
            />
            {applicants &&
              applicants.map((appl, index) => (
                <ApplicantCard key={index} applicant={appl} />
              ))}
            {!applicants && <h3>No applicants yet</h3>}
          </div>
        </div>
      )}
    </>
  );
}
