import PropTypes from 'prop-types';
 
import Modal from '../modal/modal';
import OrderConfirm from '../modal/order-confirm';
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from '../burger-ingredients/burger-ingredients.module.css';
import { useState } from 'react';
/* BurgerOrder.defaultProps xaрдкод пока нет ответа от апи  */

const OrderPropType = {
    data: PropTypes.shape({
        total: PropTypes.string.isRequired,
        numero: PropTypes.string.isRequired,
        message: PropTypes.array.isRequired
    })
};


const BurgerOrder = props => {
    BurgerOrder.defaultProps = {
        numero: '034536', message: ['идентификатор заказа', 'Ваш заказ начали готовить', 'Дождитесь готовности на орбитальной станции'],
        total: '610.2'
    } 
    const { numero = '034536', total = '610.1', message, ...restProps } = props;
   
    const [show, setShow] = useState(false);

    return (
        <div className={`${Styles.currency}  `}>

            <div className={`${Styles.order_button} `} >
                <span className={`${Styles.currency} text text_type_digits-medium `}>{total}<CurrencyIcon /></span>
                <Button type="primary" size="large" onClick={() => setShow(true)}>Оформить заказ</Button>
                {show && <Modal title="&nbsp;" onClose={() => setShow(false)} >
                    <OrderConfirm numero={numero} message={message} />
                </Modal>}
            </div>
        </div>
    );
}

BurgerOrder.propTypes = OrderPropType

export default BurgerOrder
