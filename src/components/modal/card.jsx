import React from 'react'
import Style from './card.module.css'

//"proteins":44,"fat":26,"carbohydrates":85,"calories":643,

const Card = props => {
    console.log(props)
    return (<div>
        
                <div><img alt={props.name} srcset={`${props.image_mobile}, ${props.image} 1.5x ${props.image_large} 2x`} src={props.image_large} /></div>
                <p className='text text_type_main-medium'>{`${props.name}`}</p>
            <div className={` ${Style.box}`} >
                <div className={`${Style.card} ${Style.box}`}>Калории,ккал {`${props.calories}`}</div>
                <div className={`${Style.card} ${Style.box}`}>Белки,г {`${props.proteins}`} </div>
                <div className={`${Style.card} ${Style.box}`}>Жиры,г {`${props.fat}`} </div>
                <div className={`${Style.card} ${Style.box}`}>Углеводы, г {`${props.carbohydrates}`} </div>
            </div>
    </div>
    )
}
export default Card