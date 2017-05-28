import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Comment, commentType } from './Comment';

class CommentContainer extends Component {
  constructor() {
    super();
    this.state = {
      displayInputArea: false,
      collapsed: false,
    };
    this.replyButtonClick = this.replyButtonClick.bind(this);
    this.collapseButtonClick = this.collapseButtonClick.bind(this);
    this.reload = this.reload.bind(this);
  }

  replyButtonClick() {
    this.setState({ displayInputArea: !this.state.displayInputArea });
  }

  collapseButtonClick() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  reload() {
    this.setState({ displayInputArea: false });
    this.props.reload();
  }

  render() {
    const timeDiff = (Date.now() - this.props.obj.timestamp) / 1000;
    let timeString = '';
    const m = Math.floor(timeDiff / 60);
    const h = Math.floor(m / 60);
    const d = Math.floor(h / 24);
    if (m < 1) {
      timeString = 'a few seconds ago';
    } else if (h < 1) {
      timeString = `${m} minute${m === 1 ? '' : 's'} ago`;
    } else if (d < 1) {
      timeString = `${h} hour${h === 1 ? '' : 's'} ago`;
    } else {
      timeString = `${d} day${d === 1 ? '' : 's'} ago`;
    }
    return (
      <Comment
        obj={this.props.obj}
        author={this.props.author}
        timeString={timeString}
        display={this.state.displayInputArea}
        renderComment={this.props.renderComment}
        replyClick={this.replyButtonClick}
        collapseClick={this.collapseButtonClick}
        reload={this.reload}
        collapsed={this.state.collapsed}
      />
    );
  }
}

CommentContainer.propTypes = {
  renderComment: PropTypes.func.isRequired,
  obj: PropTypes.shape(commentType).isRequired,
  reload: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
};


export default CommentContainer;
