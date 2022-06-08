import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '../ui/react-developer-burger-ui-components';
import   openModal  from  '../modal/open-modal'
import '../ui/box.css';
import '../ui/common.css';
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

const BurgerConstructor = ({ingredients, openModal}) => {
    const filteredIngredients = ingredients.filter(item => item.type !== 'bun');

    return (
        <section className={`${Styles.constructor} `}>
            <div className={` ml-8 `} >
                <ConstructorElement
                    type='top'
                    isLocked={true}
                    text={`${ingredients[0].name} (верх)`}
                    price={ingredients[0].price}
                    thumbnail={ingredients[0].image}
                />
            </div>
            <ul className={`${Styles.list} `}>
                {ingredientsList(filteredIngredients)}
            </ul>
            <div className='  ml-8 pr-20'>
                <ConstructorElement
                    type='bottom'
                    isLocked={true}
                    text={`${ingredients[0].name} (низ)`}
                    price={ingredients[0].price}
                    thumbnail={ingredients[0].image}
                />
            </div>
            <div className={`${Styles.currency} mr-1 mt-10`}>
                <div className={`${Styles.total} mr-1`}>
                <span className={`${Styles.currency} text text_type_digits-medium mr-2`}>610<CurrencyIcon/> </span>
                </div>
                <div onClick={openModal} className={`${Styles.order_button} `} >
                    <Button type="primary" size="large">Оформить заказ</Button>
                </div>
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
}

export default BurgerConstructor;
