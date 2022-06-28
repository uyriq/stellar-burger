import React from 'react'
import Style from './order-confirm.module.css'
import { ReactComponent as DoneLogo } from '../../images/done.svg'
import PropTypes from 'prop-types';
import OrderPropType from '../burger-order/burger-order'

const OrderConfirm = props => {
    const OrderConfirmPropTypes = {...{onClose: PropTypes.func.isRequired}, ...OrderPropType}
     
    const { numero,  message, onClose  } = props;
    OrderConfirm.propTypes = OrderConfirmPropTypes
    return (
         
            <div className={` ${Style.order_card} `} onClick={onClose} >
              
                <div className={` ${Style.first} `}>
                    <p className=' text text_type_digits-large '>{numero}</p>
                </div>
                <div className={` ${Style.n2} text text_type_main-default  `}   >
                    {message[0]}
                </div>
                <div className={` ${Style.n3}   `} ><DoneLogo /></div>
                <div className={` ${Style.n4}  text  text_type_main-default `} >{message[1]}</div>
                <div className={` ${Style.n5}  text text_type_main-default  text_color_inactive `} >{message[2]}</div>
            </div>
    )

}

export default OrderConfirm
