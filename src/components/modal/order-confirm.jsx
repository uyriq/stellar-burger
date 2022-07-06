import React from 'react'
import Style from './order-confirm.module.css'
import { ReactComponent as DoneLogo } from '../../images/done.svg'
import PropTypes from 'prop-types';

const OrderConfirm = props => {

    const { numero,  message   } = props;

    return (
         
            <div className={` ${Style.order_card} `}  >
              
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

const OrderPropType =  PropTypes.shape({
    total: PropTypes.string.isRequired,
    numero: PropTypes.string.isRequired,
    message: PropTypes.array.isRequired
}).isRequired;

const OrderConfirmPropTypes = {...{onClose: PropTypes.func.isRequired}, ...OrderPropType}
OrderConfirm.propTypes = {OrderConfirmPropTypes}.isRequired

export default OrderConfirm
