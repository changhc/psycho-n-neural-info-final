import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import SurveyP1 from './SurveyP1';
import SurveyP2 from './SurveyP2';

const baseUrl = 'http://localhost:5000';

class Survey extends Component {
  constructor({ match }) {
    super();
    this.state = {
      userId: match.params.userId,
      url: match.url,
      order: [],
      image: [],
    };
    this.submit = this.submit.bind(this);
    this.setOrder = this.setOrder.bind(this);
  }

  componentDidMount() {
    window.fetch(`${baseUrl}/api/result`, {
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
      if (!body.exist) {
        return this.props.history.replace('/404');
      }
      return window.fetch(`${baseUrl}/api/image`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
        },
      });
    })
    .then(res => res.json())
    .then((body) => {
      this.setState({ order: Array(body.image.length).fill(-1), image: body.image });
    })
    .catch((err) => {
      console.error(err);
      this.props.history.replace('/404');
    });
  }

  setOrder(index, id) {
    const orderT = this.state.order;
    if (index === -1 && orderT.indexOf(id) < 0) {
      for (let i = 0; i < orderT.length; i += 1) {
        if (orderT[i] === -1) {
          orderT[i] = id;
          break;
        }
      }
    } else if (index !== -1) {
      orderT[index] = id;
    }
    this.setState({ order: orderT });
  }

  submit() {
    if (this.state.order.indexOf(-1) >= 0) {
      window.alert('請確實填寫順序！');
      return;
    }
    window.fetch(`${baseUrl}/api/result`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: this.state.userId,
        order: this.state.order,
      }),
    }).then((res) => {
      if (res.status < 300) {
        this.props.history.replace('/thanks');
      } else {
        window.location.href = '/404';
      }
    });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={`${this.state.url}/`} component={SurveyP1} />
          <Route exact path={`${this.state.url}/2`} render={routeProps => <SurveyP2 {...routeProps} userId={this.state.userId} image={this.state.image} order={this.state.order} set={this.setOrder} next={this.submit} />} />
        </Switch>
      </Router>
    );
  }
}

Survey.propTypes = {
  history: PropTypes.shape(Route.history).isRequired,
};

export default Survey;
