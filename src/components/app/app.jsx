import React, { useEffect, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import Styles from './app.module.css';

const apiBaseUrl = 'https://norma.nomoreparties.space/api'
const apiEndpoints = { ingredients: '/ingredients' }

const App = (props) => {
    const [ingredients, setIngredients] = useState({
        success: false,
        error: false,
        data: []
    });

    useEffect(() => {
        let res
        const getIngredients = async () => {
            try {
                res = await fetch(`${apiBaseUrl}${apiEndpoints.ingredients}`)
                if (!res.ok) throw new Error('fetch trouble')
                if (res.ok) {
                    let apidata = await res.json()
                    setIngredients(ingredients => ({ ...ingredients, success: apidata.success, data: apidata.data }))
                }
            } catch (e) {
                console.info(`облом - ${e.message}`);
                setIngredients(ingredients => ({ ...ingredients, error: true }))
            }
        }

        getIngredients();
    }, []);
    console.log(!!ingredients)
    const { success, error, data } = ingredients;
    return !!data && (
            <div className={Styles.page}>
                <div className={Styles.supper_container}>
                    <AppHeader />
                    {error && <p className={`${Styles.supper_container_inner} text_color_error `}> Что-то пошло не так, не получены данные </p>}
                    {(!success && !error) && <span className={`${Styles.spinner} `}> <ClipLoader color={'#ffff'} loading={!success} size={550} />
                    </span>}
                    {!!success && !error && <div className={`${Styles.supper_container_inner}`}>
                        <div className={Styles.supper_column}>
                            <BurgerIngredients ingredients={data} />
                        </div>
                        <div className={Styles.supper_column}>
                            <BurgerConstructor ingredients={data} />
                        </div>
                    </div>
                    }
                </div>
            </div>

    )
}

export default App;
