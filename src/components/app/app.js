/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import { useState, useEffect, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ClipLoader from 'react-spinners/ClipLoader'
import {
    resetShowCard,
    setShowCard,
    selectShowCard,
    selectDetailsCard,
} from '../../store/slices/ingredient-details-slice'
import { resetShowOrder, selectDetailsOrder } from '../../store/slices/order-details-slice'
import { selectBunsCart } from '../../store/slices/burger-constructor-slice'
import AppHeader from '../app-header/app-header'
import { apiIngredients } from '../../services/use-api'
import Modal from '../modal/modal'
import Card from '../modal/card'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerOrder from '../burger-order/burger-order'

import useWindowDimensions from '../utils/use-windowdimensions'
import { TotalPriceContext, OrderContext } from '../../services/appContext'
import Styles from './app.module.css'

// написать примечание

const App = memo(() => {
    const dispatch = useDispatch()
    const isShowCard = useSelector(selectShowCard)
    const detailsCard = useSelector(selectDetailsCard)
    const detailsOrder = useSelector(selectDetailsOrder)
    const bunCart = useSelector(selectBunsCart)

    console.log(`isShowCard -  ${isShowCard} detailsCard - ${detailsCard._id} detailsOrder - ${detailsOrder}`)

    const [isLoading, setIsLoading] = useState(true)

    const [isError, setIsError] = useState(null)
    const [data, setData] = useState(null)
    const [totalPrice, setTotalPrice] = useState(0)
    const [orderData, setOrderData] = useState([])
    const { width } = useWindowDimensions()
    const isSmall = Boolean(width < 1280)
    const smallStyle = isSmall ? { tansform: `scale(${+(width / 1280).toFixed(2)})` } : null
    console.log(`scale${+(width / 1280).toFixed(2)}`, isSmall)
    // init
    const { ingredients: d, isLoading: loading, isError: error } = apiIngredients()
    console.log(d.data, loading, error)

    useEffect(() => {
        const { data } = { ...d }
        console.log(data)
        setData(data)

        setIsLoading(loading)
        setIsError(error)
    }, [d])
    return (
        <div className={Styles.page} style={smallStyle}>
            {isError && (
                <p className={`${Styles.page} text_color_error `}>
                    Что-то пошло не так, не получены данные, {isError}{' '}
                </p>
            )}
            {isLoading && (
                <span className={`${Styles.spinner} `}>
                    <ClipLoader color="#ffff" loading={isLoading} size={550} />
                </span>
            )}

            {Boolean(data?.length) && (
                <div className={`${Styles.container} `}>
                    <AppHeader />
                    <main
                        className={`${Styles.main} ${Styles.columns}`}
                        style={{
                            left: 0,
                            transform: `translateX(${(32 - width / 128) * (width > 1279)}px)`,
                        }}
                    >
                        <section className={`${Styles.column} ${Styles.columns}`}>
                            <h2 className="text text_type_main-large">Соберите бургер</h2>
                            {isShowCard && (
                                <div>
                                    {/* в целях дебага наоборот по дефолту  показываем и закрываем карту через (setShowCard())  */}
                                    <Modal title="Детали ингредиента" onClose={() => dispatch(setShowCard(false))}>
                                        <Card {...detailsCard} />
                                    </Modal>
                                </div>
                            )}
                            <div className={`${Styles.article} ${Styles.first__article}`}>
                                <BurgerIngredients />
                            </div>
                        </section>
                        <div>
                            <TotalPriceContext.Provider value={{ totalPrice, setTotalPrice }}>
                                <OrderContext.Provider value={{ orderData, setOrderData }}>
                                    <section className={`${Styles.column} ${Styles.columns}`}>
                                        <div className={`${Styles.article} ${Styles.first__article}`}>
                                            <BurgerConstructor />
                                        </div>
                                        {!!detailsOrder &&
                                            !!bunCart._id(
                                                <div className={`${Styles.middle}  ${Styles.article}  `}>
                                                    <BurgerOrder />
                                                </div>
                                            )}
                                    </section>
                                </OrderContext.Provider>
                            </TotalPriceContext.Provider>
                        </div>
                    </main>
                </div>
            )}
        </div>
    )
})
export default App
