import React from 'react';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../utils/prop-types'
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
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


const BurgerConstructor = ({ ingredients }) => {
    const notbunsIngredients = ingredients.filter(item => item.type !== 'bun');
    const bunsIngredients = ingredients.filter(item => item.type === 'bun');
    const randombun = Math.floor(bunsIngredients.length * Math.random())

    return (
        <section className={`${Styles.constructor} `}>
            <>
                <ConstructorElement
                    type='top'
                    isLocked={true}
                    text={`${bunsIngredients[randombun].name} (верх)`}
                    price={bunsIngredients[randombun].price}
                    thumbnail={bunsIngredients[randombun].image}
                />
            </>
            <ul className={`${Styles.list} custom-scroll `}>
                {ingredientsList(notbunsIngredients)}
            </ul>
            <>
                <ConstructorElement
                    type='bottom'
                    isLocked={true}
                    text={`${bunsIngredients[randombun].name} (низ)`}
                    price={bunsIngredients[randombun].price}
                    thumbnail={bunsIngredients[randombun].image}
                />
            </>
        </section>
    );
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
}

export default BurgerConstructor;
