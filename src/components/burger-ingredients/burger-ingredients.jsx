/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import { useMemo, useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useScroll, motion } from 'framer-motion'
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
    const scrollRef = useRef(null)
    const { ...data } = ingredientsApi.useFetchIngredientsQuery()
    const isShowCard = useSelector(selectShowCard)
    const notBunsCart = useSelector(selectNotBunsCart)
    const bunsCart = useSelector(selectBunsCart)

    const [choice, setChoice] = useState('buns')
    const buns = data.currentData.data.filter((item) => item.type === 'bun')
    const sauces = data.currentData.data.filter((item) => item.type === 'sauce')
    const main = data.currentData.data.filter((item) => item.type === 'main')

    const { scrollYProgress, scrollY } = useScroll({
        container: scrollRef,
        offset: ['end end', 'start start'],
    })

    useEffect(() => {
        dispatch(setData([].concat(buns).concat(sauces).concat(main)))
    }, [])
    useEffect(() => {
        scrollY.onChange((latest) => {
            console.log(`scroll - ${latest} \n treshhold - ${latest > 100}`)
        })
    })

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
            <motion.section
                viewport={{ amount: 1, once: false }}
                onViewportEnter={(entry) => {
                    const { boundingClientRect } = entry
                    console.log(boundingClientRect)
                    setChoice('buns')
                }}
                onViewportLeave={(entry) => {
                    const { boundingClientRect } = entry
                    console.log(boundingClientRect)
                }}
                whileInView={{ backgroundColor: '#2b0687' }}
                initial={{ backgroundColor: '#131316' }}
                exit={{
                    opacity: 0,
                    backgroundColor: '#131316',
                    transition: { backgroundColor: { delay: 0 }, opacity: { delay: 0.1 } },
                }}
                transition={{
                    duration: 0.25,
                    delay: 0.5,
                }}
                className={`${Styles.buns}  `}
                ref={(el) => (pageRefs.current = { ...pageRefs.current, buns: el })}
            >
                <h2 className="text text_type_main-medium mb-6" id="bun">
                    Булки
                </h2>
                <ul className={`${Styles['ingredients-item']} pl-4 pr-4`}>{bunsforrender}</ul>
            </motion.section>
        )
    }

    function Sauces({ pageRefs }) {
        const saucesforrender = useMemo(() => IngredientsList(sauces), [])
        return (
            <motion.section
                viewport={{ amount: 0.7, once: false }}
                onViewportEnter={(entry) => {
                    const { boundingClientRect } = entry
                    console.log(boundingClientRect)
                    setChoice('sauces')
                }}
                onViewportLeave={(entry) => {
                    const { boundingClientRect } = entry
                    console.log(boundingClientRect)
                }}
                whileInView={{ backgroundColor: '#2b0687' }}
                initial={{ backgroundColor: '#131316' }}
                exit={{
                    opacity: 0,
                    backgroundColor: '#131316',
                    transition: { backgroundColor: { delay: 0 }, opacity: { delay: 0.1 } },
                }}
                transition={{
                    duration: 0.25,
                    delay: 0.5,
                }}
                className={`${Styles.sauces}  `}
                ref={(el) => (pageRefs.current = { ...pageRefs.current, sauces: el })}
            >
                <h2 className="text text_type_main-medium mb-6" id="sauce">
                    Соусы
                </h2>
                <ul className={`${Styles['ingredients-item']} pl-4 pr-4`}>{saucesforrender}</ul>
            </motion.section>
        )
    }

    function Main({ pageRefs }) {
        const mainsforrender = useMemo(() => IngredientsList(main), [])
        return (
            <motion.section
                viewport={{ amount: 0.5, once: false }}
                onViewportEnter={(entry) => {
                    const { boundingClientRect } = entry
                    console.log(boundingClientRect)
                    setChoice('main')
                }}
                onViewportLeave={(entry) => {
                    const { boundingClientRect } = entry
                    console.log(boundingClientRect)
                }}
                whileInView={{ backgroundColor: '#2b0687' }}
                initial={{ backgroundColor: '#131316' }}
                exit={{
                    opacity: 0,
                    backgroundColor: '#131316',
                    transition: { backgroundColor: { delay: 0 }, opacity: { delay: 0.1 } },
                }}
                transition={{
                    duration: 0.25,
                    delay: 0.5,
                }}
                className={`${Styles.main}  `}
                ref={(el) => (pageRefs.current = { ...pageRefs.current, main: el })}
            >
                <h2 className="text text_type_main-medium mb-6" id="main">
                    Начинки
                </h2>
                <ul className={`${Styles['ingredients-item']} pl-4 pr-4`}>{mainsforrender}</ul>
            </motion.section>
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
                <Buns ref={scrollRef} pageRefs={pageRefs} />
                <Sauces ref={scrollRef} pageRefs={pageRefs} />
                <Main ref={scrollRef} pageRefs={pageRefs} />
            </div>
        </section>
    )
}

export default BurgerIngredients
