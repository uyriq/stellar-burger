/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useCallback, useEffect, useState } from 'react'
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
// import createBunIterator from '../utils/buns-generator'
import { TotalPriceContext, OrderContext } from '../../services/appContext'
import Styles from './burger-constructor.module.css'

function BurgerConstructor() {
    const dispatch = useDispatch()
    const { setOrderData } = useContext(OrderContext)
    const { setTotalPrice } = useContext(TotalPriceContext)
    //    const { dataState, dataDispatch } = useContext(DataContext)

    const notbunsIngredients = useSelector(selectNotBunsCart)
    const bunsIngredient = useSelector(selectBunsCart)

    const makeOrderData = useCallback((array, bun) => {
        // newarr.unshift(bun)
        // newarr.push(bun)
        // eslint-disable-next-line no-underscore-dangle
        //  const zdata = newarr.map((item) => item._id)
        //  const result = newarr.reduce((acc, orderdata) => acc + orderdata.price, 0)
        //  return [{ ingredients: zdata }, result]
    }, [])

    useEffect(() => {}, [])

    useEffect(() => {
        //  const [zdata, cost] = makeOrderData(notbunsIngredients, data.bun)
        //  setTotalPrice(cost)
        //  setOrderData(zdata)
    }, [])

    const handleClose = (item) => () => {
        // console.log(`will handle close on - ${item._id}`)
        dispatch(delItem(item))
    }

    const htmlTopConstructorElement = bunsIngredient._id ? (
        <ConstructorElement
            type="top"
            isLocked
            text={`${bunsIngredient.name} (верх)`}
            price={bunsIngredient.price}
            thumbnail={bunsIngredient.image}
        />
    ) : (
        <div className={`${Styles.top}`}>
            <ConstructorElement type="top" text=""></ConstructorElement>
            <p className="text text_type_main-small" style={{ transform: `translate(${150}px, ${-45}px)` }}>
                🍔поместите сюда булочку🍔
            </p>
        </div>
    )

    const htmlBottomConstructorElement = bunsIngredient._id ? (
        <div>
            <ConstructorElement
                type="bottom"
                isLocked
                text={`${bunsIngredient.name} (низ)`}
                price={bunsIngredient.price}
                thumbnail={bunsIngredient.image}
            />
        </div>
    ) : (
        <div className={`${Styles.bottom}`}>
            <ConstructorElement type="bottom" />
            <MotoAnimate>🍔🍔🍔🍔🍔🍔 поместите сюда булочку </MotoAnimate>
        </div>
    )

    const htmlMiddleConstructorElement = bunsIngredient._id ? (
        <ul className={`${Styles.list} custom-scroll `} />
    ) : (
        <div className={`${Styles.middle} custom-scroll`}>
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
