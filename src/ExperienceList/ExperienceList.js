import { experienceList } from './data';
import arrow from './arrow.svg';
import { useState } from "react";
import styled from 'styled-components';
import styles from './experiences.module.css';

const Container = styled.section`
  overflow: hidden;
  transition: max-height .25s ease-in-out;
  //max-height: ${ props => !props.showMore ? '1000px' : '10000px' };
`;

const Article = styled.article`
  border-bottom: 1px solid ${props => props.theme === 'light' ?  'rgba(0, 0, 0, .25)' : 'rgba(255, 255, 255, .25)'};
  display: flex;
  align-items: flex-start;
  position: relative;
  color: ${ props => props.theme.color };
	
  &:first-child {
    border-top: 1px solid ${props => props.theme === 'light' ?  'rgba(0, 0, 0, .25)' : 'rgba(255, 255, 255, .25)'};
  }

  img {
    margin: 28px 1em;
    width: 20px;
  }
`;

const Button = styled.button`
  width: 100%;
  text-align: center;
  border: none;
  cursor: pointer;
  padding: 1em 0;
  background: none;
  color: ${ props => props.theme.color }
`;

export const ExperienceList = (props) => {
	const dateFormat = {
		year: 'numeric',
		month: 'short',
	};

	const [ showMore, setShowMore ] = useState(false);
	const [ experiences, setExperiences ] = useState(experienceList.slice(0, 3))


	const handleClick = (showMore) => {
		setShowMore(showMore);
		(showMore ? setExperiences(experienceList) : setExperiences(experienceList.slice(0, 3)));
	}

	return (
		<Container>
			{ experiences && experiences.map((experience, i) => (
				<Article className={ styles.experience } key={ i }>
					<img src={ arrow } alt="Bullet" className={ styles.arrow }/>
					<div>
						<h3 className={ styles.role }>{ experience.role } </h3>
						<h4 className={ styles.company }>{ experience.company } | <span
							className={ styles.location }>{ experience.location }</span>
						</h4>

						<ul className={ styles.responsibilities }>
							{ experience.responsibilities && experience.responsibilities.map((resp, i) => (
								<li key={ i }>{ resp }</li>
							)) }
						</ul>
					</div>
					<span
						className={ styles.timeframe }>{ experience.startDate.toLocaleDateString('en-us', dateFormat) } - { experience.endDate.toLocaleDateString('en-us', dateFormat) }</span>
				</Article>
			)) }

			<Button onClick={ () => handleClick(!showMore) }>{ !showMore ? 'Show More' : 'Show Less' }</Button>

		</Container>
	);
}

export default ExperienceList;