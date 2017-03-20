import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/Main';
import Gallery from './components/Gallery'
import Calculator from './components/demo/Calculator'


const routes = (
  <Route>
    <Route path='/' component={App} >
            <IndexRoute component={Gallery}/>
            <Route path='/calculator' component={Calculator} />
    </Route>
  </Route>
);

export default routes;