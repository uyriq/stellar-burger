import { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { selectBunsCart, selectNotBunsCart } from '../../store/slices/burger-constructor-slice'
import { setShowOrder, selectShowOrder } from '../../store/slices/order-details-slice'
import Modal from '../modal/modal'
import OrderConfirm from '../modal/order-confirm'
import { getOrderNumber } from '../../services/api'
import Styles from '../burger-ingredients/burger-ingredients.module.css'

function BurgerOrder() {
    const notBunsCart = useSelector(selectNotBunsCart)
    const bunsCart = useSelector(selectBunsCart)
    const isShowOrder = useSelector(selectShowOrder)
    const [orderNumber, setOrderNumber] = useState(null)
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()

    // eslint-disable-next-line no-underscore-dangle
    const orderData = useMemo(
        () => ({
            ingredients: []
                // eslint-disable-next-line no-underscore-dangle
                .concat(bunsCart._id)
                .concat(notBunsCart.map(({ _id }) => _id))
                // eslint-disable-next-line no-underscore-dangle
                .concat(bunsCart._id),
        }),
        [bunsCart, notBunsCart]
    )
    const totalPrice = useMemo(
        () => notBunsCart.reduce((sum, { price }) => sum + price, 0) + bunsCart.price * 2,
        [bunsCart, notBunsCart]
    )

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
                .finally(console.log('data api ops finished!'))
        }
        return () => {}
    }, [totalPrice, orderData, message])

    return (
        <div className={`${Styles.currency}  `}>
            <div className={`${Styles.order_button} `}>
                <span className={`${Styles.currency} text text_type_digits-medium `}>
                    {totalPrice}
                    <CurrencyIcon />
                </span>
                {totalPrice && (
                    <Button
                        htmlType="button"
                        type="primary"
                        size="large"
                        disabled={isShowOrder}
                        onClick={() => {
                            dispatch(setShowOrder())
                            setMessage('Приступили к работе ...')
                        }}
                    >
                        Оформить заказ
                    </Button>
                )}
                {isShowOrder && (
                    <Modal title="&nbsp;" onClose={() => dispatch(setShowOrder())}>
                        <OrderConfirm numero={orderNumber?.order.number} message={message} />
                    </Modal>
                )}
            </div>
        </div>
    )
}

export default BurgerOrder
