/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ClipLoader from 'react-spinners/ClipLoader'
import { setShowCard, selectShowCard, selectDetailsCard } from '../../store/slices/ingredient-details-slice'
import { selectBunsCart } from '../../store/slices/burger-constructor-slice'
import AppHeader from '../app-header/app-header'
import { apiIngredients } from '../../services/use-api'
import Modal from '../modal/modal'
import Card from '../modal/card'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerOrder from '../burger-order/burger-order'
import useWindowDimensions from '../../utils/use-windowdimensions'
import Styles from './app.module.css'

// написать примечание

const App = memo(() => {
    const dispatch = useDispatch()
    const isShowCard = useSelector(selectShowCard)
    const detailsCard = useSelector(selectDetailsCard)
    const bunsCart = useSelector(selectBunsCart)
    const { width } = useWindowDimensions()
    const isSmall = Boolean(width < 1280)
    const smallDevicesStyle = isSmall ? { tansform: `scale(${+(width / 1280).toFixed(2)})` } : null
    // init
    const { ingredients: data, isLoading: loading, isError: error } = apiIngredients()

    return (
        <div className={Styles.page} style={smallDevicesStyle}>
            {error && (
                <p className={`${Styles.page} text_color_error `}>Что-то пошло не так, не получены данные, {error}</p>
            )}
            {loading && (
                <span className={`${Styles.spinner} `}>
                    <ClipLoader color="#defd" loading={loading} size={550} />
                </span>
            )}

            {Boolean(data.data?.length) && (
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
                            {(!!isShowCard.payload || !!isShowCard) && (
                                <div>
                                    {/*  показываем и закрываем карту ингредиента через (setShowCard())  */}
                                    <Modal title="Детали ингредиента" onClose={() => dispatch(setShowCard(false))}>
                                        <Card {...detailsCard.payload} />
                                    </Modal>
                                </div>
                            )}
                            <div className={`${Styles.article} ${Styles.first__article}`}>
                                <BurgerIngredients />
                            </div>
                        </section>
                        <div>
                            <section className={`${Styles.column} ${Styles.columns}`}>
                                <div className={`${Styles.article} ${Styles.first__article}`}>
                                    <BurgerConstructor />
                                </div>
                                {Boolean(bunsCart._id.length !== 0 && bunsCart._id !== '') && (
                                    <div className={`${Styles.middle} ${Styles.article}`}>
                                        <BurgerOrder />
                                    </div>
                                )}
                            </section>
                        </div>
                    </main>
                </div>
            )}
        </div>
    )
})
export default App
