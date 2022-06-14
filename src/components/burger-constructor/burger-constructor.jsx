import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import useModal from '../modal/use-modal';
import Modal from '../modal/modal';
import OrderConfirm from '../modal/order-confirm';
import Styles from './burger-constructor.module.css';


const ingredientsList = (array) => {
    return array.map(item => (
        <li key={item._id} className={`${Styles['list-item']} `}>
            <DragIcon />
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
            />
        </li>
    )
    );
}

const ingredientPropType = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbonhydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
});

const BurgerConstructor = ({ ingredients, openModal }) => {
    const notbunsIngredients = ingredients.filter(item => item.type !== 'bun');
    const bunsIngredients = ingredients.filter(item => item.type === 'bun');
    const randombun = Math.floor(bunsIngredients.length * Math.random())

    const { isShow: show, toggle: _toggleOpen } = useModal();
    const data = `
           034536
идентификатор заказа
Ваш заказ начали готовить
Дождитесь готовности на орбитальной станции
`
    return (
        <section className={`${Styles.constructor} `}>
            <div className={` `} >
                <ConstructorElement
                    type='top'
                    isLocked={true}
                    text={`${bunsIngredients[randombun].name} (верх)`}
                    price={bunsIngredients[randombun].price}
                    thumbnail={bunsIngredients[randombun].image}
                />
            </div>
            <ul className={`${Styles.list} custom-scroll `}>
                {ingredientsList(notbunsIngredients)}
            </ul>
            <div className='  '>
                <ConstructorElement
                    type='bottom'
                    isLocked={true}
                    text={`${bunsIngredients[randombun].name} (низ)`}
                    price={bunsIngredients[randombun].price}
                    thumbnail={bunsIngredients[randombun].image}
                />
            </div>
            <div className={`${Styles.currency}   mt-10`}>
                <div className={`${Styles.total}  `}>
                    <span className={`${Styles.currency} text text_type_digits-medium mr-2`}>610<CurrencyIcon /> </span>
                </div>
                <div className={`${Styles.order_button} `} >
                    <Button type="primary" size="large" onClick={_toggleOpen}>Оформить заказ</Button>
                    <Modal
                        isShow={show}
                        hide={_toggleOpen}
                        title=""
                    >
                        <OrderConfirm> {data} </OrderConfirm>
                    </Modal>
                </div>
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
}

export default BurgerConstructor;
