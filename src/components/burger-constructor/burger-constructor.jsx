import React, { useContext, useCallback, useEffect, useState } from 'react'
import { ingredientPropType } from '../utils/prop-types'
import {
    TotalPriceContext,
    OrderContext,
    DataContext,
} from '../../services/appContext'
import {
    ConstructorElement,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import Styles from './burger-constructor.module.css'

// ингредиенты удаляются по клику, булки по клику меняются по кругу генератором (из двух булок)

function* createBunIterator(
    buns = [
        {
            _id: '60d3b41abdacab0026a733c6',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_mobile:
                'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            image_large:
                'https://code.s3.yandex.net/react/code/bun-02-large.png',
            __v: 0,
        },
        {
            _id: '60d3b41abdacab0026a733c7',
            name: 'Флюоресцентная булка R2-D3',
            type: 'bun',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/bun-01.png',
            image_mobile:
                'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
            image_large:
                'https://code.s3.yandex.net/react/code/bun-01-large.png',
            __v: 0,
        },
    ]
) {
    let i = 0
    while (i < buns.length) {
        const bun = buns[i]
        i++
        yield bun
    }
}

let buns = createBunIterator()
let initialState = buns.next()
let onebun

const BurgerConstructor = () => {
    const { setOrderData, orderData } = useContext(OrderContext)
    const { setTotalPrice, totalPrice } = useContext(TotalPriceContext)
    const { dataState, dataDispatch } = useContext(DataContext)
    const notbunsIngredients = dataState.data.filter(
        (item) => item.type !== 'bun'
    )
    const bunsIngredients = dataState.data.filter((item) => item.type === 'bun')

    const [bunState, setBunState] = useState(initialState)
    function resetBunSwitch() {
        buns = createBunIterator(bunsIngredients)
        setBunState(initialState)
    }

    const switchBun = () => {
        buns.next()
        if (bunState.value === undefined) {
            //похоже сюда  не попадает проход кода never
            resetBunSwitch()
        }
        if (bunState.value) setBunState(buns.next())

        console.dir(bunState)
        console.log('click!')
        return
    }
    //  console.dir(bunState.value)
    if (bunState.value === undefined) resetBunSwitch()
    if (bunState.value) onebun = bunState.value
    // console.dir(`булка - ${JSON.stringify(onebun)}`);

    const makeOrderData = useCallback((array, bun) => {
        let newarr = array.filter((item) => {
            return !bunsIngredients.includes(item)
        })
        newarr.unshift(bun)
        newarr.push(bun)
        let zdata = newarr.map((item) => item._id)
        let result = newarr.reduce(function (acc, orderdata) {
            return acc + orderdata.price
        }, 0)
        console.log('\x1b[33m  OK \x1b[0m')
        console.log(`цена \n ${result}`)
        return [{ ingredients: zdata }, result]
    }, [])

    useEffect(() => {
        resetBunSwitch()
        console.log('init bun #0')
        return
    }, [])

    useEffect(() => {
        console.log('Привет! Я примонтировался')
        const [zdata, cost] = makeOrderData(notbunsIngredients, onebun)
        setTotalPrice(cost)
        setOrderData(zdata)
        console.log(`- ${zdata.ingredients} - , \n ${cost}`)
        return
    }, [bunState, dataState])

    const handleClose = (item) => () => {
        console.log(`will handle close on - ${item._id}`)
        dataDispatch({ type: 'DELETE', payload: item })
    }

    return (
        <section className={`${Styles.constructor} `}>
            <div onClick={switchBun}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${onebun.name} (верх)`}
                    price={onebun.price}
                    thumbnail={onebun.image}
                />
            </div>
            <ul className={`${Styles.list} custom-scroll `}>
                {dataState.data
                    .filter((item) => item.type !== 'bun')
                    .map((item) => (
                        <li
                            key={item._id}
                            className={`${Styles['list-item']} `}
                        >
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
            <>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${onebun.name} (низ)`}
                    price={onebun.price}
                    thumbnail={onebun.image}
                />
            </>
        </section>
    )
}

/* BurgerConstructor.propTypes = { ingredientPropType }.isRequired */

export default BurgerConstructor
