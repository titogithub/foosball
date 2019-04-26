import React from 'react';
import './modalCalificaciones.css';
const BootstrapModal = ({
    isOpen, toggleModal, okModal, children, cancelLabel, okLabel
}) => {

  const showHideClassName = isOpen ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button className='close' aria-label="Close" onClick={toggleModal}>x</button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
            {cancelLabel && <button className="btn btn-link" onClick={toggleModal}>{cancelLabel}</button>}
            <button className="btn btn-link" onClick={okModal}>{okLabel}</button>
          </div>
        </div>
      </div>
    </div>
    )
  }
  export default BootstrapModal