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
  color: ${ props => props.theme.color }
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