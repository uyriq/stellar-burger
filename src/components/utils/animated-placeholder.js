/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import Styles from './animated-placeholder.module.css'

export function AnimatedPlaceholder({ children }) {
    const randomDelay = (0.1 + 0.8 * Math.random()).toFixed(2)
    const randomDuration = (0.1 + 0.2 * Math.random()).toFixed(2)

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
            <h4 className={`${Styles.placeholder} text text_type_main-small`}>{children}</h4>
        </motion.div>
    )
}

AnimatedPlaceholder.propTypes = {
    children: PropTypes.string.isRequired,
}
