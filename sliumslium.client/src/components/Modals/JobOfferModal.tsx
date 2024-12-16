import { useState, useEffect, ChangeEvent, FormEvent, useContext } from "react";
import M from "materialize-css";
import "./modal.css";
import { JobOffer, JobPart } from "../../api/apiModel";
import {
  EXPERIENCE_OPTIONS,
  WORK_ENVIRONMENT_OPTIONS,
} from "../../utils/enumUtils";
import usePost from "../../api/useDataPosting";
import { UserContext } from "../../context/UserContext";
import { toastError, toastSuccess } from "../../utils/toastUtils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newOffer: JobOffer) => void;
}

interface FormData {
  name: string;
  description: string;
  salary: string;
  validDate: string;
  location: string;
  workEnvironment: number;
  experienceLevel: number;
  partTime: boolean;
  parts: JobPart[];
}

const defaultData = {
  name: "",
  description: "",
  salary: "",
  validDate: "",
  location: "",
  workEnvironment: 0,
  experienceLevel: 0,
  partTime: false,
  parts: [],
};

function JobOfferModal({ isOpen, onClose, onCreate }: ModalProps) {
  const { error, responseData, postData } = usePost<JobOffer, JobOffer>(
    "JobOffer"
  );
  const { user } = useContext(UserContext);

  const [currentPart, setCurrentPart] = useState(0);
  const [formData, setFormData] = useState<FormData>(defaultData);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleJobPartChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value } = e.target;
    const newJobParts = [...formData.parts];

    if (type === "checkbox") {
      const isChecked = (e.target as HTMLInputElement).checked;
      newJobParts[index] = { ...newJobParts[index], [name]: isChecked };
    } else {
      newJobParts[index] = { ...newJobParts[index], [name]: value };
    }

    setFormData({ ...formData, parts: newJobParts });
  };

  const addJobPart = () => {
    setFormData({
      ...formData,
      parts: [
        ...formData.parts,
        { name: "", description: "", requiresFiles: false },
      ],
    });
  };

  const removeJobPart = (index: number) => {
    const newJobParts = formData.parts.filter((_, i) => i !== index);
    setFormData({ ...formData, parts: newJobParts });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    postData({
      ...formData,
      salary: parseFloat(formData.salary),
      validDate: new Date(formData.validDate).toISOString(),
      workEnvironment: parseInt(formData.workEnvironment.toString(), 10),
      experienceLevel: parseInt(formData.experienceLevel.toString(), 10),
      companyName: user?.name ?? "",
      fk_UserId_User: user?.id_User ?? -1,
    });

    closeDialog();
  };

  const getIsNextStepDisabled = () => {
    if (currentPart === 0)
      return (
        !formData.name ||
        !formData.description ||
        !formData.salary ||
        !formData.validDate
      );
    if (currentPart === 1) {
      return (
        !formData.location ||
        !formData.workEnvironment ||
        !formData.experienceLevel
      );
    }
    return true;
  };

  const closeDialog = () => {
    setCurrentPart(0);
    setFormData(defaultData);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      const modalElement = document.querySelector(".modal");
      if (!modalElement) return;
      const modalInstance = window.M.Modal.init(modalElement);
      modalInstance.open();

      const datePicker = document.querySelectorAll(".datepicker");
      M.Datepicker.init(datePicker, {
        format: "yyyy-mm-dd",
        onSelect: (date) => {
          if (date) {
            const formattedDate = date.toISOString().split("T")[0];
            setFormData({ ...formData, validDate: formattedDate });
          }
        },
      });

      const selects = document.querySelectorAll("select");
      M.FormSelect.init(selects);

      return () => modalInstance.close();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && currentPart === 1) {
      const selects = document.querySelectorAll("select");
      M.FormSelect.init(selects);
    }
    M.updateTextFields();
  }, [currentPart]);

  useEffect(() => {
    if (responseData) {
      onCreate(responseData);
      toastSuccess("Position created");
    }
  }, [responseData]);

  useEffect(() => {
    if (error) {
      toastError("Something went wrong, please try again!");
    }
  }, [error]);

  return (
    <div id="jobOfferModal" className="modal large-modal jobOfferModal">
      <div className="modal-content">
        <div className="row">
          <div className="col">
            <h5 className="dialogTitle">Create position</h5>
          </div>
          <button className="modal-close btn-flat right" onClick={closeDialog}>
            <i className="material-icons">close</i>
          </button>
        </div>
        <div className="progress">
          <div
            className="determinate"
            style={{ width: `${33.33 * (currentPart + 1)}%` }}
          ></div>
        </div>

        <form onSubmit={handleSubmit}>
          {currentPart === 0 && (
            <>
              <h1 className="modal__title">Main information</h1>
              <div className="input-field">
                <input
                  name="validDate"
                  type="text"
                  className="datepicker"
                  value={formData.validDate}
                  readOnly
                  required
                />
                <label htmlFor="validDate">Valid until</label>
              </div>
              <div className="input-field">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete=""
                  required
                />
                <label htmlFor="name">Job Name</label>
              </div>
              <div className="input-field">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="materialize-textarea"
                  maxLength={1000}
                  required
                />
                <label htmlFor="description">Description</label>
              </div>
              <div className="input-field">
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                  min={1}
                />
                <label htmlFor="salary"> Minimum salary</label>
              </div>
            </>
          )}

          {currentPart === 1 && (
            <>
              <h1 className="modal__title">Additional information</h1>
              <div className="input-field">
                <input
                  id="location"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
                <label htmlFor="location">Location</label>
              </div>
              <div className="input-field">
                <select
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  name="experienceLevel"
                  id="experienceLevel"
                >
                  {EXPERIENCE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <label htmlFor="experienceLevel">Experience</label>
              </div>
              <div className="input-field">
                <select
                  value={formData.workEnvironment}
                  onChange={handleChange}
                  name="workEnvironment"
                  id="workEnvironment"
                >
                  {WORK_ENVIRONMENT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <label htmlFor="workEnvironment">Work environment</label>
              </div>
              <p>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.partTime}
                    onChange={(e) =>
                      setFormData({ ...formData, partTime: e.target.checked })
                    }
                  />
                  <span>Part Time</span>
                </label>
              </p>
            </>
          )}

          {currentPart === 2 && (
            <>
              <h1 className="modal__title">Application steps</h1>
              {formData.parts.map((part, index) => (
                <div key={index} className="job-part">
                  <div className="input-field">
                    <input
                      type="text"
                      name="name"
                      value={part.name}
                      onChange={(e) => handleJobPartChange(index, e)}
                      required
                    />
                    <label htmlFor="name">Title</label>
                  </div>
                  <div className="input-field">
                    <textarea
                      name="description"
                      value={part.description}
                      onChange={(e) => handleJobPartChange(index, e)}
                      className="materialize-textarea"
                      required
                    />
                    <label htmlFor="description">Description</label>
                  </div>
                  <div className="row">
                    <span>
                      <label>
                        <input
                          type="checkbox"
                          name="requiresFiles"
                          checked={part.requiresFiles}
                          onChange={(e) => handleJobPartChange(index, e)}
                        />
                        <span>Requires Files</span>
                      </label>
                    </span>
                    <button
                      type="button"
                      className="btn red right"
                      onClick={() => removeJobPart(index)}
                    >
                      <i className="material-icons">delete_forever</i>
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn-small indigo add-step-btn"
                onClick={addJobPart}
              >
                <div className="valign-wrapper">
                  Add step&nbsp;<i className="material-icons">add</i>
                </div>
              </button>
            </>
          )}

          <div className="modal-footer">
            <div className="footer-buttons">
              {currentPart !== 0 && (
                <button
                  className="btn indigo lighten-1 left"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPart((prevPart) => prevPart - 1);
                  }}
                >
                  <div className="valign-wrapper">
                    <i className="material-icons">arrow_back_ios</i>
                    Previous&nbsp;
                  </div>
                </button>
              )}
              {currentPart !== 2 && (
                <button
                  className="btn indigo lighten-1"
                  disabled={getIsNextStepDisabled()}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPart((prevPart) => prevPart + 1);
                  }}
                >
                  <div className="valign-wrapper">
                    Next&nbsp;
                    <i className="material-icons">arrow_forward_ios</i>
                  </div>
                </button>
              )}
              {currentPart === 2 && (
                <button type="submit" className="btn indigo lighten-1">
                  Create
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobOfferModal;
