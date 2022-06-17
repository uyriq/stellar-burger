import React, { useRef } from 'react';
import BurgerIngredientsItem from './burger-ingredients-item';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from './burger-ingredients.module.css';

import PropTypes from 'prop-types';

const ingredientPropType = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
});


const BurgerIngredients = ({ ingredients }) => {
    const pageRefs = useRef({});
    const [choice, setChoice] = React.useState('buns');
    const buns = ingredients.filter(item => item.type === 'bun');
    const sauces = ingredients.filter(item => item.type === 'sauce');
    const main = ingredients.filter(item => item.type === 'main');

    const IngredientsList = (array) => {
        return array.map(item =>
            <BurgerIngredientsItem
                key={item._id}
                ingredient={item}
            />);
    }

    function Buns({ pageRefs }) {
       // setChoice('buns')
        return (
            <section className={`${Styles.buns}  `}
                ref={el => pageRefs.current = { ...pageRefs.current, about: el }}>
                <h2 className='text text_type_main-medium mb-6' id='bun'>Булки</h2>
                <ul className={`${Styles['ingredients-item']} pl-4 pr-4`}>
                    {IngredientsList(buns)}
                </ul>
            </section>
        )
    }

    function Sauces({ pageRefs }) {
      //  setChoice('sauces')
        return (
            <section className={`${Styles.sauces}  `}
                ref={el => pageRefs.current = { ...pageRefs.current, about: el }}>
                <h2 className='text text_type_main-medium mb-6' id='sauce'>Соусы</h2>
                <ul className={`${Styles['ingredients-item']} pl-4 pr-4`}>
                    {IngredientsList(sauces)}
                </ul>
            </section>
        )
    }

    function Main({ pageRefs }) {
    //    setChoice('main')
        return (
            <section className={`${Styles.main}  `}
                ref={el => pageRefs.current = { ...pageRefs.current, about: el }}>
                <h2 className='text text_type_main-medium mb-6' id='main'>Начинки</h2>
                <ul className={`${Styles['ingredients-item']} pl-4 pr-4`}>
                    {IngredientsList(main)}
                </ul>
            </section>
        )
    }

    return (
        <section className='pt-10'>
            <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
            <div className={`${Styles.tabs} mb-10`}>
                <Tab value='buns' active={choice === 'buns'} onClick={Buns}>Булки</Tab>
                <Tab value='sauces' active={choice === 'sauces'} onClick={setChoice}>Соусы</Tab>
                <Tab value='main' active={choice === 'main'} onClick={setChoice}>Начинки</Tab>
            </div>
            <div className={`${Styles.ingredients} custom-scroll`}>
                <Buns  pageRefs={pageRefs} />
                <Sauces  pageRefs={pageRefs} />
                <Main  pageRefs={pageRefs} />

            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
}

export default BurgerIngredients;
