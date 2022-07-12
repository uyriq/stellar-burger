import React , {  useContext, useState  } from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import OrderConfirm from '../modal/order-confirm';
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TotalPriceContext, OrderContext  } from '../../services/appContext';
import Styles from '../burger-ingredients/burger-ingredients.module.css';

/* BurgerOrder.defaultProps xaрдкод пока нет ответа от апи  */

const BurgerOrder = () => {
    const { totalPrice  } = useContext(TotalPriceContext);
    const {  orderData } = useContext(OrderContext);

    BurgerOrder.defaultProps = {
        numero: 'ошибка!',
        message: ['Не получены данные - идентификатор заказа',
        'Произошла ошибка, обратитесь к персоналу',
        'Все будет в порядке, проблема будет решена'],
        totalPrice: 'нет'
    }
    const { numero ,    message } = BurgerOrder.defaultProps;

    const [show, setShow] = useState(false);

    return (
        <div className={`${Styles.currency}  `}>

            <div className={`${Styles.order_button} `} >
                <span className={`${Styles.currency} text text_type_digits-medium `}>{totalPrice}<CurrencyIcon /></span>
                <Button type="primary" size="large" onClick={() => setShow(true)}>Оформить заказ</Button>
                {show && <Modal title="&nbsp;" onClose={() => setShow(false)} >
                    <OrderConfirm numero={numero} message={message} />
                </Modal>}
            </div>
        </div>
    );
}

const OrderPropType =  PropTypes.shape({
    totalPrice: PropTypes.number,
    numero: PropTypes.string,
    message: PropTypes.array
});

BurgerOrder.propTypes = {OrderPropType}
export default BurgerOrder
