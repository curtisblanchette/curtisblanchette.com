import node from '../../assets/NodeJS.png'
import docker from '../../assets/Docker.png';
import aws from '../../assets/AWS.png';
import typescript from '../../assets/Typescript.png';
import angular from '../../assets/Angular.png';
import react from '../../assets/React.png';
import postgres from '../../assets/Postgres.png';
import mysql from '../../assets/MySQL.png';
import terraform from '../../assets/Terraform.png';
import ubuntu from '../../assets/Ubuntu.png';
import bash from '../../assets/Bash.png';
import sass from '../../assets/Sass.png';
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
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  gap: 1em;
  justify-content: center;
`;
const Image = styled.img`
  margin: 0;
  display: block;
  flex: 1 1 auto;
	max-width: 60px;
`;

const Index = () => {

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

export default Index;