import PropTypes from "prop-types"
import { useRef, useEffect, } from "react";


function BurgerConstructorItem({ children }) {
    const ref = useRef();

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [ref]);

    return (
        <li className="Item" ref={ref}>
            {children}
        </li>
    );
}

function sortItems(a, b) {
    return a.key.localeCompare(b.key);
}

BurgerConstructorItem.propTypes = {
    children: PropTypes.objectOf(
        PropTypes.shape({
            value: PropTypes.string,
            key: PropTypes.string,
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
    ).isRequired
}

export default BurgerConstructorItem
