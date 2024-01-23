
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';


const SlideEnterToLeft = ({children}) => {
    return(
        <motion.div
        initial={{
            opacity: 0, x: 500,
            backgroundColor:"#ffffff"
        }}
        animate={{ opacity: 1, x: 0,
            backgroundColor:"#ffffff"
        }}
        exit={{
            opacity:0,
            backgroundColor:"#fffff",

        }}
        transition={{
            duration:1,
            ease: 'easeInOut'
        }}
        exit={{ opacity: 0 }}
    >   
    {children}
    </motion.div>
    )
}

export default SlideEnterToLeft