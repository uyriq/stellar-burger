import React from "react";
import ModalOverlay from "./modal-overlay";
import PropTypes from "prop-types";

import Styles from "./modal.module.css";

const Modal = ({ isShow, hide, title, ...props }) =>
    isShow ? (
        <ModalOverlay>
            <div className={Styles.box_total}>
                <div className={`${Styles.modal_header} text `}>
                    <div className={` ${Styles.modal_button_close} `}>
                        <span type="button" onClick={hide} className={`${Styles.modal_button_close} text `}>☒</span>
                    </div>
                    <h4 className="text text_type_main-large"> {title}

                    </h4>
                </div>
                <div className={Styles.modal_content}>
                    {props.children}
                </div>
            </div>
        </ModalOverlay>
    ) : null;

Modal.propTypes = {
    isShow: PropTypes.bool.isRequired,
    hide: PropTypes.func.isRequired,
    title: PropTypes.string
};

export default Modal;
