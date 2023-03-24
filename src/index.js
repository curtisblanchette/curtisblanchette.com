import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Feed from "./containers/Feed";
import './index.css';
import reportWebVitals from './reportWebVitals';
import Resume from "./containers/Resume";
import ErrorPage from "./error-page";
import Root from "./containers/Root";
import store from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));


const routes = createBrowserRouter([
	{
		path: '/',
		element: <Resume />
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

			<div style={{ display: "flex" }}>
				{/*<Menu />*/}
				<RouterProvider router={routes} />
			</div>

		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();