import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import PostSurveyP1 from './PostSurveyP1';
import PostSurveyP2 from './PostSurveyP2';
import PostSurveyP3 from './PostSurveyP3';

const remoteUrl = 'https://psy2017.herokuapp.com';

class PostSurvey extends Component {
  constructor({ match }) {
    super();
    this.state = {
      userId: match.params.userId,
      url: match.url,
      image: [],
    };
    this.submit = this.submit.bind(this);
    this.report = this.report.bind(this);
    this.radioClicked = this.radioClicked.bind(this);
  }

  componentDidMount() {
    window.fetch(`${remoteUrl}/api/result`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        userId: this.state.userId,
        query: true,
      }),
    }).then(res => res.json())
    .then((body) => {
      if (!body.exists) {
        return this.props.history.replace('/404');
      }
      return window.fetch(`${remoteUrl}/api/image`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
        },
      });
    })
    .then((res) => {
      if (!res) throw new Error('QAQ');
      return res.json();
    })
    .then((body) => {
      this.setState({
        image: body.image,
      });
    })
    .catch((err) => {
      console.error(err);
      this.props.history.replace('/404');
    });
  }

  report(slot, value) {
    if (slot === 'remember') {
      this.setState({ remember: value });
    } else if (slot === 'option') {
      this.setState({ option: value });
    }
  }

  radioClicked(event) {
    const e = event;
    this.setState({ order: e.target.value });
  }

  submit() {
    if (this.state.order === undefined) {
      window.alert('請填妥資料！');
      return;
    }
    window.fetch(`${remoteUrl}/api/result`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        userId: this.state.userId,
        remember: this.state.remember,
        option: this.state.option,
        order: this.state.order,
        postSurvey: true,
      }),
    }).then((res) => {
      if (res.status >= 300) {
        throw new Error();
      }
      window.location.replace('/thanks');
    }).catch(err => console.error(err));
  }

  render() {
    return (
      <Router>
        <div>
          <h4>問卷即將結束，請您再回答幾個問題。</h4>
          <Switch>
            <Route exact path={`${this.state.url}/`} render={routeProps => <PostSurveyP1 {...routeProps} radioClicked={this.radioClicked} url={this.state.url} userId={this.state.userId} report={this.report} />} />
            <Route exact path={`${this.state.url}/2`} render={routeProps => <PostSurveyP2 {...routeProps} image={this.state.image} report={this.report} url={this.state.url} />} />
            <Route exact path={`${this.state.url}/3`} render={routeProps => <PostSurveyP3 {...routeProps} radioClicked={this.radioClicked} submit={this.submit} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

PostSurvey.propTypes = {
  history: PropTypes.shape(Route.history).isRequired,
};


export default PostSurvey;
