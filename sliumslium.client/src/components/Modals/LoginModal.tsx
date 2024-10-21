import { useEffect } from "react";
import { useNavigate } from "react-router";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: ModalProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      const modalElement = document.querySelector(".modal");
      if (!modalElement) return;
      const modalInstance = window.M.Modal.init(modalElement);
      modalInstance.open();

      return () => modalInstance.close();
    }
  }, [isOpen]);

  return (
    <div
      className={`modal ${isOpen ? "open" : ""}`}
      style={{ textAlign: "center" }}
    >
      <div className="row" style={{ margin: 0 }}>
        <button className="modal-close btn-flat right" onClick={onClose}>
          <i className="material-icons">close</i>
        </button>
      </div>
      <div className="modal-content">
        <h4>Login Required</h4>
        <p>You need to log in to apply for this job.</p>
        <button
          className="btn indigo lighten-1"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
};
