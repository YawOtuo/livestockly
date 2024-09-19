import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";

const SlideEnter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 2 }}>
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SlideEnter;
