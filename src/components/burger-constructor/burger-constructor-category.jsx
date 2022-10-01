import PropTypes from 'prop-types'
import { useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { addBun, addNotBun, selectBunsCart } from '../../store/slices/burger-constructor-slice'

function CategoryDropAccept({ children, category: currentLayoutCategory }) {
    const bunsCart = useSelector(selectBunsCart)
    const dispatch = useDispatch()
    const [{ isOver, canDrop }, dropRef] = useDrop({
        accept: 'ingredient',
        drop(item) {
            if (item.type === 'bun') {
                dispatch(addBun(item))
            }
            if (item.type !== 'bun') {
                dispatch(addNotBun(item))
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        // Override monitor.canDrop() function
        canDrop: (item) => {
            const { type: currentItemCategory } = item
            return (
                currentItemCategory === currentLayoutCategory ||
                (currentItemCategory !== 'bun' &&
                    currentLayoutCategory !== 'bun' &&
                    // eslint-disable-next-line no-underscore-dangle
                    Boolean(bunsCart._id.length !== 0 && bunsCart._id !== ''))
            )
        },
    })

    // eslint-disable-next-line consistent-return
    const getBackgroundColor = () => {
        if (isOver) {
            if (canDrop) {
                return 'cyan'
            }
            if (!canDrop) {
                return 'red'
            }
        } else {
            return ''
        }
    }

    return (
        <div ref={dropRef} style={{ backgroundColor: getBackgroundColor() }}>
            {children}
        </div>
    )
}

CategoryDropAccept.propTypes = {
    category: PropTypes.string.isRequired, // имя секции в бургер-конструкторе [bun,sauces,main]
    children: PropTypes.element.isRequired, // набор отмапленных ingredients => li-элементов
}

export default CategoryDropAccept
