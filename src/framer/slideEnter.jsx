
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';

const SlideEnter = ({children}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 2 }}>
            {children}
        </motion.div>
    </AnimatePresence>
  );
};


export default SlideEnter