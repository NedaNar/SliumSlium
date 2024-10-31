import { useContext, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileUpload, FileUploadDTO, JobPart } from "../api/apiModel";
import { UserContext } from "../context/UserContext";
import usePost from "../api/useDataPosting";
import { toastError, toastSuccess } from "../utils/toastUtils";
import useDelayedFetch from "../api/useDelayedDataFetching";
import { format } from "date-fns";
import {
  getCloudinarySignature,
  toBase64,
  uploadFileToCloudinary,
} from "../utils/fileUploadUtils";

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFile, setUploadedFile] = useState<FileUpload | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const { user } = useContext(UserContext);

  const { data: fileData, fetchData } = useDelayedFetch<FileUpload>(
    `FileUpload/${user?.id_User}&${part.id_Part}`
  );

  const { error, responseData, postData } = usePost<FileUploadDTO, FileUpload>(
    "FileUpload/upload"
  );

  useEffect(() => {
    if (isCurrent && applied) {
      const collapsible = document.querySelectorAll(".collapsible");
      const instance = M.Collapsible.init(collapsible);
      instance[0].open(0);
    }
  }, [isCurrent]);

  useEffect(() => {
    if (user?.id_User && isCurrent && applied) {
      fetchData();
    }
  }, [user, isCurrent]);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0] || null);
    },
  });

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleCollapsibleClick = (e: React.MouseEvent) => {
    if (!applied || !isCurrent) {
      e.preventDefault();
      return;
    }
    setIsCollapsed((prev) => !prev);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    try {
      const { signature, timestamp } = await getCloudinarySignature();
      const fileData = await toBase64(selectedFile);
      const uploadResponse = await uploadFileToCloudinary(
        fileData,
        signature,
        timestamp
      );

      postData({
        partId: part.id_Part!,
        userId: user?.id_User!,
        filePath: uploadResponse.data.secure_url,
      });
    } catch (error) {
      toastError("Error uploading File!");
      setUploading(false);
    }
  };

  useEffect(() => {
    if (responseData) {
      toastSuccess("File uploaded!");
      setUploading(false);
      setUploadedFile(responseData);
    }
  }, [responseData]);

  useEffect(() => {
    if (fileData) {
      setUploadedFile(fileData);
    }
  }, [fileData]);

  useEffect(() => {
    if (error) toastError("Error uploading uploadedFile!");
    setUploading(false);
  }, [error]);

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
          {!uploadedFile && <p>{part.description}</p>}

          {part.requiresFiles && !uploadedFile && (
            <div className="uploadedFile-dropzone">
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
                  {selectedFile
                    ? "Replace the uploadedFile by dragging a new one here"
                    : "Drag & drop a uploadedFile here, or click to select a uploadedFile"}
                </p>
              </div>

              {selectedFile && (
                <>
                  <div className="valign-wrapper" style={{ marginTop: "1rem" }}>
                    <span>
                      {selectedFile.name} - {selectedFile.size} bytes
                    </span>
                    <button
                      style={{ padding: "2px 8px 0" }}
                      onClick={handleRemoveFile}
                      className="btn-flat"
                    >
                      <i className="tiny material-icons">close</i>
                    </button>
                  </div>
                  {selectedFile && (
                    <button
                      disabled={uploading}
                      style={{ margin: "1rem 0 0" }}
                      onClick={handleFileUpload}
                      className="btn indigo lighten-2"
                    >
                      {uploading ? "Uploading..." : "Submit"}
                    </button>
                  )}
                </>
              )}
            </div>
          )}

          {uploadedFile && (
            <>
              <div className="valign-wrapper">
                <i className="material-icons green-text">check_circle</i>&nbsp;
                <p style={{ fontSize: "1.2rem" }}>Your file was submitted!</p>
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
