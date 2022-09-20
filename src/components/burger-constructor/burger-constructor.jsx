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
import Styles from './burger-constructor.module.css'

function BurgerConstructor() {
    const dispatch = useDispatch()

    const notBunsCart = useSelector(selectNotBunsCart)
    const bunsCart = useSelector(selectBunsCart)

    const makeOrderData = useCallback((array, bun) => {
        // newarr.unshift(bun)
        // newarr.push(bun)
        // eslint-disable-next-line no-underscore-dangle
        //  const zdata = newarr.map((item) => item._id)
        //  const result = newarr.reduce((acc, orderdata) => acc + orderdata.price, 0)
        //  return [{ ingredients: zdata }, result]
    }, [])

    useEffect(() => { }, [])

    useEffect(() => {
        //  const [zdata, cost] = makeOrderData(notbunsIngredients, data.bun)
        //  setTotalPrice(cost)
        //  setOrderData(zdata)
    }, [])

    const handleClose = (item) => () => {
        dispatch(delItem(item))
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

    const htmlMiddleConstructorElement = (bunsCart._id && notBunsCart.length > 0) ? (
        /* TODO:  useDrag перетаскивание внутри конструктора */
        <ul className={`${Styles.list} custom-scroll `} >
            {notBunsCart.map((item) => (
                < BurgerConstructorItem key={item.uuid} value={item._id}>
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
        <div className={`${Styles.middle} custom-scroll`} style={{ whiteSpace: `pre-wrap` }}>
            <ConstructorElement type="" isLocked={false} />
            <MotoAnimate>🍔 поместите сюда начинки и соусы 🍔</MotoAnimate>
        </div>
    )

    return (
        <section className={`${Styles.constructor} `}>
            <div>{htmlTopConstructorElement}</div>
            <div>{htmlMiddleConstructorElement}</div>
            <div>{htmlBottomConstructorElement}</div>
        </section>
    )
}

export default BurgerConstructor
