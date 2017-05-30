import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import SurveyP1 from './SurveyP1';
import SurveyP2 from './SurveyP2';

const remoteUrl = 'https://psy2017.herokuapp.com';

class Survey extends Component {
  constructor({ match }) {
    super();
    this.state = {
      userId: match.params.userId,
      url: match.url,
      order: [],
      image: [],
      selected: [],
      p2Time: 0,
    };
    this.submit = this.submit.bind(this);
    this.setOrder = this.setOrder.bind(this);
    this.p2Start = this.p2Start.bind(this);
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
        order: Array(body.image.length).fill(-1),
        image: body.image,
        selected: Array(body.image.length).fill(false),
      });
    })
    .catch((err) => {
      console.error(err);
      this.props.history.replace('/404');
    });
  }

  setOrder(index, id) {
    const orderT = this.state.order;
    const selectedT = this.state.selected;
    if (index === -1 && orderT.indexOf(id) < 0) {
      for (let i = 0; i < orderT.length; i += 1) {
        if (orderT[i] === -1) {
          orderT[i] = id;
          selectedT[id] = true;
          break;
        }
      }
    } else if (index !== -1) {
      selectedT[id] = false;
      orderT[index] = -1;
    }
    this.setState({ order: orderT, selected: selectedT });
  }

  submit() {
    if (this.state.order.indexOf(-1) >= 0) {
      window.alert('請確實填寫順序！');
      return;
    }
    const time = Date.now();
    window.fetch(`${remoteUrl}/api/result`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: this.state.userId,
        order: this.state.order,
        rankTime: time - this.state.p2Time,
        timestamp: time,
        timestring: (new Date(time)).toLocaleString(),
      }),
    }).then((res) => {
      if (res.status < 300) {
        this.props.history.replace(`/post-survey/${this.state.userId}`);
      } else {
        window.location.href = '/404';
      }
    });
  }

  p2Start() {
    this.setState({ p2Time: Date.now() });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={`${this.state.url}/`} render={routeProps => <SurveyP1 {...routeProps} userId={this.state.userId} p2Start={this.p2Start} />} />
          <Route exact path={`${this.state.url}/2`} render={routeProps => <SurveyP2 {...routeProps} userId={this.state.userId} image={this.state.image} order={this.state.order} set={this.setOrder} next={this.submit} selected={this.state.selected} />} />
        </Switch>
      </Router>
    );
  }
}

Survey.propTypes = {
  history: PropTypes.shape(Route.history).isRequired,
};

export default Survey;
