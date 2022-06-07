import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon, } from '../ui/react-developer-burger-ui-components';

import headerStyles from './app-header.module.css';
import './box.css';
const AppHeader = () => {

    return (
        <header className={[headerStyles.header].join(' ').concat(' ml-20 pb-2 ')}>
            <nav className={[headerStyles.container_header].join(' ').concat('   pt-5 pb-5 mt-5  ml-10 ')}>

                <article className={[headerStyles.left].join(' ').concat(' ml-20 ')}>
                    <a href="#" className='  ' >


                        <span className=' text text_type_main-default pl-1'><BurgerIcon />Конструктор</span>
                    </a>

                    </article>

                    <article className={[headerStyles.middle].join(' ').concat(' mr-30  ')}>
                    <a href="#" className=' '>


                        <span className=' text text_type_main-default text_color_inactive  pl-1'><ListIcon />Лента заказов</span>
                    </a>

                    </article>

                 

                <article className={[headerStyles.right].join(' ').concat(' pl-30 ml-30   ')}>
                    <a href="#" className=''>
                        <span className=' text text_type_main-default  pl-1'><ProfileIcon />
                        Личный кабинет</span>
                    </a>
                </article>

            </nav>
            <span className={[headerStyles.logo].join(' ').concat('    ')}>                        <Logo />                     </span>
        </header>
    )
}

export default AppHeader;
