// src/components/Modal.jsx
import React  from "react";
import { X } from "lucide-react";

const Modal = ({ onClose, children }) => {
  // Escape key to close modal
  // useEffect(() => {
  //   const handleEsc = (e) => {
  //     if (e.key === "Escape") onClose();
  //   };
  //   window.addEventListener("keydown", handleEsc);
  //   return () => window.removeEventListener("keydown", handleEsc);
  // }, [onClose]);

  // const handleBackdropClick = (e) => {
  //   if (e.target === e.currentTarget) onClose();
  // };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      // onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg relative p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
