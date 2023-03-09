import styled from 'styled-components';
import React from "react";
import graph from './contributions-graph.svg';
import { ReactSVG } from "react-svg";
import './graph-theme.css';

const Title = styled.h3`
  font-weight: 300;
  font-size: 1.25em;
  display: flex;
  align-items: center;
  gap: 1em;
	color: ${ props => props.theme.color };
`;

const Icon = styled.i`
  font-size: 1.5em;
  min-width: 1.5em;
  text-align: center;
`;

const Accreditations = styled.div`
  flex: 1 50%;
`;

const Accreditation = (props) => {
	const iconClass = `fa ${props.icon}`;
	return (
		<Title><Icon className={iconClass}></Icon> { props.title }</Title>
	)
};

const AccreditationList = (props) => {
	return (
		<Accreditations>
			<Accreditation icon="fa-user-graduate" title="Diploma Graphic Design / Web Development 2014"/>
			<Accreditation icon="fa-trophy" title="Winners Startup Weekend Okanagan 2014"/>
			<Accreditation icon="fa-github" title="8,264 Git contributions in the last year"/>

			<ReactSVG src={ graph } style={{ width: 'inherit', height: 'inherit' }} />


		</Accreditations>
	)
};

export default AccreditationList;