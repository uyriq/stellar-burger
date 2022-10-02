/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useCallback, useEffect, useState } from 'react'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux'
import { AnimatedPlaceholder } from '../utils/animated-placeholder'
import {
    delItem,
    addBun,
    addNotBun,
    resetItems,
    setItems,
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

    useEffect(() => {}, [])

    const handleClose = (item) => () => {
        dispatch(delItem(item))
    }

    const moveCard = (dragIndex, hoverIndex, key) => {
        const dragCard = notBunsCart.filter((ingredient) => ingredient.uuid === key)
        /*         const dragCard = cards[dragIndex]
        const newCards = [...cards]
        newCards.splice(dragIndex, 1)
        newCards.splice(hoverIndex, 0, dragCard)

        setCards(newCards)

        const dragCard = notBunsCart.filter((ingredient) => ingredient.uuid === dragUUID)
        */
        if (dragCard) {
            const newCards = [...notBunsCart]
            newCards.splice(dragIndex, 1)
            newCards.splice(hoverIndex, 0, ...dragCard)
            dispatch(setItems(newCards))
        }
        /*
                 const moveCardHandler = (dragIndex, hoverIndex) => {
            const dragItem = items[dragIndex];

            if (dragItem) {
              setItems((prevState) => {
                const coppiedStateArray = [...prevState];

                // remove item by "hoverIndex" and put "dragItem" instead
                const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);

                // remove item by "dragIndex" and put "prevItem" instead
                coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

                return coppiedStateArray;
              });
            }
          };
           */
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
            <AnimatedPlaceholder>🍔🍔🍔поместите сюда булочку🍔🍔🍔</AnimatedPlaceholder>
        </div>
    )

    const htmlMiddleConstructorElement =
        bunsCart._id && notBunsCart.length > 0 ? (
            <ul className={`${Styles.list} custom-scroll `}>
                {notBunsCart.map((item, index) => (
                    <BurgerConstructorItem
                        key={index}
                        uuid={item.uuid} // дубль из-за Warning: li: 'key' is not a prop.
                        // Trying to access it will result in 'undefined' being returned.
                        // If you need to access the same value within the child component,
                        // you should pass it as a different prop.
                        index={index}
                        value={item}
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
            <div>
                <CategoryDropAccept category="bun">{htmlTopConstructorElement}</CategoryDropAccept>
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
