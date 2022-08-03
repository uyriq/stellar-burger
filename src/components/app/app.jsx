import React, { useEffect, useState, useReducer, useContext } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerOrder from '../burger-order/burger-order'
import useWindowDimensions from '../utils/use-windowdimensions';
import { TotalPriceContext, OrderContext, DataContext } from "../../services/appContext";
import Styles from './app.module.css';
const apiBaseUrl = 'https://norma.nomoreparties.space/api'
const apiEndpoints = { ingredients: '/ingredients' }

const App = () => {
    const [ingredients, setIngredients] = useState({
        success: false,
        error: false,
        data: []
    });


    const [totalPrice, setTotalPrice] = useState([]);
    const [orderData, setOrderData] = useState([]);
    const [dataInitialState, setDataInitial] = useState([]);

    const { width } = useWindowDimensions();
    useEffect(() => {
        const getIngredients = async () => {
            try {
                const res = await fetch(`${apiBaseUrl}${apiEndpoints.ingredients}`)
                if (!res.ok) throw new Error('fetch trouble')
                if (res.ok) {
                    const apidata = await res.json()
                    setIngredients(ingredients => ({ ...ingredients, success: apidata.success, data: apidata.data }))
                    setDataInitial(() => ({ data: apidata.data }))
                }
            } catch (e) {
                console.info(`облом - ${e.message}`);
                setIngredients(ingredients => ({ ...ingredients, error: true }))
            }
        }

        getIngredients();
    }, []);

    const { success, error, data: ings } = ingredients;



    const { data, dataDispatcher } =  useContext(DataContext);


    return !!ings && (
        <div className={Styles.page}>

            {error && <p className={`${Styles.page} text_color_error `}> Что-то пошло не так, не получены данные </p>}
            {(!success && !error) && <span className={`${Styles.spinner} `}> <ClipLoader color={'#ffff'} loading={!success} size={550} />
            </span>}
            {!!success && !error && <div className={`${Styles.container} `}>
                <DataContext.Provider value={{ data: ings, dataDispatcher }}>
                    <AppHeader />
                    <main className={`${Styles.main} ${Styles.columns}`}
                        style={{
                            left: 0,
                            transform: `translateX(${(32 - width / 128) * (width > 1279)}px)`,
                        }}//  смещение 0  если < 1279 (меньше - это смарт экраны)
                    >
                        <section className={`${Styles.column} ${Styles.columns}`} >
                            <h2 className='text text_type_main-large'>Соберите бургер</h2>
                            <div className={`${Styles.article} ${Styles.first__article}`}  >
                                <BurgerIngredients ingredients={ings} />
                            </div>
                        </section>
                        <div>
                            <TotalPriceContext.Provider value={{ totalPrice, setTotalPrice }}>
                                <OrderContext.Provider value={{ orderData, setOrderData }}>
                                    <section className={`${Styles.column} ${Styles.columns}`}>
                                        <div className={`${Styles.article} ${Styles.first__article}`}>
                                            <BurgerConstructor ingredients={ings} />
                                        </div>
                                        <div className={`${Styles.middle}  ${Styles.article}  `}><BurgerOrder /></div>
                                    </section>
                                </OrderContext.Provider>
                            </TotalPriceContext.Provider>
                        </div>
                    </main>
                </DataContext.Provider>
            </div>
            }
        </div>
    )
}

export default App;
