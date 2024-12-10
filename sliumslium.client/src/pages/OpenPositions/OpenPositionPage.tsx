import { useParams } from "react-router";
import { Applicant, JobOffer } from "../../api/apiModel";
import useFetch from "../../api/useDataFetching";
import ApplicantCard from "../../components/Applicant/ApplicantCard";
import ApplicantFilters from "../../components/Applicant/ApplicantFilters";
import { useEffect, useState } from "react";
import JobInformation from "../../components/JobOffer/JobInformation";

export default function OpenPositionPage() {
  const { offerId } = useParams();
  const [applicants, setApplicants] = useState<Applicant[]>([]);

  const { data: offer } = useFetch<JobOffer | null>(`JobOffer/${offerId}`);

  const { data: applicantData } = useFetch<Applicant[]>(
    `JobOffer/${offerId}/applicants`
  );

  const handleFilterChange = (applicantData: Applicant[]) => {
    setApplicants(applicantData);
  };

  useEffect(() => {
    if (applicantData) setApplicants(applicantData);
  }, [applicantData]);

  return (
    <>
      {offer && (
        <div className="container" style={{ marginTop: "2rem", padding: 0 }}>
          <div className="row">
            <div className="col s12 m6 l7">
              <h4>{offer.name}</h4>
              <p>{offer.companyName}</p>
              <p style={{ margin: "0 2rem 0 0" }}>{offer.description}</p>
            </div>

            <div className="col s12 m6 l5">
              <div
                className="card"
                style={{ padding: "1rem 2rem", marginTop: "2rem" }}
              >
                <JobInformation offer={offer} />
              </div>
            </div>
          </div>

          <div className="row">
            <h5 style={{ margin: "4rem 0 2rem" }}>
              Applicants ({applicants?.length})
            </h5>
            <ApplicantFilters
              offerId={Number(offerId)}
              onFilterChange={handleFilterChange}
            />
            {applicants &&
              applicants.map((appl, index) => (
                <ApplicantCard key={index} applicant={appl} offer={offer} />
              ))}
            {(!applicants || applicants.length === 0) && (
              <h5 className="center-align">No applicants found :(</h5>
            )}
          </div>
        </div>
      )}
    </>
  );
}
