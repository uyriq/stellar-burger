import {
    Counter,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import Styles from './burger-ingredients-item.module.css'
import Modal from '../modal/modal'
import Card from '../modal/card'
import { useState } from 'react'
import { ingredientPropType } from '../utils/prop-types'

const BurgerIngredientsItem = (props) => {
    const [show, setShow] = useState(false)
    const { ingredient, onClick } = props
    const { name, image, price } = ingredient

    return (
        <li className={`${Styles.item} mb-8 `}>
            <div
                onClick={() => {
                    onClick(ingredient)
                    setShow(true)
                }}
            >
                <Counter count={1} size="default" />
                <img src={image} alt={name} className="ml-4 mr-4 mb-1" />
                <div className={`${Styles.currency} mb-1`}>
                    <span className="text text_type_digits-default ">
                        {price}
                    </span>
                    &nbsp;
                    <CurrencyIcon />
                </div>
                <span className="text text_type_main-small ">{name}</span>
            </div>
        </li>
    )
}

BurgerIngredientsItem.propTypes = { ingredientPropType }.isRequired

export default BurgerIngredientsItem
