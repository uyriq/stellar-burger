/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useMemo, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useDrag } from 'react-dnd'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import {
    setShowCard,
    setDetailsCard,
    selectShowCard,
    selectDetailsCard,
} from '../../store/slices/ingredient-details-slice'
import {
    delItem,
    addBun,
    addNotBun,
    resetItems,
    selectBunsCart,
    selectNotBunsCart,
} from '../../store/slices/burger-constructor-slice'
import { ingredientsApi } from '../../store/services/ingredients.api'
import BurgerIngredientsItem from './burger-ingredients-item'
import Styles from './burger-ingredients.module.css'

function BurgerIngredients() {
    const dispatch = useDispatch()
    const pageRefs = useRef({})
    const { ...data } = ingredientsApi.useFetchIngredientsQuery()
    const isShowCard = useSelector(selectShowCard)
    const notBunsCart = useSelector(selectNotBunsCart)
    const bunsCart = useSelector(selectBunsCart)
    //  console.log(`${isShowCard} in burg-ing`)
    //    const { data, setDetails, show, setShow } = useContext(DataContext)

    const [choice, setChoice] = useState('buns')
    const buns = data.currentData.data.filter((item) => item.type === 'bun')
    const sauces = data.currentData.data.filter((item) => item.type === 'sauce')
    const main = data.currentData.data.filter((item) => item.type === 'main')

    function countIngredients(item) {
        // булка по условию только 1
        if (item.type === 'bun') return 1
        if (item.type === 'sauce' || item.type === 'main')
            return notBunsCart.filter((items) => el._id === item._id).length
        return 888
    }

    const ingredientClick = (details) => {
        if (details.type === 'bun') dispatch(addBun(details))
        if (details.type === 'sauce' || details.type === 'main') dispatch(addNotBun(details))
        if (isShowCard) {
            return
        }
        console.log(
            ` -- ${details.type === 'sauce' || details.type === 'main'
                ? notBunsCart.filter((items) => el._id === details._id).length
                : '1'
            }`
        )
        dispatch(setShowCard(true))
        dispatch(setDetailsCard(details))
    }

    const IngredientsList = (array) =>
        array.map((item) => (
            <BurgerIngredientsItem
                // eslint-disable-next-line no-underscore-dangle
                key={item._id}
                ingredient={item}
                onClick={() => ingredientClick(item)}
                onClose={() => dispatch(setShowCard(false))}
            />
        ))

    // issue #27

    function scrollIntoView(type) {
        pageRefs.current[type].scrollIntoView({ behavior: 'smooth' })
    }

    function Buns({ pageRefs }) {
        const bunsforrender = useMemo(() => IngredientsList(buns), [])
        return (
            <section
                className={`${Styles.buns}  `}
                ref={(el) => (pageRefs.current = { ...pageRefs.current, buns: el })}
            >
                <h2 className="text text_type_main-medium mb-6" id="bun">
                    Булки
                </h2>
                <ul className={`${Styles['ingredients-item']} pl-4 pr-4`}>{bunsforrender}</ul>
            </section>
        )
    }

    function Sauces({ pageRefs }) {
        const saucesforrender = useMemo(() => IngredientsList(sauces), [])
        return (
            <section
                className={`${Styles.sauces}  `}
                ref={(el) => (pageRefs.current = { ...pageRefs.current, sauces: el })}
            >
                <h2 className="text text_type_main-medium mb-6" id="sauce">
                    Соусы
                </h2>
                <ul className={`${Styles['ingredients-item']} pl-4 pr-4`}>{saucesforrender}</ul>
            </section>
        )
    }

    function Main({ pageRefs }) {
        const mainsforrender = useMemo(() => IngredientsList(main), [])
        return (
            <section
                className={`${Styles.main}  `}
                ref={(el) => (pageRefs.current = { ...pageRefs.current, main: el })}
            >
                <h2 className="text text_type_main-medium mb-6" id="main">
                    Начинки
                </h2>
                <ul className={`${Styles['ingredients-item']} pl-4 pr-4`}>{mainsforrender}</ul>
            </section>
        )
    }

    return (
        <section className="">
            <div className={`${Styles.tabs} mb-10`}>
                <Tab
                    value="buns"
                    active={choice === 'buns'}
                    onClick={() => {
                        setChoice('buns')
                        scrollIntoView('buns')
                    }}
                >
                    Булки
                </Tab>
                <Tab
                    value="sauces"
                    active={choice === 'sauces'}
                    onClick={() => {
                        setChoice('sauces')
                        scrollIntoView('sauces')
                    }}
                >
                    Соусы
                </Tab>
                <Tab
                    value="main"
                    active={choice === 'main'}
                    onClick={() => {
                        setChoice('main')
                        scrollIntoView('main')
                    }}
                >
                    Начинки
                </Tab>
            </div>
            <div className={`${Styles.ingredients} custom-scroll`}>
                <Buns pageRefs={pageRefs} />
                <Sauces pageRefs={pageRefs} />
                <Main pageRefs={pageRefs} />
            </div>
        </section>
    )
}

export default BurgerIngredients
