import React, {  useEffect, useRef  } from "react"; 
import ModalOverlay from "./modal-overlay";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import Styles from "./modal.module.css";

const Modal = props => {
    const ref = useRef({})

    const closeOnEscapeKeyDown = e => {
        console.log('1')
        if ((e.charCode || e.keyCode) === 27) {
            props.onClose();
        }
    };
    
    let outsideclick=0;
    useEffect(() => {
        const handler = (event) => {
            const { current: target } = ref;
            console.log(outsideclick)
            console.dir(target); //div.modal_total__UpXrq
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

    Modal.propTypes = {
    };

    return (
            <div ref={ref} className={Styles.total} >
        <ModalOverlay >
                <div className={Styles.box_total} onClick={e => e.stopPropagation()}>
                    <div className={`${Styles.modal_header} text `}>
                        <div className={` ${Styles.modal_button_close} `}>
                            <CloseIcon type="button" onClick={props.onClose}></CloseIcon>
                        </div>
                        <h4 className="text text_type_main-large"> {props.title}

                        </h4>
                    </div>
                    <div className={Styles.modal_content}>
                        {props.children}
                    </div>
                </div>
        </ModalOverlay>
            </div>
    )
}

export default Modal;
