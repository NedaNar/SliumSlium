import { useNavigate, useParams } from "react-router";
import { Applicant, JobOffer } from "../../api/apiModel";
import useFetch from "../../api/useDataFetching";
import ApplicantCard from "../../components/Applicant/ApplicantCard";
import ApplicantFilters from "../../components/Applicant/ApplicantFilters";
import { useEffect, useState } from "react";
import JobInformation from "../../components/JobOffer/JobInformation";
import "./openPositionsPage.css";
import useDelete from "../../api/useDataDeleting";

export default function OpenPositionPage() {
  const { offerId } = useParams();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const navigate = useNavigate();

  const { data: offer } = useFetch<JobOffer | null>(`JobOffer/${offerId}`);
  const { deleteData, deleted } = useDelete<JobOffer>();

  const { data: applicantData } = useFetch<Applicant[]>(
    `JobOffer/${offerId}/applicants`
  );

  const handleFilterChange = (applicantData: Applicant[]) => {
    setApplicants(applicantData);
  };

  useEffect(() => {
    if (applicantData) setApplicants(applicantData);
  }, [applicantData]);

  useEffect(() => {
    if (deleted) {
      navigate("/");
    }
  }, [deleted]);

  return (
    <>
      {offer && (
        <div className="container openPosition__box">
          <div className="row">
            <div className="col s12 m6 l7 openPosition__col">
              <h1 className="openPosition__job">{offer.name}</h1>
              <p>{offer.companyName}</p>
              <p className="openPosition__desc">{offer.description}</p>

              <button
                className="btn-small red left openPositions__delete"
                onClick={() => deleteData(`JobOffer/${offer.id_JobOffer}`)}
              >
                <div className="valign-wrapper">
                  Remove position &nbsp;
                  <i className="material-icons">delete_forever</i>
                </div>
              </button>
            </div>

            <div className="col s12 m6 l5">
              <div className="card openPosition__offer">
                <JobInformation offer={offer} />
              </div>
            </div>
          </div>

          <div className="row">
            <h2 className="openPosition__appl">
              Applicants ({applicants?.length})
            </h2>
            <ApplicantFilters
              offerId={Number(offerId)}
              onFilterChange={handleFilterChange}
            />
            {applicants &&
              applicants.map((appl, index) => (
                <ApplicantCard key={index} applicant={appl} offer={offer} />
              ))}
            {(!applicants || applicants.length === 0) && (
              <p className="center-align openPosition__noFound">
                No applicants found
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
