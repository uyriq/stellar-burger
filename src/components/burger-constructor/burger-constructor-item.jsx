/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import PropTypes from "prop-types"
import { useRef, useEffect, } from "react";
import Styles from './burger-constructor.module.css'

function BurgerConstructorItem({ children }) {
    const ref = useRef();

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [ref]);

    return (
        <li ref={ref} className={`${Styles['list-item']} `}>
            {children}
        </li>
    );
}

// для вставки ингредиента не вниз а сверху списка  переупорядочить список  setItems( (x) => [...x, makeItem()].sort(sortItems) )
function sortItems(a, b) {
    return a.key.localeCompare(b.key);
}

BurgerConstructorItem.propTypes = {
    children: PropTypes.objectOf(
        PropTypes.shape({
            uuid: PropTypes.string,
            _id: PropTypes.string,
            name: PropTypes.string,
            type: PropTypes.oneOf("mains", "sauces"),
            proteins: PropTypes.number,
            fat: PropTypes.number,
            carbohydrates: PropTypes.number,
            calories: PropTypes.number,
            price: PropTypes.number,
            image: PropTypes.string,
            image_mobile: PropTypes.string,
            image_large: PropTypes.string,
            __v: PropTypes.number,
        })
    ).isRequired,
    value: PropTypes.string,
    key: PropTypes.string,
}

export default BurgerConstructorItem
