import React from 'react';
import useWindowDimensions from '../utils/use-windowdimensions'
import { Logo, BurgerIcon, ListIcon, ProfileIcon, } from "@ya.praktikum/react-developer-burger-ui-components"
import Styles from './app-header.module.css';
import { getParseTreeNode } from 'typescript';

const AppHeader = () => {
    const { width } = useWindowDimensions();
    console.log(width)
    return (
        <header className={`${Styles.header}  `}
        >
            <div className={`${Styles.header__article}   `}
                style={{
                    left: 0,
                    position: "sticky",
                    transform: `translateX(${((width - 1280) / 2) * (width > 1279)}px)`,
                }}//  смещение 0  если < 1279
            >
                <div className={`${Styles.first__article} pl-4 `}
                >
                    <a href="#construct"   ><BurgerIcon />
                        <span className='   text_type_main-default  pl-2  '>
                            Конструктор
                        </span>
                    </a>
                </div>
                <div className={`${Styles.second__article}  `}
                >
                    <a href="#orders"  ><ListIcon />
                        <span className=' text_type_main-default text_color_inactive   pl-2     '>
                            Лента заказов
                        </span>
                    </a>
                </div>
                <div className={` ${Styles.logo}  `}
                >
                    <Logo />
                </div>
                <div className={`${Styles.last__article}  `}
                >
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
