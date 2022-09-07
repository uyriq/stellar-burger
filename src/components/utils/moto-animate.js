/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

export function MotoAnimate({ children }) {
    const randomDelay = (0.1 + 1.5 * Math.random()).toFixed(2)
    const randomDuration = (0.1 + 1.1 * Math.random()).toFixed(2)

    return (
        <motion.div
            transition={{
                loop: Infinity,
                ease: 'linear',
                duration: 1,
            }}
            initial="hidden"
            animate="visible"
            variants={{
                hidden: {
                    scale: 0.8,
                    opacity: 0,
                },
                visible: {
                    scale: 1,
                    opacity: 1,
                    transition: {
                        delay: randomDelay,
                        duration: randomDuration,
                        repeat: 10,
                        repeatType: 'loop',
                    },
                },
            }}
        >
            <h4 className="text text_type_main-small" style={{ transform: `translate(${-15}px, ${30}px)` }}>
                {children}
            </h4>
        </motion.div>
    )
}

MotoAnimate.propTypes = {
    children: PropTypes.string.isRequired,
}
