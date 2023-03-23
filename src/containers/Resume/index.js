import ProfilePicture from "../../components/ProfilePicture";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import ExperienceList from "../../components/ExperienceList";
import Index from "../../components/AccreditationList";
import SkillList from "../../components/SkillList";
import ProficiencyList from "../../components/ProficiencyList";
import React, { useState } from "react";
import styled, { ThemeProvider } from 'styled-components';
import ToggleSwitch from "../../components/ToggleSwitch";
import { selectTheme } from "../../components/ToggleSwitch/themeSlice";
import { useSelector } from "react-redux";

const Main = styled.main`
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

const FlexSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
`

const BlockQuote = styled.blockquote`
  text-align: right;
  font-style: italic;
  margin: 0 0 0 auto;
  color: ${ props => props.theme.color };
  transition: color .5s ease-in-out;
`;
// pull variables from root
const light = getComputedStyle(document.documentElement).getPropertyValue('--light');
const dark = getComputedStyle(document.documentElement).getPropertyValue('--dark');

const themes = {
	dark: {
		color: light,
		background: dark,
		borderColor: 'rgba(255, 255, 255, .25)'
	},
	light: {
		color: dark,
		background: light,
		borderColor: 'rgba(0, 0, 0, .25)'
	}
}

const Resume = () => {

	const theme = useSelector(selectTheme);

	return (
		<ThemeProvider theme={ themes[theme] }>
			<Main>
				{/*<ThemeSwitch checked={lightMode} setTheme={setTheme} theme={theme} setLightMode={setLightMode}/>*/ }
				<ToggleSwitch></ToggleSwitch>
				<aside>
					<ProfilePicture />
				</aside>
				<div className="content">
					<Header />
					<Hero />
					<ExperienceList />
					<FlexSection>
						<Index />
						<SkillList />
					</FlexSection>
					<ProficiencyList />
					<section>
						<BlockQuote cite="Albert Einstein">
							"Logic will get you from A to Z; Imagination will get you everywhere."<br />
							- Albert Einstein
						</BlockQuote>
					</section>
				</div>
			</Main>
		</ThemeProvider>
	)
}

export default Resume;