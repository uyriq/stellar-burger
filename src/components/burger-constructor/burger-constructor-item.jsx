/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import { useRef, useEffect } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import PropTypes from 'prop-types'
// похоже, что здесь не нужен проптайпс ингредиента, потому что приходит чилдрен элемент реакта.
// import { ingredientPropType } from '../../utils/prop-types'
import Styles from './burger-constructor.module.css'

function BurgerConstructorItem(props) {
    const { uuid, index, moveCard, children } = props
    const ref = useRef()
    const [, drop] = useDrop({
        accept: 'card',
        hover: (item, monitor) => {
            if (!ref.current) {
                return
            }
            const dragKey = item.uuid
            const dragIndex = item.index
            const hoverIndex = index

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

            moveCard(dragIndex, hoverIndex, dragKey)

            // eslint-disable-next-line no-param-reassign
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: 'card',
        item: { uuid, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0 : 1
    drag(drop(ref))

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
        }
    }, [])

    return (
        <li ref={ref} className={`${Styles.list__item} `} style={{ ...Styles, opacity }}>
            {children}
        </li>
    )
}

//  для вставки ингредиента не вниз а сверху списка  переупорядочить список
// setItems( (x) => [...x, makeItem()].sort(sortItems) )
/* function sortItems(a, b) {
    return a.key.localeCompare(b.key)
} */

BurgerConstructorItem.propTypes = {
    children: PropTypes.node.isRequired,
    index: PropTypes.number,
    uuid: PropTypes.string,
    moveCard: PropTypes.func,
}

export default BurgerConstructorItem
