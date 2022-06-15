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
const OrderConfirm = ({ numero, message }) => {

    return ( 
        <section className={` ${Style.card} `} >

            <div className={` ${Style.first} `}>
                <p className=' text text_type_digits-large '>{numero}</p>
            </div>
            <div className={` ${Style.n2} text text_type_main-default  `}   >

                {message[0]}

            </div>
        </section>
         

    )
}
export default OrderConfirm
