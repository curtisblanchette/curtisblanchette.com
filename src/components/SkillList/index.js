import React from "react";
import styled from "styled-components";

const Container = styled.div`
	flex: 1 1 250px;
	margin-bottom: 2em;
`;
const Ul = styled.ul`
  display: flex;
  list-style: none;
  margin: 1em 0 0 0;
  padding: 0;
  flex: 1 250px;
  gap: 1em;
  flex-direction: column;
  justify-content: space-around;
  color: ${ props => props.theme.color };
  transition: color .5s ease-in-out;
`;

const Li = styled.li`
	font-weight: 400;
	display: grid;
	grid: auto-flow / 18px auto;
	grid-gap: .5em;
	gap: .5em;
`;

const Icon = styled.i`
  font-family: 'FontAwesome', sans-serif;
`;

const Index = () => {
	return (
		<Container>
			<Ul>
				<Li><Icon className="fa fa-check highlight"/> <div>Business/Test Driven Development</div></Li>
				<Li><Icon className="fa fa-check highlight"/> PostgreSQL, MySQL, MongoDB, Redis, DynamoDB</Li>
				<Li><Icon className="fa fa-check highlight"/> CI/CD Pipelines and Automation</Li>
				<Li><Icon className="fa fa-check highlight"/> UI / UX Design</Li>
				<Li><Icon className="fa fa-check highlight"/> Webhooks and WebSockets</Li>
				<Li><Icon className="fa fa-check highlight"/> Object Relational Mapping</Li>
				<Li><Icon className="fa fa-check highlight"/> Object-Oriented Programming</Li>
				<Li><Icon className="fa fa-check highlight"/> Cloud Infrastructure (AWS, Azure, GCP)</Li>
				<Li><Icon className="fa fa-check highlight"/> Microservice Architectures</Li>
			</Ul>
		</Container>
	)
}

export default Index;