import node from './img/NodeJS.png'
import docker from './img/Docker.png';
import aws from './img/AWS.png';
import typescript from './img/Typescript.png';
import angular from './img/Angular.png';
import react from './img/React.png';
import postgres from './img/Postgres.png';
import mysql from './img/MySQL.png';
import terraform from './img/Terraform.png';
import ubuntu from './img/Ubuntu.png';
import bash from './img/Bash.png';
import sass from './img/Sass.png';
import React from "react";

import styled from 'styled-components';

const Proficiencies = styled.div`
  flex: 1 100%;
`;

const BorderContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1em 0;
  color: ${ props => props.theme.color };
  transition: color .5s ease-in-out;
`;

const BorderTitle = styled.div`
  min-width: max-content;
  font-size: 12px;
`;

const BorderLine = styled.div`
  width: 100%;
  border-bottom: 1px solid ${ props => props.theme.borderColor };
	transition: border-color .5s ease-in-out;
`;

const Logos = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1em;
  justify-content: space-between;
`;
const Image = styled.img`
  margin: 0;
  display: block;
  flex: 1 1 0;
  width: 6%;
  height: fit-content;
`;

const ProficiencyList = () => {


	const images = [ node, docker, aws, typescript, angular, react, postgres, mysql, terraform, ubuntu, bash, sass ];

	return (
		<Proficiencies>
			<BorderContainer>
				<BorderTitle>Highly proficient in</BorderTitle>
				<BorderLine/>
			</BorderContainer>
			<Logos>
				{
					images && images.map((img, i) => (
						<Image src={ img } key={ i } alt=""/>
					))
				}
			</Logos>
			<BorderContainer>
				<BorderLine/>
				<BorderTitle>and many more technologies.</BorderTitle>
			</BorderContainer>
		</Proficiencies>
	)
}

export default ProficiencyList;