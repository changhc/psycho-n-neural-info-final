import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Content from './Content';

const App = () => (
  <div>
    <Router>
      <Route path="/:userId" component={Content} />
    </Router>
  </div>
);

export default App;
