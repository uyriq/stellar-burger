import React, { useEffect, useState, CSSProperties } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import AppHeader from '../app-header/app-header';
import Styles from './app.module.css';
import { Logo } from '../ui/react-developer-burger-ui-components'

// https://norma.nomoreparties.space/api/ingredients

const apiBaseUrl = 'https://norma.nomoreparties.space/api'
const apiEndpoints = { ingredients: '/ingredients' }



const App = (props) => {
    
    let [ingredients, setIngredients] = useState({
        success: false,
        data: []});


    useEffect(() => {
     
        
        let res
        const getIngredients = async () => {
            try {
                
                res = await fetch(`${apiBaseUrl}${apiEndpoints.ingredients}`)
                if (!res.ok) throw new Error('fetch trouble') } catch (e) {
                    console.info(`облом - ${e}`);
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
     
            <Logo />
        </main>

    </>
)
}

export default App;
