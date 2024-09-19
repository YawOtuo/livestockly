
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';
import React from 'react';


const SlideEnterToLeft = ({children} : {children : React.ReactNode}) => {
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
    >   
    {children}
    </motion.div>
    )
}

export default SlideEnterToLeft