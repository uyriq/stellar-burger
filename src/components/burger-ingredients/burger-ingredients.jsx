/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import { useMemo, useRef, useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useInView, InView } from 'react-intersection-observer'
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
    resetBuns,
    selectBunsCart,
    selectNotBunsCart,
} from '../../store/slices/burger-constructor-slice'
import { setData } from '../../store/slices/fetched-data-slice'
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

    const [choice, setChoice] = useState('buns')
    const [conditions, setCondition] = useState({ b: true, s: false, m: false })

    const buns = data.currentData.data.filter((item) => item.type === 'bun')
    const sauces = data.currentData.data.filter((item) => item.type === 'sauce')
    const main = data.currentData.data.filter((item) => item.type === 'main')

    const optionsInView = { threshold: 0, initialInView: false }

    // Use `useCallback` so we don't recreate the function on each render

    useEffect(() => {
        dispatch(setData([].concat(buns).concat(sauces).concat(main)))
    }, [])

    useEffect(() => {
        Object.entries(pageRefs.current).forEach((ref) => {
            console.log('ref', ref)
        })
    }, [pageRefs.current['buns'], pageRefs.current['sauces'], pageRefs.current['mains']])

    const onChange = useCallback((inView, entry) => {
        console.log(`'Inview :', ${inView}, ${entry}`)
        if (inView) {
            setCondition((conditions) => ({
                ...conditions,
                b: false,
            }))
        }
        if (!inView) setCondition({ ...conditions, b: false })
        console.log(conditions)
    }, []) // чем огр?

    function countIngredients(item) {
        // булка по условию только 1
        if (item.type === 'bun') {
            // eslint-disable-next-line no-underscore-dangle
            const bunCount = bunsCart._id.length !== 0 && bunsCart._id !== '' && bunsCart._id === item._id ? 1 : 0
            return bunCount
        }
        if (item.type === 'sauce' || item.type === 'main')
            // eslint-disable-next-line no-underscore-dangle
            return notBunsCart.filter((el) => el._id === item._id).length
        return 888
    }

    const ingredientClick = (details) => {
        if (isShowCard || isShowCard.payload) {
            return
        }
        dispatch(setDetailsCard(details))
        dispatch(setShowCard(true))
    }

    const IngredientsList = (array) =>
        array.map((item) => (
            <BurgerIngredientsItem
                // eslint-disable-next-line no-underscore-dangle
                key={item._id}
                ingredient={item}
                onClick={() => ingredientClick(item)}
                onClose={() => dispatch(setShowCard(false))}
                counter={() => countIngredients(item)}
            />
        ))

    // issue #27

    function scrollIntoView(type) {
        pageRefs.current[type].scrollIntoView({ behavior: 'smooth' })
    }

    function Buns({ pageRefs }) {
        const bunsforrender = useMemo(() => IngredientsList(buns), [])
        return (
            <InView as="div" initialInView={false} onChange={(inView, entry) => onChange(inView, entry)}>
                <section
                    className={`${Styles.buns}  `}
                    ref={(el) => (pageRefs.current = { ...pageRefs.current, buns: el })}
                >
                    <h2 className="text text_type_main-medium mb-6" id="bun">
                        Булки
                    </h2>
                    <ul className={`${Styles['ingredients-item']} pl-4 pr-4`}>{bunsforrender}</ul>
                </section>
            </InView>
        )
    }

    function Sauces({ pageRefs }) {
        const saucesforrender = useMemo(() => IngredientsList(sauces), [])
        return (
            <InView as="div" initialInView={false} onChange={(inView, entry) => console.log('Inview Sauces:', inView)}>
                <section
                    className={`${Styles.sauces}  `}
                    ref={(el) => (pageRefs.current = { ...pageRefs.current, sauces: el })}
                >
                    <h2 className="text text_type_main-medium mb-6" id="sauce">
                        Соусы
                    </h2>
                    <ul className={`${Styles['ingredients-item']} pl-4 pr-4`}>{saucesforrender}</ul>
                </section>
            </InView>
        )
    }

    function Main({ pageRefs }) {
        const mainsforrender = useMemo(() => IngredientsList(main), [])
        return (
            <InView as="div" onChange={(inView, entry) => console.log('Inview Mains:', inView)}>
                <section
                    className={`${Styles.main}  `}
                    ref={(el) => (pageRefs.current = { ...pageRefs.current, main: el })}
                >
                    <h2 className="text text_type_main-medium mb-6" id="main">
                        Начинки
                    </h2>
                    <ul className={`${Styles['ingredients-item']} pl-4 pr-4`}>{mainsforrender}</ul>
                </section>
            </InView>
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
