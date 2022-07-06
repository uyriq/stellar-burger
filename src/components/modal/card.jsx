import React from 'react'
import Style from './card.module.css'
import { ingredientPropType } from '../utils/prop-types'


const Card = props => {
    
    return (
        <div className={` ${Style.box} `}  >
            <div className={` ${Style.div1} `}>
                <img alt={props.name} srcSet={`${props.image_large} 2x  ${props.image} 1.5x ${props.image_mobile} 1x `} src={props.image_large} />
            </div>
            <div className={` ${Style.div2}  `} >
                <p className=' text_type_main-medium text'>{`${props.name}`}</p>
            </div>
            <div className={` ${Style.div3}   text  text_color_inactive text_type_main-small  `}> Калории, ккал </div>
            <div className={` ${Style.div4}   text_type_digits-default text_color_inactive  `}> {`${props.calories}`} </div>
            <div className={` ${Style.div5}   text_color_inactive text_type_main-small  `}> Белки, г </div>
            <div className={` ${Style.div6}   text_type_digits-default text_color_inactive  `}> {`${props.proteins}`} </div>
            <div className={` ${Style.div7}   text_color_inactive text_type_main-small  `}> Жиры, г  </div>
            <div className={` ${Style.div8}   text_type_digits-default text_color_inactive `}> {`${props.fat}`} </div>
            <div className={` ${Style.div9}   text_color_inactive text_type_main-small  `}> Углеводы, г  </div>
            <div className={` ${Style.div10}  text_type_digits-default text_color_inactive `}> {`${props.carbohydrates}`} </div>
        </div>
    )
}

Card.propTypes =  {ingredientPropType}.isRequired
 
export default Card