import PropTypes from 'prop-types'
import { useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { addBun, addNotBun } from '../../store/slices/burger-constructor-slice'
import { setActiveIngredientById, selectActiveIngredient } from '../../store/slices/fetched-data-slice'

function CategoryDropAccept({ children, className, category }) {
    const activeIngredient = useSelector(selectActiveIngredient)
    const dispatch = useDispatch()
    const [{ isOver, canDrop }, dropRef] = useDrop({
        accept: 'ingredient',
        drop(item) {
            dispatch(setActiveIngredientById(item))
            if (item.type === 'bun') {
                let _item = { ...activeIngredient }
                dispatch(addBun(_item))
            }
            if (item.type !== 'bun') {
                let _item = { ...activeIngredient }
                dispatch(addNotBun(_item))
            }
        }, //
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        // Override monitor.canDrop() function
        canDrop: (item) => {
            const { type: currentLayoutCategory } = item
            return currentLayoutCategory === category || currentLayoutCategory !== 'bun'
        },
    })

    // eslint-disable-next-line consistent-return
    const getBackgroundColor = () => {
        if (isOver) {
            if (canDrop) {
                return 'rgb(188,251,255)'
            }
            if (!canDrop) {
                return 'rgb(255,188,188)'
            }
        } else {
            return ''
        }
    }

    return (
        <div ref={dropRef} className={className} style={{ backgroundColor: getBackgroundColor() }}>
            {children}
        </div>
    )
}

CategoryDropAccept.defaultProps = {
    className: {},
}

CategoryDropAccept.propTypes = {
    category: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    className: PropTypes.element,
}

export default CategoryDropAccept
