require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from "react-addons-css-transition-group" ;

var AppComponent = React.createClass({
  render() {
    return (
        <ReactCSSTransitionGroup className="content" component="div" transitionName="example"  transitionEnterTimeout={1000}  transitionLeaveTimeout={500}
        >
          {React.cloneElement(this.props.children, {
            key: this.props.location.pathname
          })}
        </ReactCSSTransitionGroup>

    );
  }
});

AppComponent.defaultProps = {
};

export default AppComponent;
