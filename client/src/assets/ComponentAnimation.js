import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";
const animationConfiguration = {
    initial: { x: 300, opacity: 1 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 300, opacity: 0 },
};
const ComponentAnimation = ({ children }) => {
    return (
        <motion.div
            variants={animationConfiguration}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 3, type: "spring", stiffness: 260, damping: 20 }}
        >
            <Outlet />
        </motion.div>
    );
};
export default ComponentAnimation;
