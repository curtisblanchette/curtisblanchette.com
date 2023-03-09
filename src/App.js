import ProfilePicture from "./ProfilePicture/ProfilePicture";
import Header from "./Header/Header";
import Hero from "./Hero/Hero";
import ExperienceList from "./ExperienceList/ExperienceList";
import AccreditationList from "./AccreditationList/AccreditationList";
import SkillList from "./SkillList/SkillList";
import ProficiencyList from "./ProficiencyList/ProficiencyList";
import React, { useState } from "react";
import styles from "./switch.module.css";
import styled, { ThemeProvider } from 'styled-components';

const Container = styled.div`
  border-radius: 4px;
  position: relative;
  box-shadow: 2px 0 5px rgb(0 0 0 / 25%);
  display: flex;
  max-width: 1024px;
  width: 100%;
  flex-wrap: wrap;
  overflow: hidden;
  margin: 0 auto;
  gap: 0;
  padding: 0 2em 4em 2em;
  background: ${ props => props.theme.background };
	transition: background .5s ease-in-out;

  a {
    color: ${ props => props.theme.color };
    transition: color .5s ease-in-out;
  }

  .content {
    flex: 1 1 60%;
    min-width: 0;
  }

  .aside {
    justify-content: space-around;
    widtH: auto;
    flex: 1 1 200px;
    flex-grow: 0;
  }

  @media all and (min-width: 615px) {
    gap: 2em;
  }
`;

const BlockQuote = styled.blockquote`
  text-align: right;
  font-style: italic;
  margin: 0 0 0 auto;
  color: ${ props => props.theme.color };
  transition: color .5s ease-in-out;
`;


const App = () => {

	const themes = {
		dark: {
			color: '#f3f3f3',
			background: '#252525',
			borderColor: 'rgba(255, 255, 255, .25)'
		},
		light: {
			color: '#252525',
			background: '#f3f3f3',
			borderColor: 'rgba(0, 0, 0, .25)'
		}
	}

	const [ theme, setTheme ] = useState('dark');
	const [ lightMode, setLightMode ] = useState(false);

	const ThemeSwitch = (props) => {

		function handleSwitch() {
			setTheme(theme === 'light' ? 'dark' : 'light');
			setLightMode(!props.checked);
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


	return (
		<ThemeProvider theme={ themes[theme] }>
			<Container>
				<ThemeSwitch checked={lightMode}/>
				<aside>
					<ProfilePicture/>
				</aside>
				<div className="content">
					<Header/>
					<Hero/>
					<ExperienceList/>
					<section className="competence">
						<AccreditationList/>
						<SkillList/>
						<ProficiencyList/>
					</section>
					<section>
						<BlockQuote cite="Albert Einstein">
							"Logic will get you from A to Z; Imagination will get you everywhere."<br/>
							- Albert Einstein
						</BlockQuote>
					</section>
				</div>
			</Container>
		</ThemeProvider>
	)
}

export default App;