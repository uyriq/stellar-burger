import React from 'react';
import { Counter, CurrencyIcon } from '../ui/react-developer-burger-ui-components';

import Styles from './burger-ingredients-item.module.css';
import '../ui/box.css';
import '../ui/common.css';



const BurgerIngredientsItem = ({ingredient}) => {

	return (
		<li onClick={() => (ingredient)} className={`${Styles.item} mb-8`}>
			<Counter count={1} size="default" />
			<img src={ingredient.image} alt={ingredient.name} className='ml-4 mr-4 mb-1' />
			<div className={`${Styles.currency} mb-1`}>
				<span className='text text_type_digits-default mr-2'>{ingredient.price}</span>
				<CurrencyIcon />
			</div>
			<p className='text text_type_main-default'>{ingredient.name}</p>
		</li>
	)
}

export default BurgerIngredientsItem;
