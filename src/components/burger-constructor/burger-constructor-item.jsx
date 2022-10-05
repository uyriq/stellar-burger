/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types'
import { useRef, useEffect } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import Styles from './burger-constructor.module.css'

function BurgerConstructorItem({ children, key, index, value, moveCard }) {
    const ref = useRef()
    const [, drop] = useDrop({
        accept: 'card',
        hover: (item, monitor) => {
            if (!ref.current) {
                return
            }

            const dragIndex = item.uuid
            const hoverIndex = key

            if (dragIndex === hoverIndex) {
                return
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            moveCard(dragIndex, hoverIndex)

            item.uuid = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: 'card',
        item: { key, index, ...value },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0 : 1
    drag(drop(ref))
    // нужна проверка на булку, чтобы булку не перемещать if (item.type !== 'bun') drag(drop(ref));
    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
        }
    }, [])

    return (
        <li ref={ref} className={`${Styles['list-item']} `} style={{ ...Styles, opacity }}>
            {children}
        </li>
    )
}

//  для вставки ингредиента не вниз а сверху списка  переупорядочить список 
// setItems( (x) => [...x, makeItem()].sort(sortItems) )
function sortItems(a, b) {
    return a.key.localeCompare(b.key)
}

BurgerConstructorItem.propTypes = {
    children: PropTypes.objectOf(
        PropTypes.shape({
            uuid: PropTypes.string,
            _id: PropTypes.string,
            name: PropTypes.string,
            type: PropTypes.oneOf('mains', 'sauces'),
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
    index: PropTypes.number,
    key: PropTypes.string,
    moveCard: PropTypes.func,
}

export default BurgerConstructorItem
