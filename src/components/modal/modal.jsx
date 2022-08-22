import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay';

import Styles from './modal.module.css';

const Modal = (props) => {
    const portal = document.getElementById('root_modal_overlay');

    const closeOnEscapeKeyDown = (e) => {
        if (e.key === 'Escape') {
            props.onClose();
        }
    };

    useEffect(() => {
        document.body.addEventListener('keydown', closeOnEscapeKeyDown);
        return function cleanup() {
            document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
        };
    }, []);

    const { onClose, title = '', children } = props;

    const onOverlayClose = (e) => {
        if (e.target === e.currentTarget) { onClose(); }
    };

    return (

        ReactDom.createPortal(

            <div className={Styles.total}>
                <ModalOverlay onClick={onOverlayClose}>
                    <div className={Styles.box_total} onClick={(e) => e.stopPropagation()}>
                        <div className={`${Styles.modal_header} text `}>
                            <div className={` ${Styles.modal_button_close} `}>
                                <CloseIcon type="button" onClick={onClose} />
                            </div>
                            <h4 className="text text_type_main-large">
                                {' '}
                                {title}
                            </h4>
                        </div>
                        <div className={Styles.modal_content}>
                            {children}
                        </div>
                    </div>
                </ModalOverlay>
            </div>,
            portal,
        )

    );
};

const ModalPropTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
};

Modal.propTypes = { ModalPropTypes }.isRequired;

export default Modal;
