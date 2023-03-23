import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Feed from "./containers/Feed";
import './index.css';
import reportWebVitals from './reportWebVitals';
import Resume from "./containers/Resume";
import ErrorPage from "./error-page";
import Navbar from "./components/Navbar";
import Root from "./containers/Root";
import { ThemeProvider } from "styled-components";
import store from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));


const routes = createBrowserRouter([
	{
		path: '/',
		element: <Root />
	},
	{
		path: '/feed',
		element: <Feed />,
		errorElement: <ErrorPage />
	},
	{
		path: '/resume',
		element: <Resume />,
		errorElement: <ErrorPage />
	}
]);


root.render(
	<React.StrictMode>
		<Provider store={store}>
			<Navbar />
			<RouterProvider router={routes} />
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();