import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { Provider } from 'react-redux';
import { routes } from "./routes";
import { Menu } from "./components/Menu";
import styled from "styled-components";

const ScrollContainer = styled.div`
  padding: 10px;
  overflow-y: scroll;
  flex: 1;
  max-height: 100vh;
`;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <div style={ { display: "flex"} }>
        <Menu />
        <ScrollContainer>
          <RouterProvider router={ routes } />
        </ScrollContainer>
      </div>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();