import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { HashRouter } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={ store }>
        <HashRouter>
            <MuiThemeProvider>
                <App className="container"/>
            </MuiThemeProvider>
        </HashRouter>
    </Provider>
    , document.getElementById('root'));
