import React from 'react';
import { motion } from 'framer-motion';
import './toggleSwitch.css'

export default function ToggleSwitch(props) {

	const toggleSwitch = () => {
		props.setTheme(props.theme === 'light' ? 'dark' : 'light');
		props.setLightMode(!props.isOn);
	}
	return (
		<div className="switch" data-is-on={ props.isOn } onClick={ toggleSwitch }>
			<motion.div className="handle" layout transition={ spring } />

		</div>
	)
}

const spring = {
	type: 'spring',
	stiffness: 700,
	damping: 30
};
