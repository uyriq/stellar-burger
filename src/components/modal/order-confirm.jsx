import PropTypes from 'prop-types'
import Style from './order-confirm.module.css'
import { ReactComponent as DoneLogo } from '../../images/done.svg'

function OrderConfirm({ numero: Number, message }) {
    const messageArr = message.split(/\r?\n/)
    return (
        <div className={` ${Style.order_card} `}>
            <div className={` ${Style.first} `}>
                <p className=" text text_type_digits-large ">{Number}</p>
            </div>
            <div className={` ${Style.n2} text text_type_main-default  `}>{messageArr[0]}</div>
            <div className={` ${Style.n3}   `}>
                <DoneLogo />
            </div>
            <div className={` ${Style.n4}  text  text_type_main-default `}>{messageArr[1]}</div>
            <div className={` ${Style.n5}  text text_type_main-default  text_color_inactive `}>{messageArr[2]}</div>
            <div className={` ${Style.n6}  text text_type_main-default  text_color_inactive `}>{messageArr[3]}</div>
        </div>
    )
}

const OrderPropType = {
    numero: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
}

OrderConfirm.propTypes = { OrderPropType }.isRequired

export default OrderConfirm
