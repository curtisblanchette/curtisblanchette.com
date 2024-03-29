import { createRef } from "react";

export const data = [
	{
		company: '4iiz Software',
		role: 'Full Stack Software Engineer',
		website: 'https://www.4iiz.com',
		location: 'Wilmington, North Carolina',
		startDate: new Date('2021-01-01'),
		endDate: new Date(),
		responsibilities: [
			'Consulting business and leadership to distill initiatives from requirements to fully scoped, estimated projects.',
			'Designing and documenting architecture clearly describing the interoperability of system modules and components for communication to technical and non-technical stakeholders.',
			'Engineering full stack flagship Legal Software built upon Angular, Node, Express, PostgreSQL and AWS.',
			'Leading teams of engineers, QA’s and support staff toward success in a fast-paced remote work environment.'
		],
		nodeRef: createRef(),
	}, {
		company: '4iiz Software',
		role: 'Senior Software Engineer',
		website: 'https://www.4iiz.com',
		location: 'Wilmington, North Carolina',
		startDate: new Date('2019-03-01'),
		endDate: new Date('2021-12-01'),
		responsibilities: [
			'Producing complex SQL Queries surfacing reports to provide invaluable marketing, client-lifecycle, budget and staff compliance insights.',
			'Fostering lasting improvements to design, engineering and quality-assurance iterative cycles, streamlining the continuous delivery of progress.',
			'Designing and Engineering engaging user interfaces with a holistic approach to UX strategy and best practices.',
			'Integrating VoIP solutions in customer-facing web applications that support large-scale call centres in North America.'
		],
		nodeRef: createRef(),
	}, {
		company: 'QHR Technologies',
		role: 'Lead Software Engineer',
		website: 'https://www.qhrtechnologies.com',
		location: 'Kelowna, British Columbia',
		startDate: new Date('2017-08-01'),
		endDate: new Date('2019-03-01'),
		responsibilities: [
			'Bridging healthcare services under the Shoppers Drug Mart and QHR Platforms in an Agile environment with Angular, Java SpringBoot and MSSQL Server.',
			'Owning the hiring process, building up and scaling out cross-functional remote teams across Canada.',
			'Leadership, guidance and coaching of individual contributors\' for personal and professional growth.'
		],
		nodeRef: createRef(),
	}, {
		company: 'JBF Sports',
		role: 'Lead Frontend Engineer',
		website: 'https://www.jbfsports.com',
		location: 'Kelowna, British Columbia',
		startDate: new Date('2016-07-01'),
		endDate: new Date('2017-09-01'),
		responsibilities: [
			'Distributed Ionic MVC / Apache Cordova hybrid-mobile applications to NHL and NFL sports teams on the Google Play and iTunes Store.',
			'Engineered white-labelled real-time chat applications for kids using WebSockets.',
			'Researched and implemented mobile user-experience design strategies harbouring lasting in-app engagement.'
		],
		nodeRef: createRef(),
	},
	{
		company: 'JBF Sports',
		role: 'Frontend Software Engineer',
		website: 'https://www.jbfsports.com',
		location: 'Kelowna, British Columbia',
		startDate: new Date('2015-10-01'),
		endDate: new Date('2016-07-01'),
		responsibilities: [
			'Designed, streamlined and developed an engaging, mobile app onboarding experience.',
			'Engineered a proprietary client-facing marketing campaign builder enabling sport team marketers to engage with their audiences via branded, templated campaigns through our platform.'
		],
		nodeRef: createRef(),
	}
];