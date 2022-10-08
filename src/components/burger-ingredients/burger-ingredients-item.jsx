/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useDrag } from 'react-dnd'

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { PropTypes } from 'prop-types'
import Styles from './burger-ingredients-item.module.css'

function BurgerIngredientsItem(props) {
    const { ingredient, onClick, onClose, counter } = props
    const { name, image, price, _id, type } = ingredient

    const [{ isDrag }, dragRef] = useDrag({
        type: `ingredient`,
        item: { _id, type, ...ingredient },
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    })
    const opacity = isDrag ? 0.5 : 1.0
    return (
        <li className={`${Styles.item} mb-8 `}>
            <div
                ref={dragRef}
                style={{ ...Styles, opacity }}
                className={isDrag ? `${Styles.item__hide}` : {}}
                onClick={() => {
                    onClick(ingredient)
                }}
                onClose={onClose}
            >
                {counter(ingredient) > 0 && <Counter count={counter(ingredient)} size="default" />}
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
        _id: PropTypes.string,
        type: PropTypes.string,
    }).isRequired,

    onClick: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    counter: PropTypes.func.isRequired,
}

export default BurgerIngredientsItem
