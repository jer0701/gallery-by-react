import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, hashHistory} from 'react-router'
//import { Router, Route, RouterContext, match, createMemoryHistory, browserHistory } from 'react-router'
import routes from './routes';


// Render the main component into the dom
ReactDOM.render(
     (<Router history={hashHistory}>
        {routes}
    </Router>),
    document.getElementById('app')
);
