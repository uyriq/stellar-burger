import React, { useEffect, useState} from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import AppHeader from '../app-header/app-header';
import Styles from './app.module.css';
import { Logo } from '../ui/react-developer-burger-ui-components'

// https://norma.nomoreparties.space/api/ingredients

const apiBaseUrl = 'https://norma.nomoreparties.space/api'
const apiEndpoints = { ingredients: '/ingredients' }

const spinnerColor = document.documentElement.style.getPropertyValue('--text-inactive-color');
console.log(`spinnerColor = ${spinnerColor}`)

const App = (props) => {
    
    let [ingredients, setIngredients] = useState({
        success: false,
        error: false,
        data: []});


    useEffect(() => {
     
        
        let res
        const getIngredients = async () => {
            try {
                
                res = await fetch(`${apiBaseUrl}${apiEndpoints.ingredients}`)
                if (!res.ok) throw new Error('fetch trouble') } catch (e) {
                    console.info(`облом - ${e.message}`);
                    setIngredients (ingredients => ( {...ingredients, error: true}))
                }
                let _ = await res.json()
                  
                     setIngredients (ingredients => ( {...ingredients, success:_.success, data:_.data}))


    }


getIngredients();
    }, []);

return ingredients && (
    <>
        <AppHeader />
        <main className={Styles.app}>
        </main>

        {ingredients.error && <p> Что-то пошло не так, не получены данные </p>}
        {(!ingredients.success && !ingredients.error) && <ClipLoader color={spinnerColor} loading={!ingredients.success} css={''} size={550} />}
    </>


)
}

export default App;
