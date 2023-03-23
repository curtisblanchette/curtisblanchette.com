import styled from 'styled-components';
import profile from '../../assets/github-profile.png';

const ProfileImage = styled.img`
  display: block;
  width: 100%;
  border: 6px solid rgb(39, 173, 48);
  max-width: 200px;
  border-radius: 100%;
  margin-top: 4em;
`;

const Index = (props) => {
	const className = 'profile';

	return (
		<ProfileImage className={ className } src={ profile } alt="Profile"/>
	)
}

export default Index