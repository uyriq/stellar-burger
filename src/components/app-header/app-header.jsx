import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon, } from "@ya.praktikum/react-developer-burger-ui-components"
import Styles from './app-header.module.css';

const AppHeader = () => {

    return (
        <header className={`${Styles.header}  `}>
            <div className={`${Styles.header__article} ${Styles.main}   `}>
                <div className={`${Styles.first__article} ${Styles.art1}   `}>
                    <a href="#construct"   ><BurgerIcon />
                        <span className='   text_type_main-default  pl-2  '>
                            Конструктор
                        </span>
                    </a>
                </div>
                <div className={`${Styles.first__article} ${Styles.art2}  `}>
                    <a href="#orders"  ><ListIcon />
                        <span className=' text_type_main-default text_color_inactive   pl-2     '>
                            Лента заказов
                        </span>
                    </a>
                </div>
                <div className={`${Styles.first__article} ${Styles.logo} ${Styles.art3}  `}>
                        <Logo />
                </div>
                <div className={`${Styles.last__article}  ${Styles.art4}  `}>
                    <a href="#profile"  ><ProfileIcon />
                        <span className=' text_type_main-default  text_color_inactive   pl-2  '>
                            Личный кабинет
                        </span>
                    </a>
                </div>
            </div>
        </header>
    )
}

export default AppHeader;
