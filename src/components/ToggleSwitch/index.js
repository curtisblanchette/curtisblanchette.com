import React from 'react';
import { motion } from 'framer-motion';
import './toggleSwitch.css'
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, setLight, setDark } from "./themeSlice";

export default function Index(props) {

	const theme = useSelector(selectTheme);
	const dispatch = useDispatch();
	const isOn = theme === 'light';

	const toggleSwitch = () => {
		const action = isOn ? setDark : setLight;
		dispatch(action())
	}
	return (
		<div className="switch" data-is-on={ theme === 'light' } onClick={ toggleSwitch }>
			<motion.div className="handle" layout transition={ spring } />
		</div>
	)
}

const spring = {
	type: 'spring',
	stiffness: 700,
	damping: 30
};
