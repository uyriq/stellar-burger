import React from 'react';
import {	Logo, 	BurgerIcon, 	ListIcon, 	ProfileIcon, } from '../ui/react-developer-burger-ui-components';

import headerStyles from './app-header.module.css';
import './box.css';
const AppHeader = () => {

    return (
        <header className={ [headerStyles.header].join(' ').concat(' p-4 ') }>
            <nav className={ [headerStyles.container_header ].join(' ').concat('  pt-4  ml-20 mr-20 ') }>
              
                        <article className={[headerStyles.left].join(' ').concat(' ')}>
                                                   <a href="#" className=' ml-20 ' >
                                                       
                                                        <BurgerIcon  />
                                                        <span className=' text text_type_main-default ml-2 '>Конструктор</span>
                                                   </a>
                                                
                                                 
                                             <a href="#" className=' ml-20 mr-10'>
                                                 
                                                        <ListIcon />
                                                        <span className='text text_type_main-default text_color_inactive ml-2 '>Лента заказов</span>
                                             </a>
                         
                  
                        
                            <Logo /> 
                        </article>
                 
                        <article className={[headerStyles.right].join(' ').concat(' ')}>
                        <a href="#" className=''>

                            <ProfileIcon /> 
                            <span className=' text text_type_main-default p-1 '>Личный кабинет</span>
                        </a>
                        </article>
                 
            </nav>
        </header>
    )
}

export default AppHeader;
