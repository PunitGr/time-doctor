// @flow
import React, { Fragment } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Timer from './Timer';
import Widget from './Widget';

const App = () => (
  <Router>
    <Fragment>
      <Route exact path="/" component={Timer} />
      <Route path="/widget" component={Widget} />
    </Fragment>
  </Router>
);

export default App;
