import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon, } from "@ya.praktikum/react-developer-burger-ui-components"


import Styles from './app-header.module.css';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css';
const AppHeader = () => {

    return (
        <header className={`${Styles.header} pl-20 pb-2 mt-2 pr-30 pr-30`}>
            <nav className={`${Styles.container_header}   pt-5 pb-5  pl-30 pr-20 `}>

                <div className={`${Styles.left}  pr-10 `}>
                    <a href="#construct" className='  ' >
                        <span className=' text_type_main-default pl-2'><BurgerIcon />
                            Конструктор
                        </span>
                    </a>
                </div>
                <div className={`${Styles.middle} pr-20  `}>
                    <a href="#orders" className=' '>
                        <span className=' text_type_main-default text_color_inactive   pl-2    '><ListIcon />
                            Лента заказов
                        </span>
                    </a>
                </div>
                <div className={`${Styles.right} ml-30 pl-30 `}>
                    <a href="#profile" className=' '>
                        <span className=' text_type_main-default  pl-2'><ProfileIcon />
                            Личный кабинет
                        </span>
                    </a>
                </div>
            </nav>
            <span className={Styles.logo}>
                <Logo />
            </span>
        </header>
    )
}

export default AppHeader;
