/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import { useMemo, useRef, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { InView } from 'react-intersection-observer'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { setShowCard, setDetailsCard, selectShowCard } from '../../store/slices/ingredient-details-slice'
import { selectBunsCart, selectNotBunsCart } from '../../store/slices/burger-constructor-slice'
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

    const [choice, setChoice] = useState({ b: true, s: false, m: false })

    const buns = data.currentData.data.filter((item) => item.type === 'bun')
    const sauces = data.currentData.data.filter((item) => item.type === 'sauce')
    const main = data.currentData.data.filter((item) => item.type === 'main')

    // Use `useCallback` so we don't recreate the function on each render

    const onChange = useCallback(
        // 🤷‍♂️ после добавления функции для InView  консоль браузера (F12) отказывается работать правильно.
        (inView, type) => {
            // type: b - булки, s - соусы, m - начинки
            switch (type) {
                case 'b': {
                    if (inView) {
                        setChoice((conditions) => ({
                            ...conditions,
                            b: true,
                        }))
                    }
                    if (!inView) setChoice({ ...choice, b: false })
                    break
                }
                case 's': {
                    if (inView) {
                        setChoice((conditions) => ({
                            ...conditions,
                            s: true,
                        }))
                    }
                    if (!inView) setChoice({ ...choice, s: false })
                    break
                }
                case 'm': {
                    if (inView) {
                        setChoice((conditions) => ({
                            ...conditions,
                            m: true,
                        }))
                    }
                    if (!inView) setChoice({ ...choice, m: false })
                    break
                }
                default:
                    // eslint-disable-next-line no-console
                    console.warn(`Sorry, we are out of ${type}.`)
            }
        },
        [choice]
    ) // чем правильно ограничить этот useCallback?

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
    const { b, s, m } = useMemo(() => {
        const { b, s, m } = choice
        return { b, s, m }
    }, [choice]) // есть ли польза в этом useMemo?

    return (
        <section className="">
            <div className={`${Styles.tabs} mb-10`}>
                <Tab
                    value="buns"
                    active={b}
                    onClick={() => {
                        scrollIntoView('buns')
                    }}
                >
                    Булки
                </Tab>
                <Tab
                    value="sauces"
                    active={!b && s}
                    onClick={() => {
                        scrollIntoView('sauces')
                    }}
                >
                    Соусы
                </Tab>
                <Tab
                    value="main"
                    active={!b && !s && m}
                    onClick={() => {
                        scrollIntoView('main')
                    }}
                >
                    Начинки
                </Tab>
            </div>
            <div className={`${Styles.ingredients} custom-scroll`}>
                <InView as="div" initialInView={false} onChange={(inView) => onChange(inView, 'b')}>
                    <Buns pageRefs={pageRefs} />
                </InView>
                <InView as="div" initialInView={false} onChange={(inView) => onChange(inView, 's')}>
                    <Sauces pageRefs={pageRefs} />
                </InView>
                <InView as="div" initialInView={false} onChange={(inView) => onChange(inView, 'm')}>
                    <Main pageRefs={pageRefs} />
                </InView>
            </div>
        </section>
    )
}

export default BurgerIngredients
