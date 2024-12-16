import { useContext, useEffect, useState } from "react";
import { FileUpload, JobPart } from "../../api/apiModel";
import { UserContext } from "../../context/UserContext";
import useDelayedFetch from "../../api/useDelayedDataFetching";
import { format } from "date-fns";
import FileUploadComponent from "./FileUploadComponent";
import "./jobOfferPart.css";

interface JobPartProps {
  part: JobPart;
  applied: boolean;
  partNumber: number;
  currentPart: number | undefined;
}

export default function JobOfferPart({
  part,
  partNumber,
  applied,
  currentPart,
}: JobPartProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [uploadedFile, setUploadedFile] = useState<FileUpload | null>(null);
  const [isCurrent, setIsCurrent] = useState(false);

  const { user } = useContext(UserContext);

  const { data: fileData, fetchData } = useDelayedFetch<FileUpload>(
    `FileUpload/${user?.id_User}&${part.id_Part}`
  );

  const handleCollapsibleClick = (e: React.MouseEvent) => {
    if (!applied || !isCurrent) {
      e.preventDefault();
      return;
    }
    setIsCollapsed((prev) => !prev);
  };

  const handleFileUploadComplete = (file: FileUpload) => {
    setUploadedFile(file);
  };

  useEffect(() => {
    if (currentPart) setIsCurrent(Number(currentPart) === partNumber);
  }, [currentPart]);

  useEffect(() => {
    if (isCurrent && applied) {
      const collapsible = document.querySelector(`#collapsible${part.id_Part}`);
      if (collapsible) {
        const instance = M.Collapsible.init(collapsible);
        instance.open(0);
      }
    }
  }, [isCurrent]);

  useEffect(() => {
    if (user?.id_User && isCurrent && applied) {
      fetchData();
    }
  }, [user, isCurrent]);

  useEffect(() => {
    if (fileData) {
      setUploadedFile(fileData);
    }
  }, [fileData]);

  return (
    <ul className="collapsible" id={`collapsible${part.id_Part?.toString()}`}>
      <li>
        <div
          className={`collapsible-header ${
            applied && isCurrent
              ? "jobOfferPart--enabled"
              : "jobOfferPart--disabled"
          }`}
          onClick={handleCollapsibleClick}
        >
          {!currentPart ||
            (partNumber >= currentPart && isCollapsed && (
              <i className="material-icons">keyboard_arrow_down</i>
            ))}
          {!currentPart ||
            (partNumber >= currentPart && !isCollapsed && (
              <i className="material-icons">keyboard_arrow_up</i>
            ))}
          {currentPart && partNumber < currentPart && (
            <i className="material-icons green-text">check</i>
          )}
          {part.name}
        </div>

        <div className="collapsible-body">
          {!uploadedFile && <p>{part.description}</p>}

          {part.requiresFiles && !uploadedFile && (
            <FileUploadComponent
              partId={part.id_Part!}
              userId={user?.id_User!}
              onFileUploadComplete={handleFileUploadComplete}
            />
          )}

          {uploadedFile && (
            <>
              <div className="valign-wrapper">
                <i className="material-icons green-text">check_circle</i>&nbsp;
                <p className="jobOfferPart__text">Your file was submitted!</p>
              </div>
              <p>
                Upload date:{" "}
                {format(new Date(uploadedFile.uploadDate), "yyyy-MM-dd")}
              </p>
              <p>Please wait for the hiring manager to review it.</p>
            </>
          )}
        </div>
      </li>
    </ul>
  );
}
