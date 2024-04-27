import React from "react";
import hljs from "highlight.js";
import './code.css';

export default function Code({content, language}) {
	const highlighted = language
		? hljs.highlight(language, content)
		: hljs.highlightAuto(content);

	const classNames = `hljs ${language}`;
	return (
		<pre className={classNames}>
      <code dangerouslySetInnerHTML={ { __html: highlighted.value } } />
    </pre>
	);
}