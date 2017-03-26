import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/Main';
import Gallery from './components/Gallery'
import Calculator from './components/demo/Calculator'
import Love from './components/demo/Love'
import Banner from './components/demo/Banner'
import Ball from './components/demo/Ball'
import LazyLoading from './components/demo/LazyLoading'
import MessageBoard from './components/demo/MessageBoard'


const routes = (
  <Route>
    <Route path='/' component={App} >
            <IndexRoute component={Gallery}/>
            <Route path='/calculator' component={Calculator} />
            <Route path='/love' component={Love} />
            <Route path='/banner' component={Banner} />
            <Route path='/ball' component={Ball} />
            <Route path='/lazyloading' component={LazyLoading} />
            <Route path='/messageboard' component={MessageBoard} />
    </Route>
  </Route>
);

export default routes;