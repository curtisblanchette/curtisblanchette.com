import styles from "./switch.module.css";

const ThemeSwitch = (props) => {

	function handleSwitch() {
		props.setTheme(props.theme === 'light' ? 'dark' : 'light');
		props.setLightMode(!props.checked);
	}

	return (
		// this component gets re-rendered whenever the state changes
		// the dom is updated and the transition isn't given a chance to live
		<label className={ styles.switch }>
			<input type="checkbox" checked={ props.checked } onChange={ handleSwitch }/>
			<span className={ styles.slider }></span>
		</label>

	)
}

export default ThemeSwitch;