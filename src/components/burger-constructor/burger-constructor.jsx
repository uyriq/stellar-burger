/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useCallback, useEffect, useState } from 'react'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import createBunIterator from '../utils/buns-generator'
import { TotalPriceContext, OrderContext, DataContext } from '../../services/appContext'
import Styles from './burger-constructor.module.css'

let Buns = createBunIterator()
const initialState = Buns.next()
let OneBun

function BurgerConstructor() {
    const { setOrderData } = useContext(OrderContext)
    const { setTotalPrice } = useContext(TotalPriceContext)
    const { dataState, dataDispatch } = useContext(DataContext)
    const notbunsIngredients = dataState.data.filter((item) => item.type !== 'bun')

    const bunsIngredients = dataState.data.filter((item) => item.type === 'bun')

    const [bunState, setBunState] = useState(initialState)
    function resetBunSwitch() {
        Buns = createBunIterator(bunsIngredients)
        setBunState(initialState)
    }

    const switchBun = () => {
        Buns.next()
        if (bunState.value === undefined) {
            resetBunSwitch()
        }
        if (bunState.value) setBunState(Buns.next())
    }

    if (bunState.value === undefined) resetBunSwitch()
    if (bunState.value) OneBun = bunState.value

    const makeOrderData = useCallback((array, bun) => {
        const newarr = array.filter((item) => !bunsIngredients.includes(item))
        newarr.unshift(bun)
        newarr.push(bun)
        // eslint-disable-next-line no-underscore-dangle
        const zdata = newarr.map((item) => item._id)
        const result = newarr.reduce((acc, orderdata) => acc + orderdata.price, 0)

        return [{ ingredients: zdata }, result]
    }, [])

    useEffect(() => {
        resetBunSwitch()
    }, [])

    useEffect(() => {
        const [zdata, cost] = makeOrderData(notbunsIngredients, OneBun)
        setTotalPrice(cost)
        setOrderData(zdata)
    }, [bunState, dataState])

    const handleClose = (item) => () => {
        // console.log(`will handle close on - ${item._id}`)
        dataDispatch({ type: 'DELETE', payload: item })
    }

    return (
        <section className={`${Styles.constructor} `}>
            <div onClick={switchBun}>
                <ConstructorElement
                    type="top"
                    isLocked
                    text={`${OneBun.name} (верх)`}
                    price={OneBun.price}
                    thumbnail={OneBun.image}
                />
            </div>
            <ul className={`${Styles.list} custom-scroll `}>
                {dataState.data
                    .filter((item) => item.type !== 'bun')
                    .map((item) => (
                        // eslint-disable-next-line no-underscore-dangle
                        <li key={item._id} className={`${Styles['list-item']} `}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={item.name}
                                thumbnail={item.image}
                                price={item.price}
                                isLocked={false}
                                handleClose={handleClose(item)}
                            />
                        </li>
                    ))}
            </ul>
            <ConstructorElement
                type="bottom"
                isLocked
                text={`${OneBun.name} (низ)`}
                price={OneBun.price}
                thumbnail={OneBun.image}
            />
        </section>
    )
}

export default BurgerConstructor
