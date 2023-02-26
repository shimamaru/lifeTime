import React from "react";

const Modal = ({ show, onClose, children }) => {
  return (
    <>
      {show && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={onClose}>Close</button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
