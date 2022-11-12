import React from 'react';
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import { createBrowserHistory } from 'history';
// import { wrapHistory } from 'oaf-react-router';
// import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

// const history = createBrowserHistory();
// wrapHistory(history);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
   </BrowserRouter> 
);


