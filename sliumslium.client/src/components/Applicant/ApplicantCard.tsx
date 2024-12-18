import "./applicantCard.css";
import {
  Applicant,
  ApplicantUpdateDTO,
  FileUpload,
  JobOffer,
} from "../../api/apiModel";
import { useEffect, useState } from "react";
import { STATUS_OPTIONS } from "../../utils/enumUtils";
import useDelayedFetch from "../../api/useDelayedDataFetching";
import { format } from "date-fns";
import useUpdate from "../../api/useDataUpdating";
import { toastError, toastSuccess } from "../../utils/toastUtils";

interface ApplicantProps {
  applicant: Applicant;
  offer: JobOffer;
}

export default function ApplicantCard({ applicant, offer }: ApplicantProps) {
  const [expanded, setExpanded] = useState(false);
  const [newStatus, setNewStatus] = useState(applicant.status);
  const [newPart, setNewPart] = useState(applicant.currentPart);
  const [updated, setUpdated] = useState(false);
  const currentPart = offer.parts
    ? offer.parts[applicant.currentPart - 1]
    : null;

  const { data: file, fetchData } = useDelayedFetch<FileUpload>(
    `FileUpload/${applicant.id}&${offer.parts && currentPart?.id_Part}`
  );
  const { responseData, error, updateData } = useUpdate<
    ApplicantUpdateDTO,
    ApplicantUpdateDTO
  >();

  const handleApplicantUpdate = () => {
    updateData(
      {
        status: newStatus,
        currentPart: newPart,
      },
      `UserJobOffer/${applicant.userJobOfferId}`
    );
  };

  useEffect(() => {
    if (expanded) {
      const elems = document.querySelectorAll("select");
      M.FormSelect.init(elems);
    }
  }, [newStatus, expanded]);

  useEffect(() => {
    if (newStatus === "Submitted" && newPart > 1) {
      setNewStatus("In Progress");
    }
  }, [newPart]);

  useEffect(() => {
    if (currentPart?.requiresFiles) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (responseData) {
      toastSuccess("Application updated!");
      setUpdated(false);
    }
  }, [responseData]);

  useEffect(() => {
    if (error) {
      toastError("Update failed!");
    }
  }, [error]);

  return (
    <div tabIndex={0}>
      <div
        className="card applicant-card"
        style={{ paddingBottom: expanded ? "1rem" : 0 }}
      >
        <div
          className="row valign-wrapper"
          onClick={() => setExpanded((prev) => !prev)}
          style={{ cursor: "pointer" }}
        >
          <div className="col s12" style={{ padding: "1rem 2rem 1rem" }}>
            <h1
              className="card-title"
              style={{ fontSize: "1.3rem", margin: "0" }}
            >
              {applicant.name}
            </h1>
            <h2
              className="card-subtitle"
              style={{ fontSize: "1rem", margin: "0.5rem 0 0" }}
            >
              Application date: {applicant.date}
            </h2>
          </div>

          <i className="material-icons arrow-icon-appl">
            {expanded ? "keyboard_arrow_up" : "keyboard_arrow_down"}
          </i>
        </div>
        {expanded && (
          <div
            className="row"
            style={{
              margin: "0.5rem 1.5rem 0.5rem ",
              padding: "1.5rem",
              backgroundColor: "#ECECEC",
              borderRadius: "4px",
            }}
          >
            <div className="col s12 m6">
              <p style={{ margin: "0 0 2rem 0" }}>APPLICATION INFO</p>

              <div className="row" style={{ margin: 0 }}>
                <div className="input-field">
                  <select
                    value={newPart}
                    onChange={(e) => {
                      setUpdated(true);
                      setNewPart(Number(e.target.value));
                    }}
                  >
                    {offer.parts &&
                      offer.parts.map((part, index) => (
                        <option key={part.id_Part} value={index + 1}>
                          {index + 1}. {part.name}
                        </option>
                      ))}
                  </select>
                  <label>Current step</label>
                </div>
              </div>

              <div className="row" style={{ margin: 0 }}>
                <div className="input-field">
                  <select
                    value={newStatus}
                    onChange={(e) => {
                      setNewStatus(e.target.value);
                      setUpdated(true);
                    }}
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <label>Application status</label>
                </div>
              </div>

              <button
                className="btn-small indigo lighten-1"
                onClick={handleApplicantUpdate}
                disabled={!updated}
              >
                Update
              </button>
            </div>

            <div className="col s12 m6 applicant-contacts">
              <p style={{ margin: "0 0 0.6rem" }}>CONTACTS</p>
              <div className="valign-wrapper">
                <i className="material-icons tiny">email</i>&nbsp;
                <p style={{ margin: "0" }}>{applicant.email}</p>
              </div>

              <p style={{ margin: "1.5rem 0 0.6rem" }}>FILE UPLOAD</p>

              <div className="valign-wrapper">
                <i className="material-icons tiny">upload_file</i>&nbsp;
                <p style={{ margin: "0 0 0" }}>
                  {file
                    ? `Upload date ${format(file.uploadDate, "yyyy-MM-dd")}`
                    : "-"}
                </p>
              </div>

              {file && (
                <a
                  href={file.filePath}
                  className="btn-small indigo lighten-1"
                  style={{ marginTop: "0.7rem" }}
                >
                  <div className="valign-wrapper">
                    Download&nbsp;
                    <i className="material-icons">download</i>
                  </div>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
