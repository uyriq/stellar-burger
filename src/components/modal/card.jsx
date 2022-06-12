import React from 'react'
import Style from './card.module.css'

//"proteins":44,"fat":26,"carbohydrates":85,"calories":643,

const Card = props => {
    console.log(props)
    return (<div>

        <div className={`${Style.img_cont} `}><img alt={props.name} srcSet={`${props.image_large} 2x  ${props.image} 1.5x ${props.image_mobile}`} src={props.image_large} /></div>
        <p className={`${Style.ingred_name}  text text_type_main-medium `}>{`${props.name}`}</p>
        <div className={` ${Style.box}`} >
            <div className={`${Style.card} ${Style.box}`}>< p className={`${Style.data_title}`}>Калории, ккал </ p > < p className={`${Style.data_value}`} > {`${props.calories}`}</ p ></div>
            <div className={`${Style.card} ${Style.box}`}>< p className={`${Style.data_title}`}>Белки, г </ p >< p className={`${Style.data_value}`}>{`${props.proteins}`} </ p ></div>
            <div className={`${Style.card} ${Style.box}`}>< p className={`${Style.data_title}`}>Жиры, г </ p >< p className={`${Style.data_value}`}>{`${props.fat}`}</ p > </div>
            <div className={`${Style.card} ${Style.box}`}>< p className={`${Style.data_title}`}>Углеводы, г </ p > < p className={`${Style.data_value} `} >{`${props.carbohydrates}`} </ p ></div>
        </div>
    </div>
    )
}
export default Card