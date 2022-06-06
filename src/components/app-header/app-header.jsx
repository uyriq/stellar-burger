import React from 'react';
import {	Logo, 	BurgerIcon, 	ListIcon, 	ProfileIcon, } from '../ui/react-developer-burger-ui-components';

import headerStyles from './app-header.module.css';

const AppHeader = () => {

    return (
        <header className={ [headerStyles.container, headerStyles.header].join(' ')}>
            <nav className={headerStyles.menu}>
                <ul className={headerStyles.list}>
                    
                        <BurgerIcon />
                        <span className='text text_type_main-default ml-2'>Конструктор</span>
                    
                     
                 
                        <ListIcon />
                        <span className='text text_type_main-default text_color_inactive ml-2'>Лента заказов</span>
                  
                        <Logo />
                 
                     
                        <ProfileIcon />
                 
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;
