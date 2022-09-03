/* eslint-disable react/jsx-filename-extension */
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import useWindowDimensions from '../utils/use-windowdimensions'
import Styles from './app-header.module.css'

function AppHeader() {
    const { width } = useWindowDimensions()
    return (
        <header className={`${Styles.header}  `}>
            <div
                className={`${Styles.header__article}   `}
                style={{
                    left: 0,
                    position: 'sticky',
                    transform: `translateX(${((width - 1280) / 2) * (width > 1279)}px)`,
                }}
            >
                <div className={`${Styles.first__article} pl-4 `}>
                    <a href="#construct">
                        <BurgerIcon />
                        <span className="   text_type_main-default  pl-2  ">Конструктор</span>
                    </a>
                </div>
                <div className={`${Styles.second__article}  `}>
                    <a href="#orders">
                        <ListIcon />
                        <span className=" text_type_main-default text_color_inactive   pl-2     ">Лента заказов</span>
                    </a>
                </div>
                <div className={` ${Styles.logo}  `}>
                    <Logo />
                </div>
                <div className={`${Styles.last__article}  `}>
                    <a href="#profile">
                        <ProfileIcon />
                        <span className=" text_type_main-default  text_color_inactive   pl-2  ">Личный кабинет</span>
                    </a>
                </div>
            </div>
        </header>
    )
}

export default AppHeader
