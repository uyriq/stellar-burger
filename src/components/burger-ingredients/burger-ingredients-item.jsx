import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from './burger-ingredients-item.module.css';
import Modal from '../modal/modal';
import Card from '../modal/card';
import { useState } from "react";


const BurgerIngredientsItem = ({ ingredient }) => {
    
    const [show, setShow] = useState(false);

    return (

        <li onClick={() => setShow(true)} className={`${Styles.item} mb-8 `}>

            <Counter count={1} size="default" />
            <img src={ingredient.image} alt={ingredient.name} className='ml-4 mr-4 mb-1' />
            <div className={`${Styles.currency} mb-1`}>
                <span className='text text_type_digits-default '>{ingredient.price}</span>
                &nbsp;<CurrencyIcon />
            </div>
            <span className='text text_type_main-small '>{ingredient.name}</span>
            {show && <Modal title="Детали ингредиента" onClose={() => setShow(false)} 
              
                 
            >
                <Card {...ingredient} />
            </Modal>}

        </li>

    )
}

export default BurgerIngredientsItem;
