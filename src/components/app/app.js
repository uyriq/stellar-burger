import React, { useState, useReducer, useEffect } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerOrder from '../burger-order/burger-order'
import { getIngredients } from '../../services/api'
import useWindowDimensions from '../utils/use-windowdimensions';
import { TotalPriceContext, OrderContext, DataContext } from "../../services/appContext";
import Styles from './app.module.css';

//dataReducer

const initialState = { data: [] };

const dataReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case "DELETE":
            return {
                ...state,
                data: state.data.filter((item) => item._id !== payload._id),
            };
        case "INIT":
            return {
                ...state,
                data: action.payload,
            };
        default:
            throw new Error(`Wrong type of action: ${type}`);
    }
};



const App = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [totalPrice, setTotalPrice] = useState([]);
    const [orderData, setOrderData] = useState([]);
    const { width } = useWindowDimensions();
    const [dataState, dataDispatch] = useReducer(
        dataReducer,
        initialState,
        undefined
    );

    //init
    useEffect(() => {
        const getData = async () => {
            setIsLoading(true)
            const { data, isloading, iserror } = getIngredients()
            setIsLoading(isloading)
            setIsError(iserror)
            console.log(JSON.stringify(data))

        }

        getData();
        return () => {
            // отписка от событий, закрытие соединений
        }
    }, []);

    //  if (undefined!==data.data) { dataDispatch({ type: 'INIT', state: ( data ) }); }

    console.log(`--- ${dataState} `)

    return (
        <div className={Styles.page}>

            {isError && <p className={`${Styles.page} text_color_error `}> Что-то пошло не так, не получены данные </p>}
            {isLoading && <span className={`${Styles.spinner} `}> <ClipLoader color={'#ffff'} loading={isLoading} size={550} />
            </span>}
            {!isLoading && !isError && <div className={`${Styles.container} `}>
                <DataContext.Provider value={{ dataState, dataDispatch }}>
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
                                <BurgerIngredients ingredients={dataState.data} />
                            </div>
                        </section>
                        <div>
                            <TotalPriceContext.Provider value={{ totalPrice, setTotalPrice }}>
                                <OrderContext.Provider value={{ orderData, setOrderData }}>
                                    <section className={`${Styles.column} ${Styles.columns}`}>
                                        <div className={`${Styles.article} ${Styles.first__article}`}>
                                            <BurgerConstructor ingredients={dataState.data} />
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
