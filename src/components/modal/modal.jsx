import React, {  useEffect, useRef  } from "react"; 
import ModalOverlay from "./modal-overlay";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import Styles from "./modal.module.css";

const ModalPropTypes={
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string
}

const Modal = props => {
    const ref = useRef({})

    const closeOnEscapeKeyDown = e => {
        
        if ((e.charCode || e.keyCode) === 27) {
            props.onClose();
        }
    };
    
    let outsideclick=0;
    useEffect(() => {
        const handler = (event) => {
            const { current: target } = ref;
            if ( !target.contains(event.target)) { 
            outsideclick+=1;
        }
            if (outsideclick>1)  props.onClose();
        };
        document.addEventListener('click', handler);
        return () => document.removeEventListener('click', handler);
    }, [ref]);


    useEffect(() => {
        document.body.addEventListener("keydown", closeOnEscapeKeyDown);
        return function cleanup() {
            document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
        };
    }, []);

    Modal.propTypes = ModalPropTypes;
    const {onClose, title='', children} = props
    return (
            <div ref={ref} className={Styles.total} >
        <ModalOverlay >
                <div className={Styles.box_total} onClick={e => e.stopPropagation()}>
                    <div className={`${Styles.modal_header} text `}>
                        <div className={` ${Styles.modal_button_close} `}>
                            <CloseIcon type="button" onClick={onClose}></CloseIcon>
                        </div>
                        <h4 className="text text_type_main-large"> {title}

                        </h4>
                    </div>
                    <div className={Styles.modal_content}>
                        {children}
                    </div>
                </div>
        </ModalOverlay>
            </div>
    )
}

export default Modal;
