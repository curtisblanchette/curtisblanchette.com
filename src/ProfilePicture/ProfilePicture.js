import styled from 'styled-components';
import profile from './github-profile.png';
const ProfileImage = styled.img`
  display: block;
  width: 100%;
  border-bottom: 10px solid #27AD30;
  max-width: 200px;
`;

const ProfilePicture = (props) => {
	const className = 'profile';

	return (
		<ProfileImage className={ className } src={ profile } alt="Profile"/>
	)
}

export default ProfilePicture