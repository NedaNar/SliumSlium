import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { JobPart } from "../api/apiModel";

interface JobPartProps {
  part: JobPart;
  applied: boolean;
  isCurrent: boolean;
}

export default function JobOfferPart({
  part,
  applied,
  isCurrent,
}: JobPartProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const collapsibleRef = useRef<HTMLUListElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  useEffect(() => {
    if (isCurrent && applied) {
      const collapsible = document.querySelectorAll(".collapsible");
      const instance = M.Collapsible.init(collapsible);
      instance[0].open(0);
    }
  }, [isCurrent]);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      setUploadedFile(acceptedFiles[0] || null);
    },
  });

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  const handleCollapsibleClick = (e: React.MouseEvent) => {
    if (!applied || !isCurrent) {
      e.preventDefault();
      return;
    }
    setIsCollapsed((prev) => !prev);
  };

  return (
    <ul className="collapsible" ref={collapsibleRef}>
      <li>
        <div
          className="collapsible-header"
          onClick={handleCollapsibleClick}
          style={{
            cursor: applied && isCurrent ? "pointer" : "not-allowed",
            opacity: applied && isCurrent ? 1 : 0.5,
          }}
        >
          {isCollapsed && <i className="material-icons">keyboard_arrow_down</i>}
          {!isCollapsed && <i className="material-icons">keyboard_arrow_up</i>}
          {part.name}
        </div>

        <div className="collapsible-body">
          <p>{part.description}</p>

          {part.requiresFiles && (
            <div className="file-dropzone">
              <div
                {...getRootProps({
                  className: "dropzone",
                  style: {
                    border: "2px dashed #ccc",
                    padding: "1rem",
                    textAlign: "center",
                    marginTop: "1rem",
                  },
                })}
              >
                <input {...getInputProps()} />
                <p>
                  {uploadedFile
                    ? "Replace the file by dragging a new one here"
                    : "Drag & drop a file here, or click to select a file"}
                </p>
              </div>

              {uploadedFile && (
                <>
                  <div className="valign-wrapper" style={{ marginTop: "1rem" }}>
                    <span>
                      {uploadedFile.name} - {uploadedFile.size} bytes
                    </span>
                    <button
                      style={{ padding: "2px 8px 0" }}
                      onClick={handleRemoveFile}
                      className="btn-flat"
                    >
                      <i className="tiny material-icons">close</i>
                    </button>
                  </div>
                  {uploadedFile && (
                    <button
                      style={{ margin: "1rem 0 0" }}
                      onClick={handleRemoveFile}
                      className="btn indigo lighten-2"
                    >
                      Submit
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </li>
    </ul>
  );
}
