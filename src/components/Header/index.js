import React from 'react';
import styled from 'styled-components';

const Heading = styled.h1`
  font-size: 9vw;
  font-weight: 900;
  margin-bottom: 10px;
	color: ${ props => props.theme.color };
  transition: color .5s ease-in-out;
  line-height: .9em;
  margin-top: 1.5em;

  @media all and (min-width: 615px) {
    font-size: 8vw;
    .container {
      gap: 2em;
    }
  }

  @media all and (min-width: 1024px) {
    font-size: 5em;
  }
`;

const Subheading = styled.div`
	width: fit-content;
  font-weight: 300;
	display: grid;
	flex-wrap: wrap;
	flex-direction: column;
	grid-gap: .5em;
  gap: .5em;
	padding-left: .5em;
	
	a {
		text-decoration: none;
	}
`;

const Index = () => {
	return (
		<>
			<Heading>Curtis Blanchette</Heading>
			<Subheading>
				<a href="mailto: hello@curtisblanchette"><i className="fa fa-envelope"/> hello@curtisblanchette.com</a>
				<a href="https://linkedin.com/in/curtisblanchette" rel="noreferrer" target="_blank"><i className="fa fa-linkedin"/> linkedin.com/in/curtisblanchette</a>
				<a href="https://github.com/curtisblanchette/" rel="noreferrer" target="_blank">< i className="fa fa-github"/> github.com/curtisblanchette</a>
			</Subheading>
		</>
	)
}

export default Index;