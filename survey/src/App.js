import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Cover from './Cover';
import Meta from './Meta';
import Reminder from './Reminder';
import BeforeSurvey from './BeforeSurvey';
import Survey from './Survey';
import PostSurvey from './PostSurvey';
import End from './End';
import NoMatch from './NoMatch';
import style from './Common.css';

class App extends Component {
  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 116) {
        e.preventDefault();
      }
    });
  }
  render() {
    return (
      <Router>
        <div id={style.main}>
          <Switch>
            <Route exact path="/" component={Cover} />
            <Route exact path="/basicInfo" component={Meta} />
            <Route path="/readme/:userId" component={Reminder} />
            <Route path="/pre/:userId" component={BeforeSurvey} />
            <Route
              path="/survey/:userId"
              render={routeProps =>
                <Survey {...routeProps} end={this.end} />}
            />
            <Route path="/post-survey/:userId" render={routeProps => <PostSurvey {...routeProps} />} />
            <Route exact path="/thanks" component={End} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
