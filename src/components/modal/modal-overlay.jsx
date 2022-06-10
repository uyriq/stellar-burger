import React from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import Styles from "./modal-overlay.module.css";

const ModalOverlay = ({ ...props }) => {
  // console.log(JSON.stringify(props));
  return ReactDom.createPortal(
    <>
      <div className={Styles.modal_overlay}>{props.children}</div>
    </>,
    document.getElementById("root_modal_overlay")
  );
};

ModalOverlay.propTypes = {
  props: PropTypes.string
};

export default ModalOverlay;