import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {
    delItem,
    addBun,
    addNotBun,
    resetItems,
    selectBunsCart,
    selectNotBunsCart,
} from '../../store/slices/burger-constructor-slice'
import { setOrder, resetOrder, setShowOrder, resetShowOrder, selectShowOrder } from '../../store/slices/order-details-slice'
import Modal from '../modal/modal'
import OrderConfirm from '../modal/order-confirm'
import { getOrderNumber } from '../../services/api'
import Styles from '../burger-ingredients/burger-ingredients.module.css'

/* BurgerOrder.defaultProps xaрдкод пока нет ответа от апи  */

function BurgerOrder() {
    const notBunsCart = useSelector(selectNotBunsCart)
    const bunsCart = useSelector(selectBunsCart)
    const isShowOrder = useSelector(selectShowOrder)
    //    const { totalPrice } = useContext(TotalPriceContext)
    //    const { orderData } = useContext(OrderContext)
    const [orderNumber, setOrderNumber] = useState(null)

    const [message, setMessage] = useState('')
    const dispatch = useDispatch()

    const orderData = []
    const totalPrice = 0

    useEffect(() => {
        if (isShowOrder || isShowOrder.payload) {
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
                    setOrderNumber(`  ошибка  - ${err}`).then(setMessage('извините, ошибка'))
                })
                // eslint-disable-next-line no-console
                .finally(console.log('data api - ok!'))
        }
        return () => { }
    }, [totalPrice, orderData, message])

    //    console.log(`номер заказа -- ${JSON.stringify(orderNumber)}`)

    return (
        <div className={`${Styles.currency}  `}>
            <div className={`${Styles.order_button} `}>
                <span className={`${Styles.currency} text text_type_digits-medium `}>
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
                {isShowOrder && (
                    <Modal title="&nbsp;" onClose={() => setShowOrder(false)}>
                        <OrderConfirm numero={orderNumber?.order.number} message={message} />
                    </Modal>
                )}
            </div>
        </div>
    )
}

export default BurgerOrder
