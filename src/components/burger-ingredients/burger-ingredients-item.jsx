/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { PropTypes } from 'prop-types'
import Styles from './burger-ingredients-item.module.css'

function BurgerIngredientsItem(props) {
    const { ingredient, onClick, onClose } = props
    const { name, image, price } = ingredient

    return (
        <li className={`${Styles.item} mb-8 `}>
            <div
                onClick={() => {
                    onClick(ingredient)
                }}
                onClose={() => {
                    onClose()
                }}
            >
                <Counter count={1} size="default" />
                <img src={image} alt={name} className="ml-4 mr-4 mb-1" />
                <div className={`${Styles.currency} mb-1`}>
                    <span className="text text_type_digits-default ">{price}</span>
                    &nbsp;
                    <CurrencyIcon />
                </div>
                <span className="text text_type_main-small ">{name}</span>
            </div>
        </li>
    )
}

BurgerIngredientsItem.propTypes = {
    ingredient: PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
    }).isRequired,

    onClick: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default BurgerIngredientsItem
