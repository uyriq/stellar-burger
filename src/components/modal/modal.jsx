import React from "react";
import ModalOverlay from "./modal-overlay";
import PropTypes from "prop-types";
import Styles from "./modal.module.css";

const Modal = ({ isShow, hide, title, ...props }) =>
  isShow ? (
    <ModalOverlay>
      <div className={Styles.modal_wrapper}>
        <div className={Styles.modal_content}>
          <div className={Styles.modal_header}>
            <h4> {title} </h4>
            <button
              type="button"
              className={Styles.modal_button_close}
              onClick={hide}
            >
              <span> ☒ </span>
            </button>
          </div>
          <hr />
          <div className={Styles.modal_body}>{props.children}</div>
        </div>
      </div>
    </ModalOverlay>
  ) : null;

Modal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default Modal;
