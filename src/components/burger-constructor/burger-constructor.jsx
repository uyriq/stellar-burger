/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useCallback, useEffect, useState } from 'react'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux'
import { MotoAnimate } from '../utils/moto-animate'
import {
    delItem,
    addBun,
    addNotBun,
    resetItems,
    selectBunsCart,
    selectNotBunsCart,
} from '../../store/slices/burger-constructor-slice'
import BurgerConstructorItem from './burger-constructor-item'
import CategoryDropAccept from './burger-constructor-category'
import Styles from './burger-constructor.module.css'

function BurgerConstructor() {
    const dispatch = useDispatch()

    const notBunsCart = useSelector(selectNotBunsCart)
    const bunsCart = useSelector(selectBunsCart)
    const [cards, setCards] = useState([...notBunsCart]) // для сортировки dnd внутри конструктора

    const makeOrderData = useCallback((array, bun) => {}, [])

    useEffect(() => {}, [])

    useEffect(() => {}, [])

    const handleClose = (item) => () => {
        dispatch(delItem(item))
    }

    const moveCard = (dragIndex, hoverIndex) => {
        const dragCard = cards[dragIndex]
        const newCards = [...cards]
        newCards.splice(dragIndex, 1)
        newCards.splice(hoverIndex, 0, dragCard)

        setCards(newCards)
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
            <p className="text text_type_main-small" style={{ transform: `translate(${150}px, ${-45}px)` }}>
                🍔поместите сюда булочку🍔
            </p>
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
            <MotoAnimate>🍔🍔🍔поместите сюда булочку🍔🍔🍔</MotoAnimate>
        </div>
    )

    const htmlMiddleConstructorElement =
        bunsCart._id && notBunsCart.length > 0 ? (
            /* TODO:  useDrag перетаскивание внутри конструктора */
            <ul className={`${Styles.list} custom-scroll `}>
                {notBunsCart.map((item, index) => (
                    <BurgerConstructorItem key={item.uuid} index={index} value={item._id}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text={item.name}
                            thumbnail={item.image}
                            price={item.price}
                            isLocked={false}
                            handleClose={handleClose(item)}
                            moveCard={moveCard}
                        />
                    </BurgerConstructorItem>
                ))}
            </ul>
        ) : (
            /* Заглушка, если элементов нет */
            <div className={bunsCart._id ? `${Styles.middlewithbun}` : `${Styles.middle}`}>
                <ConstructorElement type="" isLocked={false} />
                <MotoAnimate>🍔 поместите сюда начинки и соусы 🍔</MotoAnimate>
            </div>
        )

    return (
        <section className={`${Styles.constructor} `}>
            <div>
                <CategoryDropAccept category="bun"> {htmlTopConstructorElement}</CategoryDropAccept>
            </div>
            <div>
                <CategoryDropAccept category="notbun">{htmlMiddleConstructorElement}</CategoryDropAccept>
            </div>
            <div>
                <CategoryDropAccept category="bun">{htmlBottomConstructorElement}</CategoryDropAccept>
            </div>
        </section>
    )
}

export default BurgerConstructor
