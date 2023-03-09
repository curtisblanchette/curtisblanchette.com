import React from 'react';
import styled from 'styled-components';

const HeroBlock = styled.p`
	color: ${ props => props.theme.color };
  transition: color .5s ease-in-out;
  letter-spacing: .02em;
  font-weight: 300;
  line-height: 1.4em;
  margin: 3em 0;
`;

const Hero = () => {
	return (
		<HeroBlock>
			I am Curtis Blanchette, a professional <span className="highlight">Full-Stack Software Engineer</span> with an
			extensive UX/UI background carrying many front-end and back-end engineering skills with over <span
			className="highlight">nine years of experience</span> architecting and engineering software solutions at both
			the startup and enterprise levels. An incredibly well-rounded individual who profoundly cares about design and
			code quality. I rock and roll, dream business logic and find inspiration in solutions designed to help meet
			client needs timely and effectively—highly skilled team collaborator while working independently
			within remote environments.
		</HeroBlock>
	);
}

export default Hero;