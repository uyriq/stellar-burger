import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Modal from '../modal/modal'
import OrderConfirm from '../modal/order-confirm'
import { getOrderNumber } from '../../services/api'
import {
    Button,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { TotalPriceContext, OrderContext } from '../../services/appContext'
import Styles from '../burger-ingredients/burger-ingredients.module.css'

/* BurgerOrder.defaultProps xaрдкод пока нет ответа от апи  */

const BurgerOrder = () => {
    const { totalPrice } = useContext(TotalPriceContext)
    const { orderData } = useContext(OrderContext)
    const [orderNumber, setOrderNumber] = useState(null)
    const [showorder, setShowOrder] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        console.log('Привет, ORDER! Я примонтировался')
        if (showorder) {
            console.log(`- ${JSON.stringify(orderData)} - , \n ${totalPrice}`)
            getOrderNumber(orderData)
                .then((data) => {
                    setOrderNumber(data)
                })
                .then(
                    setMessage(`идентификатор заказа
             Ваш заказ начали готовить
             Дождитесь готовности на орбитальной станции
             Cумма к оплате: ${totalPrice}`)
                )
                .catch((err) => {
                    setOrderNumber(`  ошибка  - ${err}`).then(
                        setMessage('извините, ошибка')
                    )
                })
                .finally(console.log('data api - ok!'))
        }
        return () => {}
    }, [totalPrice, orderData, message])

    //    console.log(`номер заказа -- ${JSON.stringify(orderNumber)}`)

    return (
        <div className={`${Styles.currency}  `}>
            <div className={`${Styles.order_button} `}>
                <span
                    className={`${Styles.currency} text text_type_digits-medium `}
                >
                    {totalPrice}
                    <CurrencyIcon />
                </span>
                <Button
                    type="primary"
                    size="large"
                    onClick={() => {
                        setShowOrder(true)
                        setMessage('Приступили к работе ...')
                    }}
                >
                    Оформить заказ
                </Button>
                {showorder && (
                    <Modal title="&nbsp;" onClose={() => setShowOrder(false)}>
                        <OrderConfirm
                            numero={orderNumber?.order.number}
                            message={message}
                        />
                    </Modal>
                )}
            </div>
        </div>
    )
}

/* const OrderPropType = PropTypes.shape({
    totalPrice: PropTypes.number,
    numero: PropTypes.string,
    message: PropTypes.array
});

BurgerOrder.propTypes = { OrderPropType } */
export default BurgerOrder
