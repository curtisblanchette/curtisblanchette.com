import { useRef } from 'react';
import { motion, useCycle } from 'framer-motion';
import { useDimensions } from './use-dimensions';
import { MenuToggle } from './MenuToggle';
import styles from './menu.module.css';

const delay = .25;

const container = {
  open: {
    width: 300,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
  closed: {
    width: 0,
    transition: {
      delay,
      type: "spring",
      stiffness: 400,
      damping: 40,
    }
  }
};
const sidebar = {
  open: (height = 1000) => ({
		clipPath: `circle(${ height * 2 + 200 }px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(20px at 40px 40px)",
    transition: {
      delay,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  }
};

export const Menu = () => {
  const [ isOpen, toggleOpen ] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <motion.main
      animate={ isOpen ? "open" : "closed" }
      variants={container}
    >
      <motion.nav
        initial={ false }
        animate={ isOpen ? "open" : "closed" }
        custom={ height }
        ref={ containerRef }>
        <motion.div className={ styles.background } variants={ sidebar } />

        <MenuToggle toggle={ () => toggleOpen() } />
      </motion.nav>
    </motion.main>
  )
}