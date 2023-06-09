import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import { HelmetProvider } from 'react-helmet-async';

//import reportWebVitals from './reportWebVitals';

import './satoshi.css';
import './index.css';

import routes from './routes';

import Error from './pages/Error';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError() {
      return { hasError: true };
    }
  
    render() {
      return this.state.hasError
        ? <Error />
        : this.props.children; 
    }
}

const router = createBrowserRouter(routes);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <ErrorBoundary>
            <HelmetProvider>
                <RouterProvider
                    router={router}
                />
            </HelmetProvider>
        </ErrorBoundary>
    </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(console.log);
