import React from 'react';
import Code from "../../components/Code";
import 'highlight.js/styles/github-dark-dimmed.css';

const Feed = () => {

	const code = `
// this is a comment	

function test(props) { 
	return 'this is a multiline code block asdasda as a a';
}

export default function Pop() {
	constructor(props) {
		this.setState('coke');
	}

	componentDidMount() {
		console.log();
	} 
}`.trim();

	return (
		<main>
			<h1>Feed</h1>
			<div>We're going to put the feed here...</div>
			<Code content={ code } language="javascript"/>
		</main>
	);
}

export default Feed;
