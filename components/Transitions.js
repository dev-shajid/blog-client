import { motion } from "framer-motion";
import { useMediaQuery } from 'react-responsive'


const animationConfiguration = {
    initial: { opacity: 0, x: '00vw' },
    animate: { opacity: 1, x: '0' },
    exit: { opacity: 0, x: '00vw' },
};

const Transitions = ({ children }) => {
    const isMobile = useMediaQuery({ query: '(max-width: 480px)' })
    return (
        <motion.div
            // variants={animationConfiguration}
            // initial="initial"
            // animate="animate"
            // exit="exit"
            initial={{ opacity: 0, x: isMobile ? '0vw' : '0' }}
            animate={{ opacity: 1, x: '0' }}
            exit={{ opacity: 0, x: '0vw' }}
            transition={{ duration: .5 }}
        >
            {children}
        </motion.div >
    );
};
export default Transitions;