import ProfilePicture from "./ProfilePicture/ProfilePicture";
import Header from "./Header/Header";
import Hero from "./Hero/Hero";
import ExperienceList from "./ExperienceList/ExperienceList";
import AccreditationList from "./AccreditationList/AccreditationList";
import SkillList from "./SkillList/SkillList";
import ProficiencyList from "./ProficiencyList/ProficiencyList";
import React, { useState } from "react";
import "./ThemeSwitch.css";
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

  a {
    color: ${ props => props.theme.color };
  }

  .content {
    flex: 4 60%;
    min-width: 0;
  }

  .aside {
    justify-content: space-around;
    flex: 1 200px;
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
	color: ${props => props.theme.color };
`;


const App = () => {

	const themes = {
		light: {
			color: '#f3f3f3',
			background: '#252525'
		},
		dark: {
			color: '#252525',
			background: '#f3f3f3'
		}
	}

	const [ theme, setTheme ] = useState('light');
	const [ checked, setChecked ] = useState(false);

	const ThemeSwitch = () => {

		function handleSwitch() {
			setTheme(theme === 'light' ? 'dark' : 'light');
			setChecked(!checked);
		}

		return (
			<label className="switch">
				<input type="checkbox" checked={ checked } onChange={ handleSwitch }/>
				<span className="slider"></span>
			</label>
		)
	}


	return (
		<ThemeProvider theme={ themes[theme] }>
			<Container>
				<ThemeSwitch/>
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