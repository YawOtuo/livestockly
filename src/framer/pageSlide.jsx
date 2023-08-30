import { AnimatePresence } from "framer-motion"

const PageSlide = ({ children }) => {
    return (
        <AnimatePresence mode="wait" initial={false}>
            {children}      
            </AnimatePresence>
    )
}

export default PageSlide