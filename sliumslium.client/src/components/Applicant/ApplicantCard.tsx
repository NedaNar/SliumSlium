import { useNavigate } from "react-router-dom";
import "./applicantCard.css";
import { Applicant } from "../../api/apiModel";
import { StatusBadge } from "../StatusBadge";

interface ApplicantProps {
  applicant: Applicant;
}

export default function ApplicantCard({ applicant }: ApplicantProps) {
  const navigate = useNavigate();

  return (
    <div className="card applicant-card" onClick={() => navigate("")}>
      <div className="row valign-wrapper">
        <div className="col s8" style={{ padding: "1rem 2rem 1rem" }}>
          <h5
            className="card-title"
            style={{ fontSize: "1.3rem", margin: "0" }}
          >
            {applicant.name}
          </h5>
          <h6
            className="card-subtitle"
            style={{ fontSize: "1rem", margin: "0.5rem 0 0" }}
          >
            Application date: {applicant.date}
          </h6>
        </div>
        <div className="col s4 right">
          <StatusBadge status={applicant.status.trim()} />
        </div>

        <i className="material-icons arrow-icon">chevron_right</i>
      </div>
    </div>
  );
}
