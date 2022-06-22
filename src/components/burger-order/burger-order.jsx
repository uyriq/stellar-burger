import PropTypes from 'prop-types';
import useModal from '../modal/use-modal';
import Modal from '../modal/modal';
import OrderConfirm from '../modal/order-confirm';
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from '../burger-ingredients/burger-ingredients.module.css';

/* data && BurgerOrder.defaultProps xaрдкод пока нет ответа от апи  */

const OrderPropType = {
    data: PropTypes.shape({
        total: PropTypes.string.isRequired,
        numero: PropTypes.string.isRequired,
        message: PropTypes.array.isRequired
    })
};

const data = {
    total: '610', numero: '034536', message: ['идентификатор заказа', 'Ваш заказ начали готовить', 'Дождитесь готовности на орбитальной станции']
}

const BurgerOrder = (data) => {
    BurgerOrder.defaultProps = {
        numero: '034536', message: ['идентификатор заказа', 'Ваш заказ начали готовить', 'Дождитесь готовности на орбитальной станции'],
        total: '610'
    }
    const { isShow: show, toggle: _toggleOpen } = useModal();

    return (
        <div className={`${Styles.currency}  `}>

            <div className={`${Styles.order_button} `} >
                <span className={`${Styles.currency} text text_type_digits-medium `}>{data.total}<CurrencyIcon /> </span> <Button type="primary" size="large" onClick={_toggleOpen}>Оформить заказ</Button>
                <Modal
                    isShow={show}
                    hide={_toggleOpen}
                    title=""
                >
                    <OrderConfirm numero={data.numero} message={data.message} />
                </Modal>
            </div>
        </div>
    );
}

BurgerOrder.propTypes = OrderPropType

export default BurgerOrder
