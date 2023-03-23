import styled from 'styled-components';
import React from "react";
// import graph from './contributions-graph.svg';
// import { ReactSVG } from "react-svg";
import './graph-theme.css';

const Title = styled.h3`
  font-weight: 300;
  font-size: 1.15em;
  display: grid;
  grid: auto-flow / 40px auto;
  grid-gap: 1em;
  gap: 1em;
  align-items: center;
	color: ${ props => props.theme.color };
	transition: color .5s ease-in-out;
`;

const Icon = styled.i`
  font-size: 1.5em;
  min-width: 1.5em;
  text-align: center;
`;

const Accreditations = styled.div`
  flex: 1 1 50%;
`;

const Accreditation = (props) => {
	const iconClass = `fa fa-solid ${props.icon}`;
	return (
		<Title><Icon className={iconClass}></Icon> { props.title }</Title>
	)
};

const Index = (props) => {
	return (
		<Accreditations>
			<Accreditation icon="fa-person-chalkboard" title="Tony Robbins Unleash the Power Within 2020"/>
			<Accreditation icon="fa-person-snowboarding" title="Competitive Wakeboarder in Men’s Cable Park 2019"/>
			<Accreditation icon="fa-guitar" title="Avid Guitarist - Music on iTunes & Google Play 2017"/>
			<Accreditation icon="fa-user-graduate" title="Diploma Graphic Design / Web Development 2014"/>
			<Accreditation icon="fa-trophy" title="Winner of Startup Weekend Okanagan 2014"/>
			<Accreditation icon="fa-github" title="8,264 Git contributions in the last year"/>
			{/*<ReactSVG src={ graph } style={{ width: 'inherit', height: 'inherit' }} />*/}
		</Accreditations>
	)
};

export default Index;