import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon, } from '../ui/react-developer-burger-ui-components';

import headerStyles from './app-header.module.css';
import '../ui/box.css';
import '../ui/common.css';
const AppHeader = () => {

    return (
        <header className={[headerStyles.header].join(' ').concat(' pl-20 pb-2 mt-2 pr-30 pr-30')}>
            <nav className={[headerStyles.container_header].join(' ').concat('   pt-5 pb-5  pl-30 pr-20 ')}>

                <div className={[headerStyles.left].join(' ').concat(' pr-10 ')}>
                    <a href="#" className='  ' >


                        <span className=' text text_type_main-default pl-1'><BurgerIcon />Конструктор</span>
                    </a>

                    </div>

                    <div className={[headerStyles.middle].join(' ').concat(' mr-30  ')}>
                    <a href="#" className=' '>


                        <span className=' text text_type_main-default text_color_inactive  pl-1'><ListIcon />Лента заказов</span>
                    </a>

                    </div>

                 

                <div className={[headerStyles.right].join(' ').concat(' ml-30 pl-30  ')}>
                    <a href="#" className=''>
                        <span className=' text text_type_main-default  pl-1'><ProfileIcon />
                        Личный кабинет</span>
                    </a>
                </div>

            </nav>
            <span className={[headerStyles.logo].join(' ').concat('    ')}>                        <Logo />                     </span>
        </header>
    )
}

export default AppHeader;
