import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FileUpload, FileUploadDTO } from "../../api/apiModel";
import usePost from "../../api/useDataPosting";
import {
  getCloudinarySignature,
  toBase64,
  uploadFileToCloudinary,
} from "../../utils/fileUploadUtils";
import { toastError, toastSuccess } from "../../utils/toastUtils";

interface FileUploadComponentProps {
  partId: number;
  userId: number;
  onFileUploadComplete: (file: FileUpload) => void;
}

export default function FileUploadComponent({
  partId,
  userId,
  onFileUploadComplete,
}: FileUploadComponentProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { error, responseData, postData } = usePost<FileUploadDTO, FileUpload>(
    "FileUpload/upload"
  );

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => setSelectedFile(acceptedFiles[0] || null),
  });

  const handleRemoveFile = () => {
    setSelectedFile(null);
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
        partId,
        userId,
        filePath: uploadResponse.secure_url.replace(
          "/upload/",
          "/upload/fl_attachment/"
        ),
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
      onFileUploadComplete(responseData);
    }
  }, [responseData]);

  useEffect(() => {
    if (error) {
      toastError("Error uploading file!");
      setUploading(false);
    }
  }, [error]);

  return (
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
          {selectedFile
            ? "Replace the file by dragging a new one here"
            : "Drag & drop a file here, or click to select a file"}
        </p>
      </div>

      {selectedFile && (
        <>
          <div className="valign-wrapper" style={{ marginTop: "1rem" }}>
            <span>
              {selectedFile.name} - {selectedFile.size} bytes
            </span>
            <button onClick={handleRemoveFile} className="btn-flat">
              <i className="tiny material-icons">close</i>
            </button>
          </div>
          <button
            disabled={uploading}
            onClick={handleFileUpload}
            className="btn indigo lighten-2"
          >
            {uploading ? "Uploading..." : "Submit"}
          </button>
        </>
      )}
    </div>
  );
}
