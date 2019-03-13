/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
// const $ = require('jquery');

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createLogger} from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import { reducer } from './reducer.js';
import thunk from 'redux-thunk';
import Application from './Component/Application';
import '../css/app.css';
import {CONNEXION} from "./actions";
import CssBaseline from '@material-ui/core/CssBaseline'

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production'){
    middleware.push(createLogger());
}
const store = createStore(reducer, applyMiddleware(...middleware));

if (localStorage.getItem('jwt')){
    const token = JSON.parse(localStorage.getItem('jwt'));
    const tokenExpiresAt = token.payload.exp;
    const currentTimestamp =Date.now()/1000;
    const threshold = 300;
    if(currentTimestamp + threshold < tokenExpiresAt){

        store.dispatch({
            type: CONNEXION,
            token: token
        });
    }
}



ReactDOM.render( <Provider store={store}><CssBaseline /> <Application /> </Provider>,document.getElementById('app'));