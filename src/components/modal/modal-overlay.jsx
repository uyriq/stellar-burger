import React from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import Styles from "./modal-overlay.module.css";

const ModalOverlay = props  => {
   
    return ReactDom.createPortal(
        <>
            <div className={Styles.modal_overlay} onClick={props.onClose}>{props.children}</div>
        </>,
        document.getElementById("root_modal_overlay")
    );
};

ModalOverlay.propTypes = {
    children: PropTypes.element.isRequired
};

export default ModalOverlay;