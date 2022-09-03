/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types'
import Styles from './modal-overlay.module.css'

function ModalOverlay(props) {
    const { children, onClick } = props
    return (
        <div className={Styles.modal_overlay} onClick={onClick}>
            {children}
        </div>
    )
}

ModalOverlay.propTypes = {
    children: PropTypes.element.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default ModalOverlay
