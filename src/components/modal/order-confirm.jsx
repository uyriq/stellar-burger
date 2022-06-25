import React from 'react'
import Style from './order-confirm.module.css'
import { ReactComponent as DoneLogo } from '../../images/done.svg'

const OrderConfirm = props => {
    const { numero = '034536', total = '610.1', message, ...restProps } = props;
    return (
         
            <div className={` ${Style.order_card} `} onClick={props.onClose} >
              
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
