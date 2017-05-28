import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputArea from './InputArea';

class InputAreaContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      child: [],
    };
    this.submit = this.submit.bind(this);
    this.bodyChanged = this.bodyChanged.bind(this);
  }

  bodyChanged(value) {
    this.setState({ body: value });
  }

  submit() {
    if (this.state.body === '') {
      window.alert('Empty Comment!');
      return;
    }
    const comment = this.state;
    comment.timestamp = Date.now();
    comment.author = this.props.author;
    comment.parentId = this.props.parentId;
    this.setState({ body: '' });
    window.fetch('/api/comments', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment),
    }).then((res) => {
      if (res.status === 202) {
        this.props.reload();
      }
    }).catch((err) => {
      console.error(err);
    });
  }

  render() {
    return (
      <InputArea
        submit={this.submit}
        bodyChanged={this.bodyChanged}
      />
    );
  }
}

InputAreaContainer.propTypes = {
  reload: PropTypes.func.isRequired,
  parentId: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default InputAreaContainer;
