/* eslint-disable camelcase */
import { PropTypes } from 'prop-types'
import Style from './card.module.css'
// import { ingredientPropType } from '../utils/prop-types'

function Card(props) {
    const { image_mobile, image, image_large, name, calories, proteins, fat, carbohydrates } = props
    return (
        <div className={` ${Style.box} `}>
            <div className={` ${Style.div1} `}>
                <img srcSet={` ${image_mobile} .2x,  ${image} 0.5x, ${image_large} 1x `} alt={name} src={image_large} />
            </div>
            <div className={` ${Style.div2}  `}>
                <p className=" text_type_main-medium text">{`${name}`}</p>
            </div>
            <div className={` ${Style.div3}   text  text_color_inactive text_type_main-small  `}> Калории, ккал </div>
            <div className={` ${Style.div4}   text_type_digits-default text_color_inactive  `}> {`${calories}`} </div>
            <div className={` ${Style.div5}   text_color_inactive text_type_main-small  `}> Белки, г </div>
            <div className={` ${Style.div6}   text_type_digits-default text_color_inactive  `}> {`${proteins}`} </div>
            <div className={` ${Style.div7}   text_color_inactive text_type_main-small  `}> Жиры, г </div>
            <div className={` ${Style.div8}   text_type_digits-default text_color_inactive `}> {`${fat}`} </div>
            <div className={` ${Style.div9}   text_color_inactive text_type_main-small  `}> Углеводы, г </div>
            <div className={` ${Style.div10}  text_type_digits-default text_color_inactive `}>
                {' '}
                {`${carbohydrates}`}{' '}
            </div>
        </div>
    )
}

Card.propTypes = {
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    image: PropTypes.number.isRequired,
    image_large: PropTypes.number.isRequired,
    image_mobile: PropTypes.number.isRequired,
    name: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
}

export default Card
