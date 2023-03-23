import styled from 'styled-components';

const Ul = styled.ul `
	display: flex;
	gap: 2em;
	list-style: none;
	padding: 0
`;

const A = styled.a`
	text-decoration: none;
  color: ${ props => props.theme.color };
	&:visited {
    color: ${ props => props.theme.color };
	}
`;

const Navbar = () => {
	return (
		<nav>
			<Ul>
				<li>
					<A href="feed">Feed</A>
				</li>
				<li>
					<A href="resume">Resume</A>
				</li>
			</Ul>
		</nav>
	)
}

export default Navbar;