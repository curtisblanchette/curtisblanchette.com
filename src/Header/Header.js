import React from 'react';
import styled from 'styled-components';

const Heading = styled.h1`
  font-size: 9vw;
  font-weight: 900;
  margin-bottom: 0;
	color: ${ props => props.theme.color };
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
  font-weight: 300;
`;

const Header = () => {
	return (
		<>
			<Heading>Curtis Blanchette</Heading>
			<Subheading className="subheading">
				<a href="mailto: hello@curtisblanchette">hello@curtisblanchette.com</a> | <a
				href="https://linkedin.com/in/curtisblanchette" rel="noreferrer"
				target="_blank">linkedin.com/in/curtisblanchette</a> | <a href="https://github.com/curtisblanchette/"
				                                                          rel="noreferrer"
				                                                          target="_blank">github.com/curtisblanchette</a>
			</Subheading>
		</>
	)
}

export default Header;