import React, { useMemo, useRef, useContext, useEffect } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientsItem from './burger-ingredients-item'
import { DataContext } from '../../services/appContext'
import Styles from './burger-ingredients.module.css'

const BurgerIngredients = () => {
    const pageRefs = useRef({})
    const { data, setData, details, setDetails, show, setShow } =
        useContext(DataContext)
    const [choice, setChoice] = React.useState('buns')

    const buns = data.filter((item) => item.type === 'bun')
    const sauces = data.filter((item) => item.type === 'sauce')
    const main = data.filter((item) => item.type === 'main')

    useEffect(() => {
        setShow(false)
    }, [])

    const IngredientsList = (array) => {
        return array.map((item) => (
            // issue #27
            <BurgerIngredientsItem
                key={item._id}
                ingredient={item}
                onClick={() => ingredientClick(item)}
                onClose={() => setShow(false)}
            />
        ))
    }

    // issue #27

    const ingredientClick = (details) => {
        // console.log('ingredientClick')
        if (show) {
            return
        }
        setShow(true)
        // console.log(details)
        setDetails(details)
    }

    function scrollIntoView(type) {
        // решение  https://stackoverflow.com/questions/64188338/scrolling-components-into-view-with-react-with-useref
        // также два действия на OnСlick без промежуточной функции по https://stackoverflow.com/questions/26069238/call-multiple-functions-onclick-reactjs

        pageRefs.current[type].scrollIntoView({ behavior: 'smooth' })
    }

    function Buns({ pageRefs }) {
        const bunsforrender = useMemo(() => IngredientsList(buns), [])
        return (
            <section
                className={`${Styles.buns}  `}
                ref={(el) =>
                    (pageRefs.current = { ...pageRefs.current, buns: el })
                }
            >
                <h2 className="text text_type_main-medium mb-6" id="bun">
                    Булки
                </h2>
                <ul className={`${Styles['ingredients-item']} pl-4 pr-4`}>
                    {bunsforrender}
                </ul>
            </section>
        )
    }

    function Sauces({ pageRefs }) {
        const saucesforrender = useMemo(() => IngredientsList(sauces), [])
        return (
            <section
                className={`${Styles.sauces}  `}
                ref={(el) =>
                    (pageRefs.current = { ...pageRefs.current, sauces: el })
                }
            >
                <h2 className="text text_type_main-medium mb-6" id="sauce">
                    Соусы
                </h2>
                <ul className={`${Styles['ingredients-item']} pl-4 pr-4`}>
                    {saucesforrender}
                </ul>
            </section>
        )
    }

    function Main({ pageRefs }) {
        const mainsforrender = useMemo(() => IngredientsList(main), [])
        return (
            <section
                className={`${Styles.main}  `}
                ref={(el) =>
                    (pageRefs.current = { ...pageRefs.current, main: el })
                }
            >
                <h2 className="text text_type_main-medium mb-6" id="main">
                    Начинки
                </h2>
                <ul className={`${Styles['ingredients-item']} pl-4 pr-4`}>
                    {mainsforrender}
                </ul>
            </section>
        )
    }

    return (
        <>
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
        </>
    )
}

// BurgerIngredients.propTypes =  {ingredientPropType}

export default BurgerIngredients
