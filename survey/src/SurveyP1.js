import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import SurveyP1Entry from './SurveyP1Entry';
import style from './Common.css';

class SurveyP1 extends Component {
  constructor() {
    super();
    this.state = {
      entries: [],
      answer: [],
    };
    this.fetchSurvey = this.fetchSurvey.bind(this);
    this.choiceClicked = this.choiceClicked.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.fetchSurvey();
  }

  fetchSurvey() {
    window.fetch('http://localhost:5000/api/survey', {
      method: 'GET',
      mode: 'cors',
      headers: { Accept: 'application/json' },
    }).then(res => res.json())
    .then((body) => {
      this.setState({ entries: body.survey, answer: Array(body.survey.length).fill(-1) });
    })
    .catch(err => console.error(err));
  }

  choiceClicked(index, value) {
    const answerT = this.state.answer;
    answerT[index] = value;
    this.setState({ answer: answerT });
  }

  submit() {
    const index = this.state.answer.indexOf(-1);
    if (index >= 0) {
      window.alert(`第 ${index + 1} 題未填寫！`);
      return;
    }
    this.props.history.replace(`${this.props.location.pathname}/2`);
  }

  render() {
    return (
      <div>
        <h4>這是問卷的第1部份。</h4>
        <h4>首先，請您回答一些關於文章內容或相關看法的問題。</h4>
        <SurveyP1Entry id={-1} content="問題說明" />
        <div>
          {this.state.entries.map((entry, index) =>
            <SurveyP1Entry key={entry} id={index} content={entry} click={this.choiceClicked} />,
          )}
        </div>
        <div className={style.button} onClick={this.submit}>下一頁</div>
      </div>
    );
  }
}

SurveyP1.propTypes = {
  location: PropTypes.shape(Route.location).isRequired,
  history: PropTypes.shape(Route.history).isRequired,
};

export default SurveyP1;
