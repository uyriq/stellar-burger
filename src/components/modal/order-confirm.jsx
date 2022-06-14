import React from 'react'
import Style from './order-confirm.module.css'

/* 
const data=`
           034536
идентификатор заказа
Ваш заказ начали готовить
Дождитесь готовности на орбитальной станции
`
 */
const OrderConfirm = props => {
    console.log(props)
    return ( 
        <div className={` ${Style.card} `} >
         {props.children}
        </div>
    )
}
export default OrderConfirm
