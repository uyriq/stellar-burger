/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux'
import { AnimatedPlaceholder } from '../animated-placeholder/animated-placeholder'
import { delItem, setItems, selectBunsCart, selectNotBunsCart } from '../../store/slices/burger-constructor-slice'
import BurgerConstructorItem from './burger-constructor-item'
import CategoryDropAccept from './burger-constructor-category'
import Styles from './burger-constructor.module.css'

function BurgerConstructor() {
    const dispatch = useDispatch()

    const notBunsCart = useSelector(selectNotBunsCart)
    const bunsCart = useSelector(selectBunsCart)

    const handleClose = (item) => () => {
        dispatch(delItem(item))
    }

    const moveCard = (dragIndex, hoverIndex, key) => {
        const dragCard = notBunsCart.filter((ingredient) => ingredient.uuid === key)

        if (dragCard) {
            const newCards = [...notBunsCart]
            newCards.splice(dragIndex, 1)
            newCards.splice(hoverIndex, 0, ...dragCard)
            dispatch(setItems(newCards))
        }
    }
    const htmlTopConstructorElement = bunsCart._id ? (
        <ConstructorElement
            type="top"
            isLocked
            text={`${bunsCart.name} (верх)`}
            price={bunsCart.price}
            thumbnail={bunsCart.image}
        />
    ) : (
        <div className={`${Styles.top}`}>
            <ConstructorElement type="top" text="" />
            <p className={`${Styles.topbunempty} text text_type_main-small `}>🍔поместите сюда булочку🍔</p>
        </div>
    )

    const htmlBottomConstructorElement = bunsCart._id ? (
        <div>
            <ConstructorElement
                type="bottom"
                isLocked
                text={`${bunsCart.name} (низ)`}
                price={bunsCart.price}
                thumbnail={bunsCart.image}
            />
        </div>
    ) : (
        <div className={`${Styles.bottom}`}>
            <ConstructorElement type="bottom" />
            <AnimatedPlaceholder>🍔🍔🍔поместите сюда булочку🍔🍔🍔</AnimatedPlaceholder>
        </div>
    )

    const htmlMiddleConstructorElement =
        bunsCart._id && notBunsCart.length > 0 ? (
            <ul className={`${Styles.list} custom-scroll `}>
                {notBunsCart.map((item, index) => (
                    <BurgerConstructorItem
                        // eslint-disable-next-line react/no-array-index-key
                        key={item.uuid}
                        uuid={item.uuid}
                        index={index} // приходится дубль из-за Warning: li: 'key' is not a prop.
                        moveCard={moveCard}
                    >
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text={item.name}
                            thumbnail={item.image}
                            price={item.price}
                            isLocked={false}
                            handleClose={handleClose(item)}
                        />
                    </BurgerConstructorItem>
                ))}
            </ul>
        ) : (
            /* Заглушка, если элементов нет */
            <div className={bunsCart._id ? `${Styles.middlewithbun}` : `${Styles.middle}`}>
                <ConstructorElement type="" isLocked={false} />
                <AnimatedPlaceholder>🍔 поместите сюда начинки и соусы 🍔</AnimatedPlaceholder>
            </div>
        )

    return (
        <section className={`${Styles.constructor} `}>
            <CategoryDropAccept category="bun">{htmlTopConstructorElement}</CategoryDropAccept>

            <CategoryDropAccept category="notbun">{htmlMiddleConstructorElement}</CategoryDropAccept>

            <CategoryDropAccept category="bun">{htmlBottomConstructorElement}</CategoryDropAccept>
        </section>
    )
}

export default BurgerConstructor
