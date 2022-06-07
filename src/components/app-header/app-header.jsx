import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon, } from '../ui/react-developer-burger-ui-components';

import headerStyles from './app-header.module.css';
import './box.css';
const AppHeader = () => {

    return (
        <header className={[headerStyles.header].join(' ').concat(' ')}>
            <nav className={[headerStyles.container_header].join(' ').concat('  pt-1 mt-1   ')}>

                <article className={[headerStyles.left].join(' ').concat(' ')}>
                    <a href="#" className=' ml-10 ' >


                        <span className=' text text_type_main-default pl-2'><BurgerIcon />Конструктор</span>
                    </a>


                    <a href="#" className=' ml-5 mr-10 '>


                        <span className=' text text_type_main-default text_color_inactive  pl-2'><ListIcon />Лента заказов</span>
                    </a>



                    <span className={headerStyles.logo}>
                        <Logo />
                    </span>
                </article>

                <article className={[headerStyles.right].join(' ').concat('  mr-10 ')}>
                    <a href="#" className=''><span className=' text text_type_main-default  pl-2'><ProfileIcon />
                        Личный кабинет</span>
                    </a>
                </article>

            </nav>
        </header>
    )
}

export default AppHeader;
