import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/Main';
import Gallery from './components/Gallery'
import Calculator from './components/demo/Calculator'
import Love from './components/demo/Love'
import Banner from './components/demo/Banner'
import Ball from './components/demo/Ball'


const routes = (
  <Route>
    <Route path='/' component={App} >
            <IndexRoute component={Gallery}/>
            <Route path='/calculator' component={Calculator} />
            <Route path='/love' component={Love} />
            <Route path='/Banner' component={Banner} />
            <Route path='/Ball' component={Ball} />
    </Route>
  </Route>
);

export default routes;