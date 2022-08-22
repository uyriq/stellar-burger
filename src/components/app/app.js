import React, { useState, useReducer, useEffect, useCallback } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import AppHeader from '../app-header/app-header'
import Modal from '../modal/modal'
import Card from '../modal/card'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerOrder from '../burger-order/burger-order'
import { getIngredients } from '../../services/api'
import useWindowDimensions from '../utils/use-windowdimensions'
import {
    TotalPriceContext,
    OrderContext,
    DataContext,
} from '../../services/appContext'
import Styles from './app.module.css'

//dataReducer

const dataReducer = (state, { type, payload }) => {
    switch (type) {
        case 'DELETE':
            return {
                ...state,
                data: state.data.filter((item) => item._id !== payload._id),
            }
        case 'DATAFETCH':
            return {
                ...state,
                data: payload,
            }
        default:
            throw new Error(`Wrong type of action: ${type}`)
    }
}

const App = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [show, setShow] = useState(false)
    const [details, setDetails] = useState()
    const [isError, setIsError] = useState(null)
    const [data, setData] = useState(null)
    const [totalPrice, setTotalPrice] = useState(0)
    const [orderData, setOrderData] = useState([])
    const { width } = useWindowDimensions()
    const [dataState, dataDispatch] = useReducer(
        dataReducer,
        { data: [] },
        undefined
    )

    //init
    useEffect(() => {
        getIngredients()
            .then((data) => {
                setData(data)
            })
            .catch((err) => {
                setIsError(`  ошибка  - ${err}`)
            })
            .finally(console.log('data api - ok!'))
        return () => {}
    }, [])

    const dispatchdata = useCallback(() => {
        if (
            undefined !== data &&
            null !== data &&
            !Boolean(dataState?.data.length)
        ) {
            dataDispatch({ type: 'DATAFETCH', payload: data })
            setIsLoading(false)
        }
    })
    dispatchdata()

    return (
        <div className={Styles.page}>
            {isError && (
                <p className={`${Styles.page} text_color_error `}>
                    Что-то пошло не так, не получены данные, {isError}{' '}
                </p>
            )}
            {isLoading && (
                <span className={`${Styles.spinner} `}>
                    <ClipLoader
                        color={'#ffff'}
                        loading={isLoading}
                        size={550}
                    />
                </span>
            )}

            {Boolean(dataState?.data.length) && (
                <div className={`${Styles.container} `}>
                    <DataContext.Provider
                        value={{
                            dataState,
                            dataDispatch,
                            data,
                            setData,
                            details,
                            setDetails,
                            show,
                            setShow,
                        }}
                    >
                        <AppHeader />

                        <main
                            className={`${Styles.main} ${Styles.columns}`}
                            style={{
                                left: 0,
                                transform: `translateX(${
                                    (32 - width / 128) * (width > 1279)
                                }px)`,
                            }} //  смещение 0  если < 1279 (меньше - это смарт экраны)
                        >
                            <section
                                className={`${Styles.column} ${Styles.columns}`}
                            >
                                <h2 className="text text_type_main-large">
                                    Соберите бургер
                                </h2>
                                {show && (
                                    <div>
                                        <Modal
                                            title="Детали ингредиента"
                                            onClose={() => setShow(false)}
                                        >
                                            <Card {...details} />
                                        </Modal>
                                    </div>
                                )}
                                <div
                                    className={`${Styles.article} ${Styles.first__article}`}
                                >
                                    <BurgerIngredients />
                                </div>
                            </section>
                            <div>
                                <TotalPriceContext.Provider
                                    value={{ totalPrice, setTotalPrice }}
                                >
                                    <OrderContext.Provider
                                        value={{ orderData, setOrderData }}
                                    >
                                        <section
                                            className={`${Styles.column} ${Styles.columns}`}
                                        >
                                            <div
                                                className={`${Styles.article} ${Styles.first__article}`}
                                            >
                                                <BurgerConstructor />
                                            </div>
                                            <div
                                                className={`${Styles.middle}  ${Styles.article}  `}
                                            >
                                                <BurgerOrder />
                                            </div>
                                        </section>
                                    </OrderContext.Provider>
                                </TotalPriceContext.Provider>
                            </div>
                        </main>
                    </DataContext.Provider>
                </div>
            )}
        </div>
    )
}
export default App
