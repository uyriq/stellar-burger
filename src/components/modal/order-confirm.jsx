import React from 'react'
import Style from './order-confirm.module.css'
import { ReactComponent as DoneLogo } from '../../images/done.svg'
import PropTypes from 'prop-types';

const OrderConfirm = props => {

    const { numero,  message   } = props;
    let mes = message.split(/\r?\n/)
    console.log(mes)
    return (

            <div className={` ${Style.order_card} `}  >

                <div className={` ${Style.first} `}>
                    <p className=' text text_type_digits-large '>{numero}</p>
                </div>
                <div className={` ${Style.n2} text text_type_main-default  `}   >
                    {mes[0]}
                </div>
                <div className={` ${Style.n3}   `} ><DoneLogo /></div>
                <div className={` ${Style.n4}  text  text_type_main-default `} >{mes[1]}</div>
                <div className={` ${Style.n5}  text text_type_main-default  text_color_inactive `} >{mes[2]}</div>
                <div className={` ${Style.n6}  text text_type_main-default  text_color_inactive `} >{mes[0]}</div>
            </div>
    )

}

const OrderPropType =  PropTypes.shape({
    numero: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
}).isRequired;


OrderConfirm.propTypes = {OrderPropType}.isRequired

export default OrderConfirm
