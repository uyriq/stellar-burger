import React, { useEffect, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import Styles from './app.module.css';

const apiBaseUrl = 'https://norma.nomoreparties.space/api'
const apiEndpoints = { ingredients: '/ingredients' }

const App = (props) => {
    let [ingredients, setIngredients] = useState({
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
            } catch (e) {
                console.info(`облом - ${e.message}`);
                setIngredients(ingredients => ({ ...ingredients, error: true }))
            }
            let _ = await res.json()
            setIngredients(ingredients => ({ ...ingredients, success: _.success, data: _.data }))
        }

        getIngredients();
    }, []);
    console.log(!!ingredients)
    const { success, error, data } = ingredients;
    return !!data && (
 
            <>
                <div className={Styles.supper_container}>
                    <header className={Styles.supper_header}>
                        <AppHeader />
                        {error && <p className={`${Styles.supper_container_inner} text_color_error `}> Что-то пошло не так, не получены данные </p>}
                    </header>

                    {(!success && !error) && <span className={`${Styles.spinner} `}> <ClipLoader color={'#ffff'} loading={!success} size={550} />
                    </span>}
                    {!!success && !error && <div className={`${Styles.supper_container_inner}`}>
                        <main className={Styles.super_main}>
                            <BurgerIngredients ingredients={data} />
                        </main>
                        <main className={Styles.super_main}>
                            <BurgerConstructor ingredients={data} />
                        </main>
                    </div>
                    }

                </div>

            </>
    )
}

export default App;
