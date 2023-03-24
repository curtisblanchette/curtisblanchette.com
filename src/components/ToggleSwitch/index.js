import React from 'react';
import { motion } from 'framer-motion';
import './toggleSwitch.css'
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, setLight, setDark } from "../../store/reducers/themeSlice";

export default function ToggleSwitch() {

	const theme = useSelector(selectTheme);
	const dispatch = useDispatch();
	const isOn = theme === 'light';

	const toggleSwitch = () => {
		const action = isOn ? setDark : setLight;
		dispatch(action())
	}
	return (
		<div className="switch"
		     data-is-on={ theme === 'light' }
		     onClick={ toggleSwitch }
		     style={{ justifyContent: isOn ? "flex-end" : "flex-start"}}
		>
			<motion.div className="handle" layout transition={ spring }>
				<motion.i
					className={ `icon far fa-${ isOn ? 'sun' : 'moon' }` }
					key={ isOn ? 'sun' : 'moon' }
					initial={ { translateY: -20, opacity: 0 } }
					animate={ { translateY: 0, opacity: 1 } }
					// exit={ { translateY: 20, opacity: 0 } }
					transition={ { duration: .2 } }
				/>
			</motion.div>
		</div>
	)
}

const spring = {
	type: 'spring',
	stiffness: 700,
	damping: 30
};
