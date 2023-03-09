import { data } from './data';
import arrow from './arrow.svg';
import { useState } from "react";
import styled from 'styled-components';
import styles from './experiences.module.css';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import './experienceAnimations.css';

const Container = styled.section`
  overflow: hidden;
  transition: max-height .25s ease-in-out;
`;

const Article = styled.article`
  border-bottom: 1px solid ${ props => props.theme.borderColor };
  display: flex;
	overflow: hidden;
  align-items: flex-start;
  position: relative;
  color: ${ props => props.theme.color };
  transition-property: color, border-color, opacity, transform;
  transition-duration: .25s;
  transition-timing-function: ease-in-out;

  &:first-child {
    border-top: 1px solid ${ props => props.theme.borderColor };
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
  color: ${ props => props.theme.color };
  transition: color .5s ease-in-out;
`;

export const ExperienceList = (props) => {
	const dateFormat = {
		year: 'numeric',
		month: 'short',
	};
	const [ showMore, setShowMore ] = useState(false);
	const [ experiences, setExperiences ] = useState(data.slice(0, 3))

	const handleClick = (showMore) => {
		setShowMore(showMore);
		(showMore ? setExperiences(items => [
			...items,
			...data.slice(3, 5)
		]) : setExperiences(items => [
			...items.slice(0, 3)
		]))
	}

	return (
		<Container>
			{ props.theme }
			<TransitionGroup>
				{ experiences && experiences.map((item, i) => (
					<CSSTransition
						key={ i }
						nodeRef={ item.nodeRef }
						timeout={ 250 }
						classNames="article"
					>
						<Article ref={ item.nodeRef }>
							<img src={ arrow } alt="Bullet" className={ styles.arrow }/>
							<div>
								<h3 className={ styles.role }>{ item.role } </h3>
								<h4 className={ styles.company }>{ item.company } | <span
									className={ styles.location }>{ item.location }</span>
								</h4>
								<span
									className={ styles.timeframe }>{ item.startDate.toLocaleDateString('en-us', dateFormat) } - { item.endDate.toLocaleDateString('en-us', dateFormat) }</span>

								<ul className={ styles.responsibilities }>
									{ item.responsibilities && item.responsibilities.map((resp, i) => (
										<li key={ i }>{ resp }</li>
									)) }
								</ul>
							</div>
						</Article>
					</CSSTransition>
				)) }
			</TransitionGroup>

			<Button onClick={ () => handleClick(!showMore) }>{ !showMore ? 'Show More' : 'Show Less' }</Button>

		</Container>
	);
}

export default ExperienceList;