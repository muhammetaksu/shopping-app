import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";
const animationConfiguration = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

let routesNonAnim = ["/profile-page/addresses/add", "/profile-page/addresses/list"];

const PageAnimation = ({ children, pathname }) => {
    return (
        <motion.div
            variants={animationConfiguration}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
        >
            <Outlet />
        </motion.div>
    );
};
export default PageAnimation;
