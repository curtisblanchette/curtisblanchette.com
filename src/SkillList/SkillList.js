import React from "react";
import styled from "styled-components";

const Container = styled.ul`
  display: flex;
  list-style: none;
  margin: 1em 0 0 0;
  padding: 0;
  flex: 1 250px;
  gap: 1em;
  flex-direction: column;
  justify-content: space-around;
  color: ${ props => props.theme.color };
`;

const Icon = styled.i`
  font-family: 'FontAwesome', sans-serif;
`;

const SkillList = () => {
	return (
		<Container>
			<li><Icon className="fa fa-check highlight"/> Business/Test Driven Development</li>
			<li><Icon className="fa fa-check highlight"/> No SQL/SQL Databases</li>
			<li><Icon className="fa fa-check highlight"/> Webhooks and WebSockets</li>
			<li><Icon className="fa fa-check highlight"/> Object Relational Mapping</li>
			<li><Icon className="fa fa-check highlight"/> Object-Oriented Programming</li>
			<li><Icon className="fa fa-check highlight"/> Infrastructure as Code</li>
			<li><Icon className="fa fa-check highlight"/> Microservice Architectures</li>
		</Container>
	)
}

export default SkillList;